import { useState, useEffect } from "react";
import type { Event, Category } from "../types/event";

type Props = {
  onSave: (event: Event) => void;
  editingEvent: Event | null;
  cancelEdit: () => void;
};

const CATEGORIES: Category[] = ["Học tập", "Làm việc", "Cá nhân", "Khác"];

function EventForm({ onSave, editingEvent, cancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("Khác");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setCategory(editingEvent.category);
    } else {
      setTitle("");
      setDate("");
      setCategory("Khác");
    }
  }, [editingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const eventData: Event = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      date,
      category,
      completed: editingEvent ? editingEvent.completed : false,
    };

    onSave(eventData);
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input 
        type="text" 
        placeholder="Tên sự kiện" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      
      <button type="submit">{editingEvent ? "Cập nhật" : "Thêm"}</button>
      {editingEvent && <button type="button" onClick={cancelEdit}>Hủy</button>}
    </form>
  );
}

export default EventForm;