import type { Event } from "../types/event";
import { getDaysUntil, getDeadlineStatus } from "../utils/eventUtils";

type Props = {
  event: Event;
  deleteEvent: (id: number) => void;
  toggleComplete: (id: number) => void;
  setEditingEvent: (event: Event) => void;
};

const CATEGORY_BADGE: Record<string, string> = {
  "Học tập": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Làm việc": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "Cá nhân": "bg-pink-500/15 text-pink-300 border-pink-500/30",
  "Khác": "bg-slate-500/15 text-slate-400 border-slate-600",
};

const PRIORITY_DOT: Record<string, string> = {
  "Cao": "bg-rose-500",
  "Trung bình": "bg-amber-400",
  "Thấp": "bg-slate-500",
};

const DEADLINE_BADGE: Record<string, { label: string; cls: string }> = {
  overdue: { label: "Quá hạn!", cls: "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse" },
  today: { label: "Hôm nay", cls: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  soon: { label: "", cls: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  normal: { label: "", cls: "" },
  completed: { label: "", cls: "" },
};

export default function EventItem({ event, deleteEvent, toggleComplete, setEditingEvent }: Props) {
  const status = getDeadlineStatus(event.date, event.completed) as "overdue" | "today" | "soon" | "normal" | "completed";
  const daysUntil = getDaysUntil(event.date);
  const deadlineBadge = DEADLINE_BADGE[status];

  const cardBorder = {
    overdue: "border-rose-500/40 bg-rose-500/5",
    today: "border-amber-500/40 bg-amber-500/5",
    soon: "border-orange-500/30 bg-orange-500/5",
    normal: "border-slate-700/50 bg-slate-800/40",
    completed: "border-slate-800 bg-slate-800/20",
  }[status];

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("vi-VN", { day: "numeric", month: "short", year: "numeric" });
  };

  const deadlineLabel = () => {
    if (status === "overdue") return `${Math.abs(daysUntil)} ngày trước`;
    if (status === "today") return "Hôm nay";
    if (status === "soon") return `${daysUntil} ngày nữa`;
    return formatDate(event.date);
  };

  return (
    <div className={`group relative border rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${cardBorder} ${event.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(event.id)}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
            event.completed
              ? "bg-emerald-500 border-emerald-500"
              : "border-slate-600 hover:border-emerald-500"
          }`}
        >
          {event.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Priority dot */}
              <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1 ${PRIORITY_DOT[event.priority ?? "Thấp"]}`} />
              <span className={`font-semibold text-sm truncate ${event.completed ? "line-through text-slate-500" : "text-white"}`}>
                {event.title}
              </span>
            </div>

            {/* Action buttons (visible on hover) */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={() => setEditingEvent(event)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                title="Chỉnh sửa"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                title="Xoá"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-xs text-slate-500 mt-1 truncate">{event.description}</p>
          )}

          {/* Tags row */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {/* Category badge */}
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${CATEGORY_BADGE[event.category]}`}>
              {event.category}
            </span>

            {/* Deadline badge */}
            {deadlineBadge.label && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${deadlineBadge.cls}`}>
                {deadlineBadge.label}
              </span>
            )}

            {/* Date */}
            <span className={`text-xs flex items-center gap-1 ${
              status === "overdue" ? "text-rose-400" :
              status === "today" ? "text-amber-400" :
              status === "soon" ? "text-orange-400" : "text-slate-500"
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {deadlineLabel()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}