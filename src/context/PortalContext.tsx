import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, Student, EventItem, FAQItem, FeedbackItem, ContactMessage, NotificationItem, EventRegistration } from '../types';

interface PortalContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentUser: User | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  login: (email: string, password?: string, overrideRole?: Role) => boolean;
  logout: () => void;
  registerUser: (formData: any) => { success: boolean; message: string };
  // Students CRUD
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'studentId' | 'joinedDate'>) => void;
  updateStudent: (id: number, updated: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
  // Events CRUD
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id' | 'seatsFilled'>) => void;
  updateEvent: (id: number, updated: Partial<EventItem>) => void;
  deleteEvent: (id: number) => void;
  registerForEvent: (eventId: number) => { success: boolean; message: string; ticketCode?: string };
  cancelEventRegistration: (ticketCode: string) => void;
  registrations: EventRegistration[];
  // FAQs
  faqs: FAQItem[];
  // Feedback & Contact
  feedbackList: FeedbackItem[];
  submitFeedback: (item: Omit<FeedbackItem, 'id' | 'submittedAt'>) => void;
  contactMessages: ContactMessage[];
  submitContact: (item: Omit<ContactMessage, 'id' | 'submittedAt'>) => void;
  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: () => void;
  // Toast alert
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with localStorage persistence (Practical 4)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('studenthub_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('studenthub_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Current view navigation
  const [currentView, setCurrentView] = useState<string>('home');

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('studenthub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Students list (Practical 6: Fetch API + Practical 11: CRUD)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('studenthub_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Events list (Practical 6: Fetch API + Practical 12: CRUD)
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('studenthub_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // FAQs list
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('studenthub_faqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [];
  });

  // Event RSVPs / Registrations
  const [registrations, setRegistrations] = useState<EventRegistration[]>(() => {
    const saved = localStorage.getItem('studenthub_registrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'REG-101',
        studentId: 'STU-2024-001',
        studentName: 'Aarav Sharma',
        eventId: 1,
        eventTitle: 'InnovateX 2026: National Hackathon',
        ticketCode: 'INNOVATE-7741',
        registeredAt: '2026-09-12'
      }
    ];
  });

  // Feedback submissions
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('studenthub_feedback');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 1,
        name: 'Aarav Sharma',
        email: 'aarav.sharma@studenthub.edu',
        category: 'Campus Facilities',
        rating: 5,
        message: 'The new high-speed Wi-Fi in the library study cubicles is fantastic. Thanks for the quick upgrade!',
        submittedAt: '2026-09-14 11:30 AM'
      },
      {
        id: 2,
        name: 'Diya Patel',
        email: 'diya.patel@studenthub.edu',
        category: 'Events & Sports',
        rating: 4,
        message: 'Hackathon workshops were well-structured. Would love more cloud credits for hands-on tasks.',
        submittedAt: '2026-09-15 03:15 PM'
      }
    ];
  });

  // Contact messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('studenthub_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: 'InnovateX 2026 Hackathon Registration Open',
      message: 'Registrations are now live for the 36-hour National Hackathon. Reserve your ticket early!',
      timestamp: '10 mins ago',
      type: 'event',
      read: false
    },
    {
      id: 2,
      title: 'Mid-Semester Exam Schedule Released',
      message: 'Official timetable for Semester 3 & 5 has been published on the Dean of Academics board.',
      timestamp: '2 hours ago',
      type: 'academic',
      read: false
    },
    {
      id: 3,
      title: 'Library Extended Hours for Final Projects',
      message: 'Central Library will remain open until midnight throughout October for project submissions.',
      timestamp: 'Yesterday',
      type: 'system',
      read: true
    }
  ]);

  // Initial Fetch API call for events, students, faqs (Practical 6)
  useEffect(() => {
    if (events.length === 0) {
      fetch('/data/events.json')
        .then(res => res.json())
        .then(data => {
          setEvents(data);
          localStorage.setItem('studenthub_events', JSON.stringify(data));
        })
        .catch(err => console.error('Error fetching events:', err));
    }

    if (students.length === 0) {
      fetch('/data/students.json')
        .then(res => res.json())
        .then(data => {
          setStudents(data);
          localStorage.setItem('studenthub_students', JSON.stringify(data));
        })
        .catch(err => console.error('Error fetching students:', err));
    }

    if (faqs.length === 0) {
      fetch('/data/faqs.json')
        .then(res => res.json())
        .then(data => {
          setFaqs(data);
          localStorage.setItem('studenthub_faqs', JSON.stringify(data));
        })
        .catch(err => console.error('Error fetching faqs:', err));
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (events.length > 0) localStorage.setItem('studenthub_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (students.length > 0) localStorage.setItem('studenthub_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (faqs.length > 0) localStorage.setItem('studenthub_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('studenthub_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('studenthub_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Auth methods
  const login = (email: string, _password?: string, overrideRole?: Role): boolean => {
    const trimmed = email.toLowerCase().trim();
    let loggedUser: User;

    if (overrideRole === 'admin' || trimmed.includes('admin')) {
      loggedUser = {
        id: 999,
        email: trimmed || 'admin@studenthub.edu',
        name: 'Administrator (Dean Office)',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      };
    } else {
      // Find matching student or default to Aarav Sharma
      const matchedStudent = students.find(s => s.email.toLowerCase() === trimmed);
      loggedUser = {
        id: matchedStudent ? matchedStudent.id : 1,
        email: trimmed || 'aarav.sharma@studenthub.edu',
        name: matchedStudent ? matchedStudent.name : 'Aarav Sharma',
        role: 'student',
        studentId: matchedStudent ? matchedStudent.studentId : 'STU-2024-001',
        course: matchedStudent ? matchedStudent.course : 'B.Tech Computer Science',
        year: matchedStudent ? matchedStudent.year : '3rd Year',
        avatar: matchedStudent?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
      };
    }

    setCurrentUser(loggedUser);
    localStorage.setItem('studenthub_user', JSON.stringify(loggedUser));
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');

    if (loggedUser.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('dashboard');
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('studenthub_user');
    showToast('You have successfully logged out.', 'info');
    setCurrentView('home');
  };

  const registerUser = (formData: any) => {
    // Check duplicate email
    const exists = students.some(s => s.email.toLowerCase() === formData.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentId = `STU-2024-${String(newId).padStart(3, '0')}`;

    const newStudent: Student = {
      id: newId,
      studentId,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      course: formData.course,
      year: formData.year,
      gender: formData.gender,
      gpa: '3.75',
      skills: ['HTML5', 'CSS3', 'JavaScript'],
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    setStudents(prev => [newStudent, ...prev]);

    // Automatically sign in the registered student
    const user: User = {
      id: newId,
      email: newStudent.email,
      name: newStudent.name,
      role: 'student',
      studentId: newStudent.studentId,
      course: newStudent.course,
      year: newStudent.year,
      avatar: newStudent.avatar
    };
    setCurrentUser(user);
    localStorage.setItem('studenthub_user', JSON.stringify(user));
    showToast(`Account created! Welcome to StudentHub, ${newStudent.name}.`, 'success');
    setCurrentView('dashboard');

    return { success: true, message: 'Registration successful!' };
  };

  // Student CRUD (Practical 11)
  const addStudent = (studentData: Omit<Student, 'id' | 'studentId' | 'joinedDate'>) => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const studentId = `STU-2024-${String(newId).padStart(3, '0')}`;
    const newStudent: Student = {
      ...studentData,
      id: newId,
      studentId,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} (${studentId}) added successfully!`, 'success');
  };

  const updateStudent = (id: number, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
    // If current logged-in user updated their own profile
    if (currentUser && currentUser.id === id) {
      const updatedUser = {
        ...currentUser,
        name: updated.name || currentUser.name,
        course: updated.course || currentUser.course,
        year: updated.year || currentUser.year
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('studenthub_user', JSON.stringify(updatedUser));
    }
    showToast('Student record updated successfully!', 'success');
  };

  const deleteStudent = (id: number) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast(`Student ${target ? target.name : ''} deleted successfully.`, 'info');
  };

  // Events CRUD (Practical 12)
  const addEvent = (eventData: Omit<EventItem, 'id' | 'seatsFilled'>) => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    const newEvent: EventItem = {
      ...eventData,
      id: newId,
      seatsFilled: 0
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`, 'success');
  };

  const updateEvent = (id: number, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updated } : e)));
    showToast('Event updated successfully.', 'success');
  };

  const deleteEvent = (id: number) => {
    const target = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast(`Event "${target ? target.title : ''}" deleted.`, 'info');
  };

  // Event RSVP / Registration
  const registerForEvent = (eventId: number) => {
    if (!currentUser) {
      setCurrentView('login');
      return { success: false, message: 'Please log in to RSVP for events.' };
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found.' };

    if (event.seatsFilled >= event.seatsTotal) {
      return { success: false, message: 'Sorry, this event has reached full capacity.' };
    }

    // Check if already registered
    const alreadyRegistered = registrations.some(
      r => r.eventId === eventId && r.studentId === (currentUser.studentId || 'STU-2024-001')
    );
    if (alreadyRegistered) {
      return { success: false, message: 'You have already claimed a ticket for this event!' };
    }

    const ticketCode = `${event.category.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg: EventRegistration = {
      id: `REG-${Date.now()}`,
      studentId: currentUser.studentId || 'STU-2024-001',
      studentName: currentUser.name,
      eventId: event.id,
      eventTitle: event.title,
      ticketCode,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setRegistrations(prev => [newReg, ...prev]);

    // Increment seats filled
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, seatsFilled: Math.min(e.seatsTotal, e.seatsFilled + 1) } : e))
    );

    showToast(`RSVP Confirmed! Ticket Code: ${ticketCode}`, 'success');
    return { success: true, message: 'Registration confirmed!', ticketCode };
  };

  const cancelEventRegistration = (ticketCode: string) => {
    const target = registrations.find(r => r.ticketCode === ticketCode);
    if (target) {
      setRegistrations(prev => prev.filter(r => r.ticketCode !== ticketCode));
      // Decrement seats filled
      setEvents(prev =>
        prev.map(e => (e.id === target.eventId ? { ...e, seatsFilled: Math.max(0, e.seatsFilled - 1) } : e))
      );
      showToast('Event registration cancelled.', 'info');
    }
  };

  // Feedback
  const submitFeedback = (item: Omit<FeedbackItem, 'id' | 'submittedAt'>) => {
    const newFeedback: FeedbackItem = {
      ...item,
      id: Date.now(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    showToast('Thank you! Your feedback has been recorded.', 'success');
  };

  // Contact
  const submitContact = (item: Omit<ContactMessage, 'id' | 'submittedAt'>) => {
    const newMsg: ContactMessage = {
      ...item,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    };
    setContactMessages(prev => [newMsg, ...prev]);
    showToast('Your message has been sent to the university administration.', 'success');
  };

  // Notifications
  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <PortalContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        currentView,
        setCurrentView,
        login,
        logout,
        registerUser,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        cancelEventRegistration,
        registrations,
        faqs,
        feedbackList,
        submitFeedback,
        contactMessages,
        submitContact,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toast,
        showToast
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) throw new Error('usePortal must be used within a PortalProvider');
  return context;
};
