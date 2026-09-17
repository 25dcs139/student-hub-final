import React, { useState } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { XamppModal } from './components/XamppModal';

// Views
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { EventsView } from './components/EventsView';
import { FAQView } from './components/FAQView';
import { ContactView } from './components/ContactView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { StudentProfileView } from './components/StudentProfileView';
import { StudentFeedbackView } from './components/StudentFeedbackView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AdminStudentsView } from './components/AdminStudentsView';
import { AdminEventsView } from './components/AdminEventsView';

const PortalMain: React.FC = () => {
  const { currentView } = usePortal();
  const [isXamppModalOpen, setIsXamppModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'events':
        return <EventsView />;
      case 'faq':
        return <FAQView />;
      case 'contact':
        return <ContactView />;
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'dashboard':
        return <StudentDashboardView />;
      case 'profile':
        return <StudentProfileView />;
      case 'feedback':
        return <StudentFeedbackView />;
      case 'admin-dashboard':
        return <AdminDashboardView onOpenXamppModal={() => setIsXamppModalOpen(true)} />;
      case 'admin-students':
        return <AdminStudentsView />;
      case 'admin-events':
        return <AdminEventsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Header onOpenXamppModal={() => setIsXamppModalOpen(true)} />
      {renderActiveView()}
      <Footer onOpenXamppModal={() => setIsXamppModalOpen(true)} />
      <Toast />
      <XamppModal isOpen={isXamppModalOpen} onClose={() => setIsXamppModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <PortalProvider>
      <PortalMain />
    </PortalProvider>
  );
}
