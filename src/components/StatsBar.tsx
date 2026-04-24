import type { Event } from "../types/event";

type Props = {
  events: Event[];
};

export default function StatsBar({ events }: Props) {
  const total = events.length;
  const completed = events.filter(e => e.completed).length;
  const active = total - completed;

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-slate-800/60 p-4 rounded-xl flex-1 border border-slate-700/60">
        <p className="text-slate-400 text-sm">Tổng sự kiện</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-emerald-500/10 p-4 rounded-xl flex-1 border border-emerald-500/20">
        <p className="text-emerald-400 text-sm">Đã hoàn thành</p>
        <p className="text-2xl font-bold text-emerald-500">{completed}</p>
      </div>
      <div className="bg-violet-500/10 p-4 rounded-xl flex-1 border border-violet-500/20">
        <p className="text-violet-400 text-sm">Đang chạy</p>
        <p className="text-2xl font-bold text-violet-500">{active}</p>
      </div>
    </div>
  );
}