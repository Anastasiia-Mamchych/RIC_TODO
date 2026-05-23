import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { Priority, Task } from '@/constants/types';

const STORAGE_KEY = 'todo_tasks';

const PRIORITY_CYCLE: Priority[] = ['high', 'medium', 'low'];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (data) setTasks(JSON.parse(data));
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const addTask = (task: Task) => setTasks((prev) => [task, ...prev]);

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const cyclePriority = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const currentIndex = PRIORITY_CYCLE.indexOf(t.priority);
        const nextPriority = PRIORITY_CYCLE[(currentIndex + 1) % PRIORITY_CYCLE.length];
        return { ...t, priority: nextPriority };
      })
    );

  return { tasks, loaded, addTask, deleteTask, toggleTask, cyclePriority };
}
