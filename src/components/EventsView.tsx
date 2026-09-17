import React, { useState, useMemo } from 'react';
import { usePortal } from '../context/PortalContext';
import { EventItem } from '../types';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  CheckCircle2,
  X,
  Share2,
  ArrowUpDown,
  Tag,
  AlertCircle
} from 'lucide-react';

export const EventsView: React.FC = () => {
  const { events, registerForEvent, registrations, currentUser, setCurrentView } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('date_asc');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar'];

  // Filter & Sort computation (Practical 6: Fetch API + Filtering & Sorting)
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(e => e.status === selectedStatus);
    }

    // Sorting
    if (sortBy === 'date_asc') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'date_desc') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.seatsFilled - a.seatsFilled);
    }

    return result;
  }, [events, searchQuery, selectedCategory, selectedStatus, sortBy]);

  const isRegisteredFor = (eventId: number) => {
    if (!currentUser) return false;
    return registrations.some(
      r => r.eventId === eventId && r.studentId === (currentUser.studentId || 'STU-2024-001')
    );
  };

  return (
    <main id="main-content" className="flex-1 w-full py-10 lg:py-14 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Campus Life & Extracurriculars</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              University Events & Hackathons
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Explore national hackathons, technical bootcamps, cultural fests, and athletic competitions.
            </p>
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin-events')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md transition self-start"
            >
              + Manage / Add Event (Admin CRUD)
            </button>
          )}
        </div>

        {/* Filter, Search, and Sort Controls (Practical 6) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="events-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search events by title, keyword, or venue..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <select
                id="events-status-select"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Statuses</option>
                <option value="Upcoming">Upcoming Events</option>
                <option value="Completed">Completed Archive</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-3">
              <div className="relative">
                <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  id="events-sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="date_asc">Date: Earliest First</option>
                  <option value="date_desc">Date: Latest First</option>
                  <option value="title">Alphabetical (A-Z)</option>
                  <option value="popular">Most Popular (Seats)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredEvents.length}</strong> campus events</span>
          {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No matching events found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your search keywords or switching categories to discover campus events.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const registered = isRegisteredFor(event.id);
              const seatsAvailable = event.seatsTotal - event.seatsFilled;
              const isFull = seatsAvailable <= 0;

              return (
                <article
                  key={event.id}
                  className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300"
                >
                  {/* Poster Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                    <img
                      src={event.poster}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                      {event.category}
                    </span>
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                        event.status === 'Completed'
                          ? 'bg-slate-800 text-slate-300'
                          : isFull
                          ? 'bg-rose-500 text-white'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {event.status === 'Completed' ? 'Completed' : isFull ? 'Sold Out' : `${seatsAvailable} seats left`}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.date} • {event.time}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-1 hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed pt-1">
                        {event.description}
                      </p>

                      {/* Seats Progress Bar */}
                      <div className="pt-2">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                          <span>Capacity Progress</span>
                          <span>{event.seatsFilled} / {event.seatsTotal} enrolled</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              event.seatsFilled / event.seatsTotal > 0.85 ? 'bg-rose-500' : 'bg-indigo-600'
                            }`}
                            style={{ width: `${Math.min(100, (event.seatsFilled / event.seatsTotal) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        Details
                      </button>

                      {event.status === 'Completed' ? (
                        <span className="text-xs font-semibold text-slate-400 italic">Concluded</span>
                      ) : registered ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Registered</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            if (!currentUser) {
                              setCurrentView('login');
                            } else {
                              registerForEvent(event.id);
                            }
                          }}
                          disabled={isFull}
                          className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all ${
                            isFull
                              ? 'bg-slate-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]'
                          }`}
                        >
                          {isFull ? 'Sold Out' : 'Claim RSVP Ticket'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Event Details Modal Popup (Practical 4: Modal popup) */}
        {activeModalEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={activeModalEvent.poster}
                    alt={activeModalEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white">
                    {activeModalEvent.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {activeModalEvent.status} Event
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {activeModalEvent.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeModalEvent.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Date & Timing</span>
                    <p className="font-bold text-slate-800 dark:text-white mt-0.5">
                      {activeModalEvent.date} ({activeModalEvent.time})
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Location / Venue</span>
                    <p className="font-bold text-slate-800 dark:text-white mt-0.5">{activeModalEvent.venue}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Host Organizer</span>
                    <p className="font-bold text-slate-800 dark:text-white mt-0.5">{activeModalEvent.organizer}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Faculty Coordinator</span>
                    <p className="font-bold text-slate-800 dark:text-white mt-0.5">{activeModalEvent.coordinator}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500">
                    <span>Seats remaining: <strong>{activeModalEvent.seatsTotal - activeModalEvent.seatsFilled}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalEvent(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Close
                    </button>
                    {isRegisteredFor(activeModalEvent.id) ? (
                      <span className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200">
                        ✓ Registered
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          registerForEvent(activeModalEvent.id);
                          setActiveModalEvent(null);
                        }}
                        disabled={activeModalEvent.seatsFilled >= activeModalEvent.seatsTotal}
                        className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
                      >
                        Confirm Ticket Reservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
