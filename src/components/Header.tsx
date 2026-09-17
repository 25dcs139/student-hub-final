import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  GraduationCap,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  BookOpen,
  Calendar,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Database
} from 'lucide-react';

interface HeaderProps {
  onOpenXamppModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenXamppModal }) => {
  const {
    theme,
    toggleTheme,
    currentUser,
    currentView,
    setCurrentView,
    logout,
    login,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = usePortal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigate = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Skip to Content for Accessibility (Practical 2) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  Student<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                  College Portal
                </span>
              </div>
            </button>

            {/* Role Badge Indicator */}
            {currentUser && (
              <span
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                }`}
              >
                {currentUser.role === 'admin' ? <Shield className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                {currentUser.role === 'admin' ? 'Admin Portal' : 'Student'}
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            <button
              id="nav-home"
              onClick={() => navigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </button>
            <button
              id="nav-about"
              onClick={() => navigate('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              About
            </button>
            <button
              id="nav-events"
              onClick={() => navigate('events')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'events'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Events
            </button>
            <button
              id="nav-faq"
              onClick={() => navigate('faq')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'faq'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              FAQ
            </button>
            <button
              id="nav-contact"
              onClick={() => navigate('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'contact'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Contact
            </button>

            {/* Authenticated Student Specific Navigation */}
            {currentUser && currentUser.role === 'student' && (
              <>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button
                  id="nav-dashboard"
                  onClick={() => navigate('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentView === 'dashboard'
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  id="nav-profile"
                  onClick={() => navigate('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'profile'
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Profile
                </button>
                <button
                  id="nav-feedback"
                  onClick={() => navigate('feedback')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'feedback'
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Feedback
                </button>
              </>
            )}

            {/* Authenticated Admin Specific Navigation */}
            {currentUser && currentUser.role === 'admin' && (
              <>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
                <button
                  id="nav-admin-dashboard"
                  onClick={() => navigate('admin-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    currentView === 'admin-dashboard'
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50/70 dark:bg-purple-950/50'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Admin Hub
                </button>
                <button
                  id="nav-admin-students"
                  onClick={() => navigate('admin-students')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'admin-students'
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50/70 dark:bg-purple-950/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Manage Students
                </button>
                <button
                  id="nav-admin-events"
                  onClick={() => navigate('admin-events')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'admin-events'
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50/70 dark:bg-purple-950/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Manage Events
                </button>
              </>
            )}
          </nav>

          {/* Right Controls: XAMPP package, Theme Toggle, Notifications, Auth */}
          <div className="flex items-center gap-2">
            {/* XAMPP / PHP Deployment Package Button */}
            <button
              id="xampp-package-btn"
              onClick={onOpenXamppModal}
              title="View Practical 8-12 PHP & MySQL XAMPP Package"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>XAMPP / SQL</span>
            </button>

            {/* Theme Toggle (Practical 4) */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Dark or Light Mode"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-bell-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View notifications"
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 py-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                          !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Demo Switcher / User Menu */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-400 transition"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 py-3 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <span className="mt-1 inline-block text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        Role: {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'student' ? (
                        <>
                          <button
                            onClick={() => navigate('dashboard')}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            My Dashboard
                          </button>
                          <button
                            onClick={() => navigate('profile')}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <UserIcon className="w-4 h-4 text-slate-400" />
                            Academic Profile
                          </button>
                          <button
                            onClick={() => {
                              login('admin@studenthub.edu', 'StudentHub@2026', 'admin');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            Switch to Admin Role
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => navigate('admin-dashboard')}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4 text-purple-500" />
                            Admin Console
                          </button>
                          <button
                            onClick={() => navigate('admin-students')}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <UserIcon className="w-4 h-4 text-slate-400" />
                            Student CRUD
                          </button>
                          <button
                            onClick={() => navigate('admin-events')}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4 text-slate-400" />
                            Event CRUD
                          </button>
                          <button
                            onClick={() => {
                              login('aarav.sharma@studenthub.edu', 'StudentHub@2026', 'student');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center gap-2"
                          >
                            <GraduationCap className="w-3.5 h-3.5" />
                            Switch to Student Role
                          </button>
                        </>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 pt-1">
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  id="header-login-btn"
                  onClick={() => navigate('login')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  id="header-register-btn"
                  onClick={() => navigate('register')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle (Practical 4) */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-fade-in">
          <button
            onClick={() => navigate('home')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
              currentView === 'home'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('about')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
              currentView === 'about'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            About StudentHub
          </button>
          <button
            onClick={() => navigate('events')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
              currentView === 'events'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Campus Events
          </button>
          <button
            onClick={() => navigate('faq')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
              currentView === 'faq'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => navigate('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-base font-medium ${
              currentView === 'contact'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            Contact
          </button>

          {currentUser && currentUser.role === 'student' && (
            <>
              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
              <button
                onClick={() => navigate('dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40"
              >
                Student Dashboard
              </button>
              <button
                onClick={() => navigate('profile')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate('feedback')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200"
              >
                Submit Feedback
              </button>
            </>
          )}

          {currentUser && currentUser.role === 'admin' && (
            <>
              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
              <button
                onClick={() => navigate('admin-dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold text-purple-600 dark:text-purple-400 bg-purple-50/60 dark:bg-purple-950/40"
              >
                Admin Dashboard
              </button>
              <button
                onClick={() => navigate('admin-students')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200"
              >
                Manage Students
              </button>
              <button
                onClick={() => navigate('admin-events')}
                className="w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200"
              >
                Manage Events
              </button>
            </>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenXamppModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center rounded-xl text-sm font-semibold bg-amber-50 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-200 dark:border-amber-800 flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-amber-600" />
              XAMPP / PHP / SQL Package
            </button>

            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={() => navigate('login')}
                  className="py-2.5 text-center rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="py-2.5 text-center rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full py-2.5 text-center rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
