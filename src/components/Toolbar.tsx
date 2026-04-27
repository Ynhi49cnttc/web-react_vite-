import type { GroupBy, SortBy, Category } from "../types/event";

const CATEGORIES: (Category | "Tất cả")[] = ["Tất cả", "Học tập", "Làm việc", "Cá nhân", "Khác"];

const CATEGORY_COLORS: Record<string, string> = {
  "Tất cả": "bg-slate-700 text-slate-200 border-slate-600",
  "Học tập": "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "Làm việc": "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Cá nhân": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  "Khác": "bg-slate-500/20 text-slate-300 border-slate-500/40",
};

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  groupBy: GroupBy;
  setGroupBy: (v: GroupBy) => void;
  sortBy: SortBy;
  setSortBy: (v: SortBy) => void;
  filterCategory: Category | "Tất cả";
  setFilterCategory: (v: Category | "Tất cả") => void;
  filterStatus: "all" | "active" | "completed";
  setFilterStatus: (v: "all" | "active" | "completed") => void;
};

export default function Toolbar({
  searchTerm, setSearchTerm,
  groupBy, setGroupBy,
  sortBy, setSortBy,
  filterCategory, setFilterCategory,
  filterStatus, setFilterStatus,
}: Props) {
  return (
    <div className="space-y-3 mb-6">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Tìm kiếm sự kiện..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-slate-800 transition-all backdrop-blur-sm"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Row 2: Category filter + Status + Sort + Group */}
      <div className="flex flex-col xl:flex-row gap-3 items-start xl:items-center justify-between">
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 w-full xl:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                filterCategory === cat
                  ? CATEGORY_COLORS[cat] + " scale-105 shadow-md"
                  : "bg-transparent text-slate-500 border-slate-700 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Controls group */}
        <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto items-stretch sm:items-center">
          {/* Status filter */}
          <div className="flex bg-slate-800/60 rounded-lg border border-slate-700/60 p-0.5 text-xs flex-1 sm:flex-none justify-center">
            {(["all", "active", "completed"] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  filterStatus === s
                    ? "bg-slate-600 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {{ all: "Tất cả", active: "Đang chạy", completed: "Xong" }[s]}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className="bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs rounded-lg px-3 py-2 sm:py-1.5 focus:outline-none focus:border-violet-500/60 transition-all cursor-pointer flex-1 sm:flex-none"
          >
            <option value="date-asc">📅 Ngày ↑</option>
            <option value="date-desc">📅 Ngày ↓</option>
            <option value="name-asc">🔤 Tên A→Z</option>
            <option value="name-desc">🔤 Tên Z→A</option>
            <option value="priority">🔥 Ưu tiên</option>
          </select>

          {/* Group by */}
          <div className="flex bg-slate-800/60 rounded-lg border border-slate-700/60 p-0.5 text-xs flex-1 sm:flex-none justify-center">
            {(["day", "week", "month"] as const).map(g => (
              <button
                key={g}
                onClick={() => setGroupBy(g)}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  groupBy === g
                    ? "bg-violet-600 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {{ day: "Ngày", week: "Tuần", month: "Tháng" }[g]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}