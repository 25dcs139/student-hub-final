import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  BookOpen,
  X
} from 'lucide-react';

export const FAQView: React.FC = () => {
  const { faqs, setCurrentView } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<number[]>([1]); // default open first item
  const [votedIds, setVotedIds] = useState<number[]>([]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map(f => f.category)));
    return ['All', ...cats];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const toggleAccordion = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleVoteHelpful = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!votedIds.includes(id)) {
      setVotedIds(prev => [...prev, id]);
    }
  };

  return (
    <main id="main-content" className="flex-1 w-full py-12 lg:py-16 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Student Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Find quick answers regarding admissions, exams, course registrations, events, and portal technical support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. attendance, registration, password, certs)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List (Practical 4: FAQ Accordion) */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                No matching questions found for "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline"
              >
                Reset search filters
              </button>
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = openIds.includes(faq.id);
              const hasVoted = votedIds.includes(faq.id);
              const helpfulVotes = faq.helpfulCount + (hasVoted ? 1 : 0);

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors focus:outline-none"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                        {faq.category}
                      </span>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </h2>
                    </div>
                    <div className="shrink-0 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
                      <p className="leading-relaxed">{faq.answer}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="text-[11px]">Was this answer helpful?</span>
                        <button
                          onClick={e => handleVoteHelpful(faq.id, e)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-semibold text-xs ${
                            hasVoted
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{helpfulVotes} found this helpful</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Still need assistance?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Reach out directly to the registrar or student council helpdesk.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('contact')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition shrink-0"
          >
            Contact Helpdesk &rarr;
          </button>
        </div>
      </div>
    </main>
  );
};
