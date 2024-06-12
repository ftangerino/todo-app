import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface TaskContextProps {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: { title: string; description: string; status: string }) => void;
  editTask: (id: number, task: { title: string; description: string; status: string }) => void;
  removeTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const addTask = async (task: { title: string; description: string; status: string }) => {
    const response = await createTask(task);
    setTasks([...tasks, response.data]);
  };

  const editTask = async (id: number, updatedTask: { title: string; description: string; status: string }) => {
    const response = await updateTask(id, updatedTask);
    setTasks(tasks.map(task => (task.id === id ? response.data : task)));
  };

  const removeTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
