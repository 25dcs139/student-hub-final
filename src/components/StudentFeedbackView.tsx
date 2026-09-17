import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  MessageSquare,
  Star,
  Send,
  CheckCircle2,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

export const StudentFeedbackView: React.FC = () => {
  const { currentUser, feedbackList, submitFeedback, showToast } = usePortal();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('Campus Facilities');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || message.trim().length < 10) {
      setError('Feedback comments must be at least 10 characters long.');
      return;
    }

    submitFeedback({
      name: currentUser?.name || 'Aarav Sharma',
      email: currentUser?.email || 'student@studenthub.edu',
      category,
      rating,
      message
    });

    setMessage('');
    setError('');
  };

  return (
    <main id="main-content" className="flex-1 w-full py-10 lg:py-14 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Student Voice & Continuous Improvement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Feedback & Grievance Cell
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Your constructive suggestions directly impact infrastructure, academic quality, and event arrangements across the university.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Submit New Feedback</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category */}
                <div>
                  <label htmlFor="fb-cat" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Evaluation Category
                  </label>
                  <select
                    id="fb-cat"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Campus Facilities</option>
                    <option>Course Curriculum</option>
                    <option>Faculty & Teaching</option>
                    <option>Events & Sports</option>
                    <option>Examination & Evaluation</option>
                    <option>Hostel & Cafeteria</option>
                  </select>
                </div>

                {/* Star Rating (Interactive 1 to 5) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Experience Rating: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{hoverRating || rating} / 5</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-300 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="fb-msg" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Remarks & Suggestions *
                  </label>
                  <textarea
                    id="fb-msg"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Share detailed feedback or suggestions for enhancement..."
                    className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {error && <p className="text-[11px] text-rose-500 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Evaluation</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Submitted Reviews Feed */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Campus Feedback Stream</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {feedbackList.length} reviews
              </span>
            </h2>

            <div className="space-y-4">
              {feedbackList.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.submittedAt}</span>
                    </div>

                    {/* Star Display */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= item.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
