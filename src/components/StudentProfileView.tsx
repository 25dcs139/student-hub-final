import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  User as UserIcon,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Award,
  CheckCircle2,
  Edit3,
  Save,
  Plus,
  X,
  FileCheck
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { currentUser, updateStudent, students, showToast } = usePortal();

  // Find detailed student record
  const currentStudent = students.find(s => s.id === currentUser?.id) || students[0];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentStudent?.name || currentUser?.name || 'Aarav Sharma',
    mobile: currentStudent?.mobile || '9876543210',
    course: currentStudent?.course || 'B.Tech Computer Science',
    year: currentStudent?.year || '3rd Year'
  });

  const [skills, setSkills] = useState<string[]>(
    currentStudent?.skills || ['HTML5', 'CSS3', 'JavaScript', 'React', 'PHP', 'MySQL']
  );
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    if (currentStudent) {
      updateStudent(currentStudent.id, {
        name: formData.name,
        mobile: formData.mobile,
        course: formData.course,
        year: formData.year,
        skills
      });
    }
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Sample academic grade ledger
  const academicGrades = [
    { code: 'CS-301', title: 'Web Application Engineering', credits: 4, grade: 'A+', points: 10 },
    { code: 'CS-302', title: 'Relational Database Systems (SQL)', credits: 4, grade: 'A', points: 9 },
    { code: 'CS-303', title: 'Data Structures & Algorithms', credits: 4, grade: 'A+', points: 10 },
    { code: 'CS-304', title: 'Operating Systems & Linux Shell', credits: 3, grade: 'A', points: 9 },
    { code: 'CS-305', title: 'Object-Oriented Design & Java', credits: 3, grade: 'B+', points: 8 }
  ];

  return (
    <main id="main-content" className="flex-1 w-full py-10 lg:py-14 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
              <UserIcon className="w-3.5 h-3.5" />
              <span>Verified Student Record</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Academic Student Profile
            </h1>
            <p className="text-sm text-slate-500">
              Institutional ID: <strong>{currentStudent?.studentId || 'STU-2024-001'}</strong> • Department of Computer Engineering
            </p>
          </div>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition self-start ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Personal Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={currentStudent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={formData.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30"
                />
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{formData.name}</h2>
                  <p className="text-xs text-slate-500">{currentStudent?.email || currentUser?.email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Active Enrollment
                  </span>
                </div>
              </div>

              {/* Profile Details Form / View */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Mobile Contact</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">+91 {formData.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Degree & Major</label>
                  {isEditing ? (
                    <select
                      value={formData.course}
                      onChange={e => setFormData({ ...formData, course: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option>B.Tech Computer Science</option>
                      <option>B.Tech Information Tech</option>
                      <option>B.Tech AI & Data Science</option>
                      <option>B.Tech Electronics & Comm</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formData.course}</p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-500 mb-1">Academic Year</label>
                  {isEditing ? (
                    <select
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formData.year}</p>
                  )}
                </div>
              </div>

              {/* Technical Skills & Competencies */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Technical Skills & Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="hover:text-rose-500">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      placeholder="Add new skill..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Academic Performance Ledger */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">Semester Academic Ledger</h2>
                    <p className="text-xs text-slate-500">Official Credit Evaluation for Current Term</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Semester GPA: 3.88
                </span>
              </div>

              {/* Responsive Table (Practical 2/3) */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="py-3 px-3">Course Code</th>
                      <th className="py-3 px-3">Course Title</th>
                      <th className="py-3 px-3 text-center">Credits</th>
                      <th className="py-3 px-3 text-center">Grade</th>
                      <th className="py-3 px-3 text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {academicGrades.map(item => (
                      <tr key={item.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.code}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{item.title}</td>
                        <td className="py-3 px-3 text-center">{item.credits}</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {item.grade}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-bold">{item.points} / 10</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-300">
                <span>Total Semester Earned Credits: <strong>18 Credits</strong></span>
                <span>Cumulative Status: <strong>First Class with Distinction</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
