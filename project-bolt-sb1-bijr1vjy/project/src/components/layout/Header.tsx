import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';
import { notifications } from '../../data/mockData';
import { getRelativeTime, getNotificationTypeColor } from '../../utils/helpers';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentUser } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="ml-4 lg:ml-0">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="search" 
                placeholder="Search..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className={`px-3 py-2 rounded-md ${getNotificationTypeColor(notification.type)}`}>
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-xs mt-1">{notification.message}</p>
                          <div className="text-xs mt-2 text-gray-500">{getRelativeTime(notification.timestamp)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>
          
          {currentUser && (
            <div className="ml-4 flex items-center">
              <span className="mr-2 hidden md:block text-sm text-gray-700">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <Avatar 
                src={currentUser.profileImage} 
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
                size="sm"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;