import type { Event } from "../types/event";

type Props = {
  event: Event;
  deleteEvent: (id: number) => void;
  toggleComplete: (id: number) => void;
  setEditingEvent: (event: Event) => void; 
};

function EventItem({ event, deleteEvent, toggleComplete, setEditingEvent }: Props) {
  return (
    <div className={`event-item ${event.completed ? 'completed' : ''}`}>
      <div className="event-info">
        <input 
          type="checkbox" 
          checked={event.completed} 
          onChange={() => toggleComplete(event.id)} 
        />
        <div className="event-text">
          <strong>{event.title}</strong>
          {/* Hiển thị tag phân loại */}
          <span className={`badge ${event.category}`}>{event.category}</span>
          <span>{event.date}</span>
        </div>
      </div>
      
      <div className="actions">
        <button onClick={() => setEditingEvent(event)}>Sửa</button>
        <button className="btn-delete" onClick={() => deleteEvent(event.id)}>Xoá</button>
      </div>
    </div>
  );
}

export default EventItem;