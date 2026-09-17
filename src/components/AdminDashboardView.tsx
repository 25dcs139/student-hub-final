import React from 'react';
import { usePortal } from '../context/PortalContext';
import {
  Shield,
  Users,
  Calendar,
  Ticket,
  MessageSquare,
  ArrowRight,
  Database,
  CheckCircle2,
  TrendingUp,
  Server,
  Download
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenXamppModal: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({ onOpenXamppModal }) => {
  const { students, events, registrations, feedbackList, setCurrentView } = usePortal();

  return (
    <main id="main-content" className="flex-1 w-full py-10 lg:py-14 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Institutional Administration Hub (Practicals 10–12)</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dean & Administrator Console
            </h1>
            <p className="text-sm text-slate-500">
              Role-Based Access Control (RBAC) active. Overseeing student records, campus events, and system databases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenXamppModal}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-amber-600" />
              <span>Inspect MySQL / XAMPP Schema</span>
            </button>
            <button
              onClick={() => setCurrentView('admin-students')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md transition"
            >
              Manage Students CRUD
            </button>
          </div>
        </div>

        {/* High-Level Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setCurrentView('admin-students')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-purple-500/50 transition group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Total Students</span>
              <Users className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{students.length}</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <span>Practical 11 Active</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div
            onClick={() => setCurrentView('admin-events')}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-purple-500/50 transition group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Published Events</span>
              <Calendar className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{events.length}</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
              <span>Practical 12 Active</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Event Registrations</span>
              <Ticket className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{registrations.length}</p>
            <span className="text-[11px] text-slate-400">Total tickets issued</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold">Student Feedback</span>
              <MessageSquare className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{feedbackList.length}</p>
            <span className="text-[11px] text-slate-400">Quality reviews</span>
          </div>
        </div>

        {/* Main Admin Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Management Shortcuts */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Admin Operations</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setCurrentView('admin-students')}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Practical 11</span>
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Management CRUD</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Create new student admissions, search records, edit course/year details, and remove records with full confirmation.
                  </p>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 pt-1">
                    Launch Student CRUD &rarr;
                  </span>
                </div>

                <div
                  onClick={() => setCurrentView('admin-events')}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Practical 12</span>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Event Management CRUD</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Publish university fests, configure seating capacity, validate poster upload URLs, and manage live ticket registrations.
                  </p>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 inline-flex items-center gap-1 pt-1">
                    Launch Event CRUD &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Event Ticket RSVPs</h3>
                <span className="text-xs text-slate-400">{registrations.length} total issued</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Ticket Code</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Event Title</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {registrations.slice(0, 5).map(reg => (
                      <tr key={reg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {reg.ticketCode}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{reg.studentName}</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{reg.eventTitle}</td>
                        <td className="py-2.5 px-3 text-slate-400">{reg.registeredAt}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Database Health & Architecture */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">System Architecture</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Frontend Engine</span>
                  <span className="text-emerald-600 font-bold">React 18 + Vite</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Security Layer</span>
                  <span className="text-purple-600 font-bold">RBAC & BCrypt</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Database Schema</span>
                  <span className="text-amber-600 font-bold">MySQL Relational</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Backend Driver</span>
                  <span className="text-blue-600 font-bold">PHP 8.2 + PDO</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenXamppModal}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export XAMPP Setup Docs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
