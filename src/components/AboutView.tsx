import React from 'react';
import { usePortal } from '../context/PortalContext';
import {
  GraduationCap,
  Layers,
  Code2,
  CheckCircle2,
  Database,
  Lock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = usePortal();

  const practicals = [
    { id: 1, title: 'Project Foundation', desc: 'Sitemap, requirements, user roles (Student/Admin), Git repository architecture, and comprehensive README.' },
    { id: 2, title: 'Semantic HTML5', desc: 'Accessible document structure with <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, and skip-link.' },
    { id: 3, title: 'Responsive UI Design', desc: 'CSS Grid, Flexbox, media queries across Mobile, Tablet, and Desktop with unified academic design system.' },
    { id: 4, title: 'JavaScript Interactivity', desc: 'Mobile drawer menu, Dark/Light mode with localStorage persistence, FAQ accordion, event modal popup, and toast alerts.' },
    { id: 5, title: 'Registration Validation', desc: 'Strict regex validation for institutional email and mobile, interactive password strength meter, and required field checks.' },
    { id: 6, title: 'Fetch API & JSON Datasets', desc: 'Structured JSON data (data/events.json, data/students.json, data/faqs.json with 15+ records each) with search, filter, and pagination.' },
    { id: 7, title: 'PHP Form Processing', desc: 'Server-side POST data handling, HTML sanitization, input filtering, and prepared statements for contact and registration.' },
    { id: 8, title: 'MySQL Database & PDO', desc: 'Normalized relational schema (studenthub.sql) with tables: users, students, events, registrations, feedback, and PDO in db.php.' },
    { id: 9, title: 'Secure Registration', desc: 'BCrypt password hashing via password_hash(), duplicate email constraint enforcement, and prepared query insertion.' },
    { id: 10, title: 'Authentication & RBAC', desc: 'Session management with session_regenerate_id(), timeout handling, and strict role segregation between Student and Admin.' },
    { id: 11, title: 'Admin Student CRUD', desc: 'Complete Student Management module inside Admin console: Create, Read, Update, Delete with search, filter, and pagination.' },
    { id: 12, title: 'Admin Event CRUD & Poster Upload', desc: 'Event management with poster upload validation, capacity quotas, and live real-time sync with Student Events portal.' }
  ];

  return (
    <main id="main-content" className="flex-1 w-full py-12 lg:py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Semester-Long Web Engineering Project</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About StudentHub Portal
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            StudentHub is designed as a unified, enterprise-grade college student portal. Rather than creating disjointed mini-sites for individual practicals, StudentHub progressively unifies all 12 college curriculum requirements into a cohesive, production-ready system.
          </p>
        </div>

        {/* Unified Architecture Philosophy */}
        <section className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Core Architectural Philosophy</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">One Single Website, Progressively Built</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-base mb-2">1. Public Campus Layer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Clean, accessible landing portal with university mission, upcoming event schedules, searchable knowledge base, and official contact directories.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-base mb-2">2. Student Services Layer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Authenticated student area featuring academic statistics, profile editor, one-click event RSVP pass generation, and direct feedback submission.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-purple-600 dark:text-purple-400 text-base mb-2">3. Administration Layer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Role-gated administrative suite equipped with comprehensive Student CRUD, Event CRUD with poster upload validation, and real-time dashboard analytics.
              </p>
            </div>
          </div>
        </section>

        {/* 12 Practical Implementation Matrix */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Curriculum Practicals: Progressive Integration Matrix
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Every practical contributes concrete capabilities to StudentHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practicals.map(p => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      Practical {p.id}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sitemap Visual Tree */}
        <section className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold">Complete Application Sitemap</h2>
          </div>
          <div className="font-mono text-xs sm:text-sm bg-slate-950 p-6 rounded-2xl overflow-x-auto text-slate-300 border border-slate-800 leading-loose">
            <p className="text-indigo-400 font-bold">StudentHub Portal Architecture</p>
            <p>├── <span className="text-emerald-400 font-semibold">Public Modules</span></p>
            <p>│   ├── Home (Landing, metrics, upcoming events)</p>
            <p>│   ├── About (Mission, architecture, practicals matrix)</p>
            <p>│   ├── Events (Live search, multi-category filter, sort, modal RSVP)</p>
            <p>│   ├── FAQ (Categorized dynamic accordion with search)</p>
            <p>│   └── Contact (Campus office directory & validated inquiry form)</p>
            <p>├── <span className="text-amber-400 font-semibold">Authentication (Practicals 5, 9, 10)</span></p>
            <p>│   ├── Register (Regex validation, password strength meter, duplicate check)</p>
            <p>│   ├── Login (Role-based authentication: Student vs Admin)</p>
            <p>│   └── Logout (Session invalidation, cookie cleanup)</p>
            <p>├── <span className="text-blue-400 font-semibold">Student Portal (Authenticated)</span></p>
            <p>│   ├── Student Dashboard (Welcome banner, academic summary, quick actions, ticket passes)</p>
            <p>│   ├── My Profile (Academic information, skills tags, profile editing)</p>
            <p>│   └── Submit Feedback (Course evaluation & facility reviews)</p>
            <p>└── <span className="text-purple-400 font-semibold">Admin Portal (Authenticated Administrator)</span></p>
            <p>    ├── Admin Dashboard (Live campus metrics: total students, events, feedback)</p>
            <p>    ├── Student Management CRUD (Create, Read, Update, Delete with search & filter)</p>
            <p>    ├── Event Management CRUD (Create, Read, Update, Delete with poster upload)</p>
            <p>    └── XAMPP / PHP / SQL Package (studenthub.sql & db.php exporter)</p>
          </div>
        </section>
      </div>
    </main>
  );
};
