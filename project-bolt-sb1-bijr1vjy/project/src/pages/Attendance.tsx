import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { attendance, students } from '../data/mockData';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate, getAttendanceStatusColor } from '../utils/helpers';

const Attendance: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Filter attendance records for the selected date
  const dateAttendance = attendance.filter(record => record.date === selectedDate);
  
  // Combine with student data
  const attendanceWithStudents = dateAttendance.map(record => {
    const student = students.find(s => s.id === record.studentId);
    return {
      ...record,
      student
    };
  });
  
  // Filter by search query
  const filteredAttendance = attendanceWithStudents.filter(record => {
    if (!record.student) return false;
    const { firstName, lastName } = record.student;
    return searchQuery === '' || 
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lastName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Navigation functions
  const goToPreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
    setSelectedDate(prevDate.toISOString().split('T')[0]);
  };
  
  const goToNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
    setSelectedDate(nextDate.toISOString().split('T')[0]);
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentDate(new Date(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Calendar size={18} />}
          >
            Take Attendance
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={goToPreviousDay}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <button 
                onClick={goToNextDay}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToToday}
              >
                Today
              </Button>
            </div>
            
            <div className="relative flex-1 md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-x-auto">
          {filteredAttendance.length > 0 ? (
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Notes
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAttendance.map(record => (
                    <tr 
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {record.student?.profileImage ? (
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={record.student.profileImage} 
                                alt={`${record.student.firstName} ${record.student.lastName}`}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium">
                                  {`${record.student?.firstName?.[0]}${record.student?.lastName?.[0]}`}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {record.student?.firstName} {record.student?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              Grade: {record.student?.grade} • ID: {record.student?.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(record.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={getAttendanceStatusColor(record.status)}
                          rounded
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {record.notes || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`/attendance/${record.id}/edit`} className="text-blue-600 hover:text-blue-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500">
              <Calendar size={48} className="text-gray-300" />
              <p className="mt-4">No attendance records found for {formatDate(selectedDate)}</p>
              <p className="text-sm">Try selecting a different date or adding new records</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;