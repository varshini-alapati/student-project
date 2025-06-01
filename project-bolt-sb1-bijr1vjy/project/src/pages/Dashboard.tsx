import React, { useState } from 'react';
import { BarChart2, Users, BookOpen, Calendar, Award, Bell, TrendingUp } from 'lucide-react';
import { students, courses, grades, attendance } from '../data/mockData';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';
import { calculateAttendanceRate } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const activeClasses = courses.length; // For demo purposes
  
  // Calculate attendance stats
  const totalAttendanceRecords = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;
  const lateCount = attendance.filter(a => a.status === 'late').length;
  const attendanceRate = calculateAttendanceRate(presentCount, totalAttendanceRecords);
  
  // Calculate grade stats
  const averageScore = grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore * 100), 0) / grades.length;
  
  // Recent students (for admins/teachers)
  const recentStudents = students.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {currentUser?.firstName}!
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                timeframe === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 text-sm font-medium ${
                timeframe === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-300`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                timeframe === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="transform transition-transform duration-200 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>4.75% increase</span>
            </div>
          </CardContent>
        </Card>
        
        <Card hover className="transform transition-transform duration-200 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <BookOpen size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Courses</p>
                <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>2.3% increase</span>
            </div>
          </CardContent>
        </Card>
        
        <Card hover className="transform transition-transform duration-200 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Calendar size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{attendanceRate}%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-red-600">
              <TrendingUp size={16} className="mr-1" />
              <span>1.2% decrease</span>
            </div>
          </CardContent>
        </Card>
        
        <Card hover className="transform transition-transform duration-200 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <Award size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(averageScore)}%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>3.6% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Overview</h2>
              <Badge variant="primary">This Week</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <BarChart2 size={48} className="mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">Attendance visualization would appear here</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-green-600 font-semibold">{presentCount}</div>
                <div className="text-xs text-gray-500">Present</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-semibold">{absentCount}</div>
                <div className="text-xs text-gray-500">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-amber-600 font-semibold">{lateCount}</div>
                <div className="text-xs text-gray-500">Late</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-semibold">{attendanceRate}%</div>
                <div className="text-xs text-gray-500">Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
              <a href="/students" className="text-sm text-blue-600 hover:text-blue-500">View all</a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-100">
              {recentStudents.map(student => (
                <li key={student.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {student.profileImage ? (
                        <img 
                          src={student.profileImage}
                          alt={`${student.firstName} ${student.lastName}`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {`${student.firstName[0]}${student.lastName[0]}`}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{`${student.firstName} ${student.lastName}`}</p>
                      <p className="text-xs text-gray-500">{student.grade} Grade • ID: {student.id}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Events and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-100">
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Parent-Teacher Conference</p>
                    <p className="text-xs text-gray-500">Oct 15, 2023 • 4:00 PM - 7:00 PM</p>
                  </div>
                  <Badge className="ml-auto" variant="primary" size="sm">Upcoming</Badge>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">End of Quarter Exams</p>
                    <p className="text-xs text-gray-500">Oct 20-24, 2023 • All Day</p>
                  </div>
                  <Badge className="ml-auto" variant="warning" size="sm">Important</Badge>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Science Fair</p>
                    <p className="text-xs text-gray-500">Nov 5, 2023 • 9:00 AM - 3:00 PM</p>
                  </div>
                  <Badge className="ml-auto" variant="info" size="sm">Scheduled</Badge>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-100">
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">School Closure Notice</p>
                    <p className="text-sm text-gray-500">Due to inclement weather, school will be closed on Friday, October 13.</p>
                    <p className="text-xs text-gray-400 mt-1">Posted 2 hours ago</p>
                  </div>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">New Curriculum Update</p>
                    <p className="text-sm text-gray-500">The science curriculum has been updated. Please review the new materials.</p>
                    <p className="text-xs text-gray-400 mt-1">Posted yesterday</p>
                  </div>
                </div>
              </li>
              <li className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Fall Festival Volunteers Needed</p>
                    <p className="text-sm text-gray-500">We're looking for parent volunteers for the upcoming Fall Festival.</p>
                    <p className="text-xs text-gray-400 mt-1">Posted 3 days ago</p>
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;