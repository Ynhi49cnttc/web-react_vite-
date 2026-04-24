export type Category = "Học tập" | "Làm việc" | "Cá nhân" | "Khác";

export type Priority = "Cao" | "Trung bình" | "Thấp";

export type GroupBy = "day" | "week" | "month";

export type SortBy = "date-asc" | "date-desc" | "name-asc" | "name-desc" | "priority";

export type Event = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  description?: string;
};