export type Role = 'guest' | 'student' | 'admin';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  studentId?: string;
  course?: string;
  year?: string;
  avatar?: string;
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  year: string;
  gender: 'Male' | 'Female' | 'Other';
  gpa: string;
  skills: string[];
  status: 'Active' | 'Inactive';
  joinedDate: string;
  avatar?: string;
}

export interface EventItem {
  id: number;
  title: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  description: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  poster: string;
  seatsTotal: number;
  seatsFilled: number;
  organizer: string;
  coordinator: string;
}

export interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  helpfulCount: number;
}

export interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  category: string;
  rating: number;
  message: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  department: string;
  message: string;
  submittedAt: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  type: 'event' | 'academic' | 'system' | 'alert';
  read: boolean;
}

export interface EventRegistration {
  id: string;
  studentId: string;
  studentName: string;
  eventId: number;
  eventTitle: string;
  ticketCode: string;
  registeredAt: string;
}
