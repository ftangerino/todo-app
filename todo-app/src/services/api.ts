import axios from 'axios';

// Cria uma instância do axios com a URL base da API
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Interceptor para adicionar o token de autenticação em cada requisição, se disponível
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

/**
 * Faz uma requisição GET para buscar todas as tarefas.
 * 
 * @returns {Promise} - Promessa com a resposta da requisição.
 */
export const getTasks = async () => {
  return await api.get('/tasks');
};

/**
 * Faz uma requisição POST para criar uma nova tarefa.
 * 
 * @param {Object} task - Objeto contendo os dados da nova tarefa.
 * @returns {Promise} - Promessa com a resposta da requisição.
 */
export const createTask = async (task: { title: string; description: string; status: string }) => {
  return await api.post('/tasks', task);
};

/**
 * Faz uma requisição PUT para atualizar uma tarefa existente.
 * 
 * @param {number} id - ID da tarefa a ser atualizada.
 * @param {Object} task - Objeto contendo os dados atualizados da tarefa.
 * @returns {Promise} - Promessa com a resposta da requisição.
 */
export const updateTask = async (id: number, task: { title: string; description: string; status: string }) => {
  return await api.put(`/tasks/${id}`, task);
};

/**
 * Faz uma requisição DELETE para excluir uma tarefa.
 * 
 * @param {number} id - ID da tarefa a ser excluída.
 * @returns {Promise} - Promessa com a resposta da requisição.
 */
export const deleteTask = async (id: number) => {
  return await api.delete(`/tasks/${id}`);
};
