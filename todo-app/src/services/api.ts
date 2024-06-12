import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  return await api.get('/tasks');
};

export const createTask = async (task: { title: string; description: string; status: string }) => {
  return await api.post('/tasks', task);
};

export const updateTask = async (id: number, task: { title: string; description: string; status: string }) => {
  return await api.put(`/tasks/${id}`, task);
};

export const deleteTask = async (id: number) => {
  return await api.delete(`/tasks/${id}`);
};
