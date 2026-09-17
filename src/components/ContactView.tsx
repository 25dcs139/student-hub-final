import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitContact, showToast } = usePortal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Academics & Examination',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the contact form.', 'error');
      return;
    }

    submitContact({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      subject: formData.subject,
      message: formData.message
    });

    setSubmittedSuccess(true);
    setFormData({
      name: '',
      email: '',
      department: 'Academics & Examination',
      subject: '',
      message: ''
    });
  };

  return (
    <main id="main-content" className="flex-1 w-full py-12 lg:py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Campus Office Directory & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact StudentHub Administration
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Have a question about courses, admissions, fees, or technical portal queries? Connect directly with the respective college wing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form (Practical 7: PHP/React Form processing) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send an Official Message</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                All inquiries receive a ticket confirmation and are routed to the designated departmental dean.
              </p>

              {submittedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                    Message Successfully Dispatched!
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
                    Your inquiry has been assigned reference ticket <strong>#INQ-{Math.floor(1000 + Math.random() * 9000)}</strong>. The administrative staff will follow up via your registered email within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                          errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Institutional Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@studenthub.edu"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                          errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Department */}
                    <div>
                      <label htmlFor="contact-department" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Department
                      </label>
                      <select
                        id="contact-department"
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option>Academics & Examination</option>
                        <option>Student Affairs & Clubs</option>
                        <option>Training & Placement Cell</option>
                        <option>Hostel & Campus Facilities</option>
                        <option>Accounts & Scholarships</option>
                        <option>Portal Technical Support</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Inquiry Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Grade verification request"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                          errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                        } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Message * (Min. 15 characters)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify your query with enrollment number, course, and details..."
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                        errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    id="submit-contact-btn"
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Campus Directory & Office Locations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Departmental Helplines</span>
              </h2>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Office of the Dean of Academics</p>
                  <p className="text-slate-500">Block B, 2nd Floor, Room B-204</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">dean.academics@studenthub.edu • Ext 101</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Controller of Examinations (CoE)</p>
                  <p className="text-slate-500">Administrative Tower, Ground Floor</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">coe@studenthub.edu • Ext 108</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">IT Center & Portal Helpdesk</p>
                  <p className="text-slate-500">Computer Center, Server Wing 1</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">itsupport@studenthub.edu • Ext 250</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Student Welfare & Sports Council</p>
                  <p className="text-slate-500">Student Activity Center (SAC)</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">welfare@studenthub.edu • Ext 314</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Working Hours: Mon–Fri, 9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
