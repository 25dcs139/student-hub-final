import React from 'react';
import { usePortal } from '../context/PortalContext';
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Ticket,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const StudentDashboardView: React.FC = () => {
  const { currentUser, registrations, cancelEventRegistration, setCurrentView } = usePortal();

  if (!currentUser) {
    return (
      <div className="p-12 text-center">
        <p>Please log in to access your student portal.</p>
        <button onClick={() => setCurrentView('login')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl">
          Log In
        </button>
      </div>
    );
  }

  // Filter registrations for current student
  const myRegistrations = registrations.filter(
    r => r.studentId === (currentUser.studentId || 'STU-2024-001')
  );

  return (
    <main id="main-content" className="flex-1 w-full py-10 lg:py-14 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Card Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
                  {currentUser.studentId || 'STU-2024-001'}
                </span>
                <span className="text-xs text-indigo-200">Active Student</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome, {currentUser.name}!
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100">
                {currentUser.course || 'B.Tech Computer Science'} • {currentUser.year || '3rd Year'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 self-stretch sm:self-auto">
            <button
              onClick={() => setCurrentView('profile')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-900 bg-white hover:bg-indigo-50 shadow-md transition"
            >
              Academic Profile
            </button>
            <button
              onClick={() => setCurrentView('events')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-300/30 transition"
            >
              Claim Event Passes
            </button>
          </div>
        </div>

        {/* Academic Overview Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Cumulative GPA</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">3.88</p>
            <span className="text-[11px] text-emerald-600 font-semibold">Top 5% in Branch</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Attendance Rate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">92.5%</p>
            <span className="text-[11px] text-slate-400">Target: Minimum 75%</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Current Credits</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">24 / 24</p>
            <span className="text-[11px] text-blue-600 font-semibold">Semester On-Track</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Claimed Event Passes</span>
              <Ticket className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
              {myRegistrations.length}
            </p>
            <span className="text-[11px] text-slate-400">Active RSVPs</span>
          </div>
        </div>

        {/* Event Tickets / RSVPs Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Event Tickets & RSVPs</h2>
                <p className="text-xs text-slate-500">Show these passes at the event entrance for QR check-in</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('events')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Explore More Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {myRegistrations.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                You haven't reserved any event passes yet.
              </p>
              <button
                onClick={() => setCurrentView('events')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
              >
                Browse Campus Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myRegistrations.map(reg => (
                <div
                  key={reg.id}
                  className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 dark:from-slate-800/80 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 relative overflow-hidden flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-slate-700">
                        Pass Code: {reg.ticketCode}
                      </span>
                      <span className="text-[11px] text-slate-400">Registered: {reg.registeredAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white pt-1">
                      {reg.eventTitle}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Attendee: <strong>{reg.studentName}</strong> ({reg.studentId})
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Confirmed Admission
                    </span>
                    <button
                      onClick={() => cancelEventRegistration(reg.ticketCode)}
                      className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Student Actions & Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Student Shortcuts</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentView('profile')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100 dark:hover:bg-slate-750 transition border border-slate-200 dark:border-slate-700"
              >
                <GraduationCap className="w-5 h-5 text-indigo-600 mb-2" />
                <p className="font-bold text-sm text-slate-900 dark:text-white">Academic Record</p>
                <span className="text-xs text-slate-500">View semester grades</span>
              </button>

              <button
                onClick={() => setCurrentView('feedback')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100 dark:hover:bg-slate-750 transition border border-slate-200 dark:border-slate-700"
              >
                <FileText className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="font-bold text-sm text-slate-900 dark:text-white">Submit Feedback</p>
                <span className="text-xs text-slate-500">Rate courses & campus</span>
              </button>

              <button
                onClick={() => setCurrentView('faq')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100 dark:hover:bg-slate-750 transition border border-slate-200 dark:border-slate-700"
              >
                <TrendingUp className="w-5 h-5 text-blue-600 mb-2" />
                <p className="font-bold text-sm text-slate-900 dark:text-white">Help & FAQs</p>
                <span className="text-xs text-slate-500">Exams & regulations</span>
              </button>

              <button
                onClick={() => setCurrentView('contact')}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left hover:bg-slate-100 dark:hover:bg-slate-750 transition border border-slate-200 dark:border-slate-700"
              >
                <Clock className="w-5 h-5 text-purple-600 mb-2" />
                <p className="font-bold text-sm text-slate-900 dark:text-white">Contact Deans</p>
                <span className="text-xs text-slate-500">Official inquiries</span>
              </button>
            </div>
          </div>

          {/* Academic Announcements */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Academic Notice Board</h2>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">Exam Office</span>
                  <span>Sept 18, 2026</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">
                  Mid-Term Practical Evaluation Schedules
                </p>
                <p className="text-slate-500 mt-1">
                  Computer Laboratory evaluations for Web Engineering (Practicals 1 to 12) will commence from next Monday in Lab 4.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Placement Cell</span>
                  <span>Sept 16, 2026</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">
                  Pre-Placement Talk: Cloud Architecture & DevOps
                </p>
                <p className="text-slate-500 mt-1">
                  Registration open for 3rd and 4th year undergraduate engineering candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
