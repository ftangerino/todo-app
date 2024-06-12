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

/**
 * Provedor de contexto para gerenciar o estado das tarefas.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 */
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
   * Busca todas as tarefas e atualiza o estado.
   */
  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  /**
   * Adiciona uma nova tarefa e atualiza o estado.
   * 
   * @param {Object} task - Nova tarefa a ser adicionada.
   */
  const addTask = async (task: { title: string; description: string; status: string }) => {
    const response = await createTask(task);
    setTasks([...tasks, response.data]);
  };

  /**
   * Edita uma tarefa existente e atualiza o estado.
   * 
   * @param {number} id - ID da tarefa a ser editada.
   * @param {Object} updatedTask - Dados atualizados da tarefa.
   */
  const editTask = async (id: number, updatedTask: { title: string; description: string; status: string }) => {
    const response = await updateTask(id, updatedTask);
    setTasks(tasks.map(task => (task.id === id ? response.data : task)));
  };

  /**
   * Remove uma tarefa e atualiza o estado.
   * 
   * @param {number} id - ID da tarefa a ser removida.
   */
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

/**
 * Hook personalizado para acessar o contexto das tarefas.
 * 
 * @throws {Error} Se usado fora de um TaskProvider.
 * @returns {TaskContextProps} - O contexto das tarefas.
 */
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
