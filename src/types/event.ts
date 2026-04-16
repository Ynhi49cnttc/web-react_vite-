export type Category = "Học tập" | "Làm việc" | "Cá nhân" | "Khác";
export type Event = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
  category: Category;
};