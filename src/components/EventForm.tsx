import { useState, useEffect } from "react";
import type { Event, Category, Priority } from "../types/event";

type Props = {
  onSave: (event: Event) => void;
  editingEvent: Event | null;
  cancelEdit: () => void;
};

const CATEGORIES: Category[] = ["Học tập", "Làm việc", "Cá nhân", "Khác"];
const PRIORITIES: Priority[] = ["Cao", "Trung bình", "Thấp"];

const PRIORITY_STYLES: Record<Priority, string> = {
  "Cao": "bg-rose-500/20 text-rose-300 border-rose-500/40",
  "Trung bình": "bg-amber-500/20 text-amber-300 border-amber-500/40",
  "Thấp": "bg-slate-500/20 text-slate-300 border-slate-600",
};

const CATEGORY_STYLES: Record<Category, string> = {
  "Học tập": "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "Làm việc": "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Cá nhân": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  "Khác": "bg-slate-500/20 text-slate-300 border-slate-600",
};

const inputCls = "w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:bg-slate-800 transition-all";

export default function EventForm({ onSave, editingEvent, cancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("Khác");
  const [priority, setPriority] = useState<Priority>("Trung bình");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setCategory(editingEvent.category);
      setPriority(editingEvent.priority ?? "Trung bình");
      setDescription(editingEvent.description ?? "");
    } else {
      setTitle(""); setDate(""); setCategory("Khác");
      setPriority("Trung bình"); setDescription("");
    }
  }, [editingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSave({
      id: editingEvent ? editingEvent.id : Date.now(),
      title: title.trim(),
      date,
      category,
      priority,
      description: description.trim() || undefined,
      completed: editingEvent ? editingEvent.completed : false,
    });
  };

  return (
    <div className="bg-slate-900/95 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between p-5 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white">
          {editingEvent ? "✏️ Chỉnh sửa sự kiện" : "✨ Thêm sự kiện mới"}
        </h2>
        <button onClick={cancelEdit} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Tên sự kiện *</label>
          <input
            type="text"
            placeholder="Nhập tên sự kiện..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Ngày *</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={inputCls + " [color-scheme:dark]"}
            required
          />
        </div>

        {/* Category + Priority */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Danh mục</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    category === cat ? CATEGORY_STYLES[cat] : "bg-transparent text-slate-600 border-slate-700 hover:border-slate-600 hover:text-slate-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Ưu tiên</label>
            <div className="flex flex-col gap-1.5">
              {PRIORITIES.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all text-left ${
                    priority === p ? PRIORITY_STYLES[p] : "bg-transparent text-slate-600 border-slate-700 hover:border-slate-600 hover:text-slate-400"
                  }`}
                >
                  {{ "Cao": "🔴 Cao", "Trung bình": "🟡 Trung bình", "Thấp": "🟢 Thấp" }[p]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Ghi chú (tuỳ chọn)</label>
          <textarea
            placeholder="Thêm ghi chú..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className={inputCls + " resize-none"}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {editingEvent ? "Cập nhật" : "Thêm sự kiện"}
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all border border-slate-700"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}