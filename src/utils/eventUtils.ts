import type { Event, SortBy, GroupBy } from "../types/event";

export function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  return Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDeadlineStatus(dateStr: string, completed: boolean) {
  if (completed) return "completed";
  const days = getDaysUntil(dateStr);
  if (days < 0) return "overdue";
  if (days === 0) return "today";
  if (days <= 3) return "soon";
  return "normal";
}

export function sortEvents(events: Event[], sortBy: SortBy): Event[] {
  return [...events].sort((a, b) => {
    switch (sortBy) {
      case "date-asc": return a.date.localeCompare(b.date);
      case "date-desc": return b.date.localeCompare(a.date);
      case "name-asc": return a.title.localeCompare(b.title);
      case "name-desc": return b.title.localeCompare(a.title);
      case "priority": {
        const order = { "Cao": 0, "Trung bình": 1, "Thấp": 2 };
        return order[a.priority] - order[b.priority];
      }
      default: return 0;
    }
  });
}

export function groupEvents(events: Event[], groupBy: GroupBy): Record<string, Event[]> {
  const groups: Record<string, Event[]> = {};

  events.forEach(event => {
    const date = new Date(event.date);
    let key = "";

    if (groupBy === "day") {
      key = event.date; // YYYY-MM-DD
    } else if (groupBy === "week") {
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      key = `${monday.toLocaleDateString("vi-VN")} – ${sunday.toLocaleDateString("vi-VN")}`;
    } else if (groupBy === "month") {
      key = date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
    }

    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  });

  return groups;
}

export function formatGroupLabel(key: string, groupBy: GroupBy): string {
  if (groupBy === "day") {
    const date = new Date(key + "T00:00:00");
    const days = getDaysUntil(key);
    const base = date.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" });
    if (days === 0) return `Hôm nay — ${base}`;
    if (days === 1) return `Ngày mai — ${base}`;
    if (days === -1) return `Hôm qua — ${base}`;
    return base;
  }
  return key;
}