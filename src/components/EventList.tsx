import type { Event } from "../types/event";
import EventItem from "./EventItem";

type Props = {
  events: Event[];
  deleteEvent: (id: number) => void;
  toggleComplete: (id: number) => void;
  setEditingEvent: (event: Event) => void; 
};

function EventList({ events, deleteEvent, toggleComplete, setEditingEvent }: Props) {
  return (
    <div className="event-list">
      {events.length === 0 && <p className="empty-text">Chưa có sự kiện nào</p>}

      {events.map(event => (
        <EventItem
          key={event.id}
          event={event}
          deleteEvent={deleteEvent}
          toggleComplete={toggleComplete}

          setEditingEvent={setEditingEvent} 
        />
      ))}
    </div>
  );
}

export default EventList;