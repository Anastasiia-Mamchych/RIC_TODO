export type Priority = 'high' | 'medium' | 'low';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
};
