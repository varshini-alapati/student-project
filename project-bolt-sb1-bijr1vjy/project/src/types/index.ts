export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  grade: string;
  enrollmentDate: string;
  contactNumber: string;
  address: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  profileImage?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  description: string;
  schedule: string;
  room: string;
  credits: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentName: string;
  score: number;
  maxScore: number;
  date: string;
  type: 'quiz' | 'test' | 'homework' | 'project' | 'exam';
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
}