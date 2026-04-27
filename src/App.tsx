import { useState, useEffect, useMemo } from "react";
import type { Event, GroupBy, SortBy, Category } from "./types/event";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import StatsBar from "./components/StatsBar";
import Toolbar from "./components/Toolbar";

function App() {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("events_v2");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [groupBy, setGroupBy] = useState<GroupBy>("day");
  const [sortBy, setSortBy] = useState<SortBy>("date-asc");
  const [filterCategory, setFilterCategory] = useState<Category | "Tất cả">("Tất cả");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem("events_v2", JSON.stringify(events));
  }, [events]);

  const saveEvent = (event: Event) => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === event.id ? event : e));
      setEditingEvent(null);
    } else {
      setEvents(prev => [...prev, event]);
    }
    setShowForm(false);
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    if (editingEvent?.id === id) setEditingEvent(null);
  };

  const toggleComplete = (id: number) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setShowForm(false);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchCategory = filterCategory === "Tất cả" || e.category === filterCategory;
      const matchStatus = filterStatus === "all" ||
        (filterStatus === "completed" ? e.completed : !e.completed);
      return matchSearch && matchCategory && matchStatus;
    });
  }, [events, searchTerm, filterCategory, filterStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Event Manager
              </h1>
              <p className="text-slate-400 text-sm mt-1">Quản lý sự kiện thông minh</p>
            </div>
            <button
              onClick={() => { setEditingEvent(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sự kiện
            </button>
          </div>

          <StatsBar events={events} />
        </header>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg">
              <EventForm
                onSave={saveEvent}
                editingEvent={editingEvent}
                cancelEdit={cancelEdit}
              />
            </div>
          </div>
        )}

        {/* Toolbar: search + filter + sort + group */}
        <Toolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Event List */}
        <EventList
          events={filteredEvents}
          groupBy={groupBy}
          sortBy={sortBy}
          deleteEvent={deleteEvent}
          toggleComplete={toggleComplete}
          setEditingEvent={startEdit}
        />
      </div>
    </div>
  );
}

export default App;