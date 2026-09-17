import React from 'react';
import { usePortal } from '../context/PortalContext';
import { GraduationCap, Mail, Phone, MapPin, Code2, Database, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenXamppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenXamppModal }) => {
  const { setCurrentView } = usePortal();

  const navigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Student<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A modern, semester-long unified college portal integrating academic management, campus events, secure role-based access, and administration into one single platform.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenXamppModal}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition-colors"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span>XAMPP / PHP / SQL Package</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-indigo-400 transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-indigo-400 transition-colors">
                  About Project
                </button>
              </li>
              <li>
                <button onClick={() => navigate('events')} className="hover:text-indigo-400 transition-colors">
                  Campus Events
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faq')} className="hover:text-indigo-400 transition-colors">
                  Help & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-indigo-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('feedback')} className="hover:text-indigo-400 transition-colors">
                  Student Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Syllabus Practical Mapping */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Semester Practicals</h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practicals 1–3: Semantic HTML5 & Responsive UI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practical 4: JavaScript Interactivity</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practical 5: Registration Validation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practical 6: Fetch API & JSON Datasets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practicals 7–9: PHP, MySQL & Secure Auth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Practicals 10–12: RBAC, Student & Event CRUD</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Campus Administration</h3>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <span>Academic Block 2, University Campus, Sector 12</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>support@studenthub.edu</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>+91 (02697) 265000 / Ext 402</span>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Compliant with W3C & WCAG AA Accessibility</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 StudentHub College Portal. All rights reserved. Built as ONE cohesive semester project.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('about')} className="hover:underline">Sitemap</button>
            <button onClick={() => navigate('faq')} className="hover:underline">Privacy & Policies</button>
            <button onClick={onOpenXamppModal} className="text-indigo-400 hover:underline font-medium">Local XAMPP Setup</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
