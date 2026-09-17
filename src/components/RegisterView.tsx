import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  UserPlus,
  Mail,
  Phone,
  BookOpen,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';

export const RegisterView: React.FC = () => {
  const { registerUser, setCurrentView, showToast } = usePortal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: 'B.Tech Computer Science',
    year: '1st Year',
    gender: 'Male',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password Strength Meter (Practical 5)
  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { score: 0, label: 'None', color: 'bg-slate-200' };

    let score = 0;
    if (p.length >= 8) score += 1;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 1;
    if (/\d/.test(p)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) score += 1;

    if (score === 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-blue-500' };
    if (score >= 4) return { score: 100, label: 'Very Strong', color: 'bg-emerald-500' };
    return { score: 15, label: 'Too short', color: 'bg-rose-400' };
  }, [formData.password]);

  // Client-Side Validation Logic (Practical 5)
  const validateForm = () => {
    const errs: Record<string, string> = {};

    // Name
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errs.name = 'Name must contain only alphabets and spaces.';
    }

    // Email
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid institutional email address.';
    }

    // Mobile (10 digits)
    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errs.mobile = 'Mobile number must be exactly 10 digits.';
    }

    // Password
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    // Terms
    if (!formData.terms) {
      errs.terms = 'You must agree to the academic code of conduct.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the validation errors.', 'error');
      return;
    }

    const result = registerUser(formData);
    if (!result.success) {
      setErrors({ email: result.message });
      showToast(result.message, 'error');
    }
  };

  return (
    <main id="main-content" className="flex-1 w-full py-12 lg:py-16 bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-xl space-y-6">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/25">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            New Student Portal Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Fulfills Practical 5: Form Validation with RegEx & Strength Meter
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name * (Letters only)
              </label>
              <input
                id="reg-name"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Institutional Email *
                </label>
                <input
                  id="reg-email"
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

              {/* Mobile (10 digits) */}
              <div>
                <label htmlFor="reg-mobile" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number * (10 Digits)
                </label>
                <input
                  id="reg-mobile"
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="9876543210"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                    errors.mobile ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.mobile && <p className="text-[11px] text-rose-500 mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Course */}
              <div>
                <label htmlFor="reg-course" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Course / Major
                </label>
                <select
                  id="reg-course"
                  value={formData.course}
                  onChange={e => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>B.Tech Computer Science</option>
                  <option>B.Tech Information Tech</option>
                  <option>B.Tech AI & Data Science</option>
                  <option>B.Tech Electronics & Comm</option>
                  <option>B.Tech Mechanical Eng</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label htmlFor="reg-year" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Year
                </label>
                <select
                  id="reg-year"
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="reg-gender" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  id="reg-gender"
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Password & Strength Meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label htmlFor="reg-password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password * (Min. 8 chars)
                </label>
                {formData.password && (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Strength: <strong className="text-slate-800 dark:text-white">{passwordStrength.label}</strong>
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password..."
                  className={`w-full px-3.5 pr-10 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                    errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Progress Bar (Practical 5) */}
              {formData.password && (
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
              )}
              {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm-password" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password *
              </label>
              <input
                id="reg-confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter your password..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border ${
                  errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Code of Conduct Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  id="reg-terms-check"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={e => setFormData({ ...formData, terms: e.target.checked })}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  I certify that all information provided is accurate and agree to adhere to the Student Code of Conduct and IT policy.
                </span>
              </label>
              {errors.terms && <p className="text-[11px] text-rose-500 mt-1">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              id="submit-register-btn"
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Registration & Sign In</span>
            </button>
          </form>
        </div>

        {/* Footer Switch to Login */}
        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => setCurrentView('login')}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign in to your account
          </button>
        </p>
      </div>
    </main>
  );
};
