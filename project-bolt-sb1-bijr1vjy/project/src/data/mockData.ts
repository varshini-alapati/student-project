import { Student, Course, Attendance, Grade, User, Notification } from '../types';

export const students: Student[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '2005-05-15',
    grade: '10th',
    enrollmentDate: '2023-09-01',
    contactNumber: '123-456-7890',
    address: '123 Main St, Anytown, AN 12345',
    parentName: 'Jane Doe',
    parentEmail: 'jane.doe@example.com',
    parentPhone: '123-456-7899', 
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah.smith@example.com',
    dateOfBirth: '2006-03-12',
    grade: '9th',
    enrollmentDate: '2023-09-01',
    contactNumber: '234-567-8901',
    address: '456 Oak Dr, Othertown, OT 67890',
    parentName: 'Mike Smith',
    parentEmail: 'mike.smith@example.com',
    parentPhone: '234-567-8999',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    dateOfBirth: '2005-11-30',
    grade: '10th',
    enrollmentDate: '2022-09-01',
    contactNumber: '345-678-9012',
    address: '789 Pine Ln, Sometown, ST 54321',
    parentName: 'Lisa Johnson',
    parentEmail: 'lisa.j@example.com',
    parentPhone: '345-678-9099',
  },
  {
    id: '4',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.w@example.com',
    dateOfBirth: '2006-07-22',
    grade: '9th',
    enrollmentDate: '2023-09-01',
    contactNumber: '456-789-0123',
    address: '101 Maple Ave, Anycity, AC 13579',
    parentName: 'David Wilson',
    parentEmail: 'david.w@example.com',
    parentPhone: '456-789-0199',
  },
  {
    id: '5',
    firstName: 'James',
    lastName: 'Brown',
    email: 'james.b@example.com',
    dateOfBirth: '2004-09-18',
    grade: '11th',
    enrollmentDate: '2021-09-01',
    contactNumber: '567-890-1234',
    address: '202 Elm St, Somewhere, SW 24680',
    parentName: 'Patricia Brown',
    parentEmail: 'patricia.b@example.com',
    parentPhone: '567-890-1299',
  }
];

export const courses: Course[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    instructor: 'Dr. Alan Turing',
    description: 'Introduction to algebra, geometry, and calculus concepts',
    schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM',
    room: 'A-101',
    credits: 4
  },
  {
    id: '2',
    name: 'English Literature',
    code: 'ENG203',
    instructor: 'Prof. Jane Austen',
    description: 'Analysis of classic and contemporary literary works',
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    room: 'B-205',
    credits: 3
  },
  {
    id: '3',
    name: 'Physics',
    code: 'PHYS101',
    instructor: 'Dr. Richard Feynman',
    description: 'Fundamental concepts in mechanics and thermodynamics',
    schedule: 'Mon, Wed 1:00 PM - 2:30 PM',
    room: 'C-303',
    credits: 4
  },
  {
    id: '4',
    name: 'History',
    code: 'HIST202',
    instructor: 'Prof. Howard Zinn',
    description: 'World history from ancient civilizations to modern times',
    schedule: 'Tue, Thu 9:00 AM - 10:30 AM',
    room: 'D-404',
    credits: 3
  },
  {
    id: '5',
    name: 'Computer Science',
    code: 'CS101',
    instructor: 'Dr. Grace Hopper',
    description: 'Introduction to programming and computational thinking',
    schedule: 'Mon, Wed, Fri 11:00 AM - 12:30 PM',
    room: 'E-505',
    credits: 4
  }
];

export const attendance: Attendance[] = [
  { id: '1', studentId: '1', date: '2023-09-05', status: 'present' },
  { id: '2', studentId: '1', date: '2023-09-06', status: 'present' },
  { id: '3', studentId: '1', date: '2023-09-07', status: 'absent', notes: 'Doctor appointment' },
  { id: '4', studentId: '2', date: '2023-09-05', status: 'present' },
  { id: '5', studentId: '2', date: '2023-09-06', status: 'late', notes: 'Bus delay' },
  { id: '6', studentId: '2', date: '2023-09-07', status: 'present' },
  { id: '7', studentId: '3', date: '2023-09-05', status: 'present' },
  { id: '8', studentId: '3', date: '2023-09-06', status: 'present' },
  { id: '9', studentId: '3', date: '2023-09-07', status: 'present' },
  { id: '10', studentId: '4', date: '2023-09-05', status: 'excused', notes: 'Family emergency' },
  { id: '11', studentId: '4', date: '2023-09-06', status: 'excused', notes: 'Family emergency' },
  { id: '12', studentId: '4', date: '2023-09-07', status: 'present' },
  { id: '13', studentId: '5', date: '2023-09-05', status: 'present' },
  { id: '14', studentId: '5', date: '2023-09-06', status: 'absent', notes: 'Sick' },
  { id: '15', studentId: '5', date: '2023-09-07', status: 'absent', notes: 'Sick' }
];

export const grades: Grade[] = [
  { id: '1', studentId: '1', courseId: '1', assignmentName: 'Quiz 1', score: 85, maxScore: 100, date: '2023-09-10', type: 'quiz' },
  { id: '2', studentId: '1', courseId: '2', assignmentName: 'Essay 1', score: 92, maxScore: 100, date: '2023-09-12', type: 'homework' },
  { id: '3', studentId: '1', courseId: '3', assignmentName: 'Lab 1', score: 78, maxScore: 100, date: '2023-09-14', type: 'project' },
  { id: '4', studentId: '2', courseId: '1', assignmentName: 'Quiz 1', score: 92, maxScore: 100, date: '2023-09-10', type: 'quiz' },
  { id: '5', studentId: '2', courseId: '4', assignmentName: 'Research Paper', score: 88, maxScore: 100, date: '2023-09-15', type: 'project' },
  { id: '6', studentId: '3', courseId: '5', assignmentName: 'Programming Assignment 1', score: 95, maxScore: 100, date: '2023-09-16', type: 'homework' },
  { id: '7', studentId: '3', courseId: '3', assignmentName: 'Lab 1', score: 82, maxScore: 100, date: '2023-09-14', type: 'project' },
  { id: '8', studentId: '4', courseId: '2', assignmentName: 'Essay 1', score: 78, maxScore: 100, date: '2023-09-12', type: 'homework' },
  { id: '9', studentId: '4', courseId: '4', assignmentName: 'Research Paper', score: 85, maxScore: 100, date: '2023-09-15', type: 'project' },
  { id: '10', studentId: '5', courseId: '5', assignmentName: 'Programming Assignment 1', score: 90, maxScore: 100, date: '2023-09-16', type: 'homework' }
];

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@school.edu',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: '2',
    username: 'turing',
    email: 'alan.turing@school.edu',
    role: 'teacher',
    firstName: 'Alan',
    lastName: 'Turing',
  },
  {
    id: '3',
    username: 'austen',
    email: 'jane.austen@school.edu',
    role: 'teacher',
    firstName: 'Jane',
    lastName: 'Austen',
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Grade Posted',
    message: 'Your Mathematics quiz has been graded.',
    type: 'info',
    timestamp: '2023-09-11T10:30:00',
    read: false
  },
  {
    id: '2',
    title: 'Attendance Alert',
    message: 'Student John Doe has missed 3 consecutive days.',
    type: 'warning',
    timestamp: '2023-09-10T09:15:00',
    read: true
  },
  {
    id: '3',
    title: 'New Course Available',
    message: 'Registration is now open for Introduction to Biology.',
    type: 'info',
    timestamp: '2023-09-09T14:45:00',
    read: false
  },
  {
    id: '4',
    title: 'Assignment Deadline Approaching',
    message: 'English Literature essay due in 2 days.',
    type: 'warning',
    timestamp: '2023-09-08T16:20:00',
    read: false
  },
  {
    id: '5',
    title: 'System Maintenance',
    message: 'The system will be down for maintenance on Sunday from 2-4 AM.',
    type: 'info',
    timestamp: '2023-09-07T11:00:00',
    read: true
  }
];