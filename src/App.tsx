import { useState, useEffect } from "react";
import type { Event } from "./types/event";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import "./App.css";

function App() {
  // 1. Khởi tạo State
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // 2. Lưu vào LocalStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // 3. Các hàm xử lý logic
  const saveEvent = (event: Event) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === event.id ? event : e));
      setEditingEvent(null);
    } else {
      setEvents([...events, event]);
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    if (editingEvent?.id === id) setEditingEvent(null);
  };

  const toggleComplete = (id: number) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  // 4. Derived State: Lọc sự kiện theo thanh tìm kiếm
  const displayedEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* KHU VỰC HEADER VÀ TÌM KIẾM */}
      <div className="header-section">
        <h1>Event Manager</h1>
        <input 
          type="text" 
          className="search-input"
          placeholder="Tìm kiếm sự kiện..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <EventForm 
        onSave={saveEvent} 
        editingEvent={editingEvent} 
        cancelEdit={() => setEditingEvent(null)}
      />
      
      {/* Lưu ý: Truyền displayedEvents thay vì events để danh sách hiển thị đúng kết quả tìm kiếm */}
      <EventList 
        events={displayedEvents} 
        deleteEvent={deleteEvent} 
        toggleComplete={toggleComplete}
        setEditingEvent={setEditingEvent} 
      />
    </div>
  );
}

export default App;