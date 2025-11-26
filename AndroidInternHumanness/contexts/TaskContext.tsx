import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: string;
  task_type: "text_reading" | "image_description" | "photo_capture";
  text?: string;
  image_url?: string;
  image_path?: string;
  audio_path?: string;
  duration_sec: number;
  timestamp: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  getTotalDuration: () => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const getTotalDuration = () => {
    return tasks.reduce((total, task) => total + task.duration_sec, 0);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, getTotalDuration }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
