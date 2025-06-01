import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  GraduationCap, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, isActive, collapsed }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-2 my-1 rounded-md transition-colors duration-200
        ${isActive 
          ? 'bg-blue-600 text-white font-medium' 
          : 'text-gray-600 hover:bg-gray-100'
        }
        ${collapsed ? 'justify-center' : ''}
      `}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
    </Link>
  );
};

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleCollapse = () => {
    if (!mobile) {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = () => {
    logout();
    if (onClose) {
      onClose();
    }
  };

  const menuItems = [
    { to: '/dashboard', icon: <BarChart2 size={20} />, label: 'Dashboard' },
    { to: '/students', icon: <Users size={20} />, label: 'Students' },
    { to: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { to: '/attendance', icon: <Calendar size={20} />, label: 'Attendance' },
    { to: '/grades', icon: <GraduationCap size={20} />, label: 'Grades' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <div 
      className={`
        bg-white h-full flex flex-col border-r border-gray-200
        ${mobile 
          ? 'fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300' 
          : collapsed ? 'w-16' : 'w-64'
        }
      `}
    >
      <div className={`flex items-center justify-between p-4 ${collapsed && !mobile ? 'justify-center' : ''}`}>
        {(!collapsed || mobile) && (
          <Link to="/" className="text-xl font-bold text-blue-600">
            EduManager
          </Link>
        )}
        
        <button 
          onClick={mobile ? onClose : toggleCollapse} 
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
        >
          {mobile ? <X size={20} /> : collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {currentUser && (
        <div className={`flex items-center p-4 ${collapsed && !mobile ? 'justify-center' : ''}`}>
          <Avatar 
            src={currentUser.profileImage} 
            firstName={currentUser.firstName} 
            lastName={currentUser.lastName} 
            size={collapsed ? 'sm' : 'md'}
          />
          
          {(!collapsed || mobile) && (
            <div className="ml-3">
              <p className="text-sm font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
              <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.to)}
              collapsed={collapsed && !mobile}
            />
          ))}
        </nav>
      </div>

      {(!collapsed || mobile) && (
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;