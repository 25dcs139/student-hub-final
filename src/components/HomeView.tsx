import React from 'react';
import { usePortal } from '../context/PortalContext';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Award,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  LogIn,
  UserPlus
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentView, currentUser, events, students, feedbackList, registerForEvent } = usePortal();

  const upcomingEvents = events.slice(0, 3);

  return (
    <main id="main-content" className="flex-1 w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Notice Banner */}
      <div className="bg-indigo-600 text-white px-4 py-2 text-xs sm:text-sm font-medium text-center flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
        <span>Academic Alert: Registrations for Semester End Technical Hackathons & Sports Week are now live!</span>
        <button
          onClick={() => setCurrentView('events')}
          className="underline font-bold hover:text-indigo-200 ml-1"
        >
          Browse Events &rarr;
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/60 via-transparent to-transparent dark:from-indigo-950/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Unified College Academic & Campus Portal</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Welcome to <span className="text-indigo-600 dark:text-indigo-400">StudentHub</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                The centralized gateway for university students, faculty, and administration. Seamlessly access course materials, claim event passes, manage your academic profile, and track your college journey.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!currentUser ? (
                  <>
                    <button
                      id="hero-register-btn"
                      onClick={() => setCurrentView('register')}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register for Portal
                    </button>
                    <button
                      id="hero-login-btn"
                      onClick={() => setCurrentView('login')}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <LogIn className="w-4 h-4 text-indigo-600" />
                      Student / Admin Login
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <span>Go to {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  id="hero-events-btn"
                  onClick={() => setCurrentView('events')}
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Explore Events
                </button>
              </div>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Role-Based Access (RBAC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-Time Event RSVPs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>MySQL & PHP Ready</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl">
                      SH
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Campus Pulse</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Semester 2026 Live Status</p>
                    </div>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                {/* Quick Interactive Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-500">Enrolled Students</span>
                    <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                      {students.length > 0 ? students.length * 150 : '3,240'}+
                    </p>
                    <span className="text-[11px] text-emerald-600 font-medium">↑ 12% from last term</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-500">Upcoming Events</span>
                    <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                      {events.length}
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium">Hackathons & Fests</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-500">Feedback Rating</span>
                    <p className="text-2xl font-extrabold text-amber-500 mt-1">4.8 / 5.0</p>
                    <span className="text-[11px] text-slate-500 font-medium">{feedbackList.length + 120} reviews</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-500">Campus Placement</span>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">94.2%</p>
                    <span className="text-[11px] text-emerald-600 font-medium">Top Tier Recruiters</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between text-xs">
                  <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                    Student Registration: <strong>Open for All Branches</strong>
                  </span>
                  <button
                    onClick={() => setCurrentView('register')}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid Section */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Everything You Need in One Unified Portal
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Engineered to fulfill all 12 college curriculum practicals under one seamless architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => setCurrentView(currentUser ? 'dashboard' : 'login')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Student Dashboard</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Personalized overview with enrolled course details, GPA stats, attendance indicators, recent activities, and claimed event passes.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setCurrentView('events')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Events & Hackathons</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Live campus event feed with real-time category filtering (Technical, Cultural, Sports), search query, ticket allocation, and RSVP booking.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setCurrentView('faq')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Interactive FAQ Base</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Instant keyword search, categorized accordions, and helpfulness metrics powered by JSON data datasets (Practical 6).
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => setCurrentView('feedback')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Feedback & Grievances</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Transparent feedback submission system with star ratings and category tags, storing records cleanly for administration review.
            </p>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => setCurrentView(currentUser?.role === 'admin' ? 'admin-students' : 'login')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Student CRUD Management</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Full admin operations to Create, Read, Update, and Delete student records with branch filters, search, and pagination (Practical 11).
            </p>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => setCurrentView(currentUser?.role === 'admin' ? 'admin-events' : 'login')}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Event CRUD & Poster Upload</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Admin controls to publish campus events, manage seating quotas, validate poster uploads, and instantly sync with the student view.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events Preview */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Upcoming Campus Events</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Reserve your seats early before tickets run out.</p>
            </div>
            <button
              onClick={() => setCurrentView('events')}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>View All Events ({events.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                    {event.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-sm">
                    {event.seatsTotal - event.seatsFilled} seats left
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{event.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{event.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentView('events')}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Details & Info
                    </button>
                    <button
                      onClick={() => registerForEvent(event.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition"
                    >
                      RSVP / Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Get Started with StudentHub?</h2>
          <p className="text-indigo-100 text-base max-w-2xl mx-auto">
            Join thousands of students and faculty members. Access schedules, collaborate on technical projects, and stay informed with instant campus updates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {!currentUser ? (
              <>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-indigo-700 bg-white hover:bg-indigo-50 shadow-lg transition hover:scale-105"
                >
                  Create Student Account
                </button>
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-400/40 shadow-lg transition"
                >
                  Sign In Now
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-6 py-3 rounded-xl text-sm font-bold text-indigo-700 bg-white hover:bg-indigo-50 shadow-lg transition hover:scale-105"
              >
                Open My Dashboard
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
