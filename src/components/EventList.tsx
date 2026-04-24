import type { Event, GroupBy, SortBy } from "../types/event";
import EventItem from "./EventItem";
import { groupEvents, sortEvents, formatGroupLabel } from "../utils/eventUtils";

type Props = {
  events: Event[];
  groupBy: GroupBy;
  sortBy: SortBy;
  deleteEvent: (id: number) => void;
  toggleComplete: (id: number) => void;
  setEditingEvent: (event: Event) => void; 
};

export default function EventList({ events, groupBy, sortBy, deleteEvent, toggleComplete, setEditingEvent }: Props) {
  if (events.length === 0) {
    return <p className="text-center text-slate-500 py-10">Chưa có sự kiện nào</p>;
  }

  // Xử lý sắp xếp và nhóm dữ liệu
  const sorted = sortEvents(events, sortBy);
  const grouped = groupEvents(sorted, groupBy);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([key, groupEvents]) => (
        <div key={key}>
          <h3 className="text-sm font-semibold text-slate-400 mb-3 ml-1 uppercase tracking-wider">
            {formatGroupLabel(key, groupBy)}
          </h3>
          <div className="space-y-3">
            {groupEvents.map(event => (
              <EventItem
                key={event.id}
                event={event}
                deleteEvent={deleteEvent}
                toggleComplete={toggleComplete}
                setEditingEvent={setEditingEvent} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}