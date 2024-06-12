import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks, Task } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Home.css';
import TaskModal from '../components/TaskModal';

/**
 * Componente principal da página inicial.
 * 
 * @returns {React.FC} - Componente funcional do React.
 */
const Home: React.FC = () => {
  const { tasks, fetchTasks, editTask, removeTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Função chamada ao final do arraste de uma tarefa.
   * 
   * @param {Object} result - Resultado do arraste.
   */
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTask = tasks.find(task => task.id === parseInt(draggableId));
      if (updatedTask) {
        updatedTask.status = destination.droppableId;
        await editTask(updatedTask.id, updatedTask);
      }
    }
  };

  /**
   * Filtra as tarefas pelo status.
   * 
   * @param {string} status - Status da tarefa.
   * @returns {Task[]} - Lista de tarefas filtradas.
   */
  const getColumnTasks = (status: string) => tasks.filter(task => task.status === status);

  /**
   * Abre o modal de edição da tarefa.
   * 
   * @param {Task} task - Tarefa a ser editada.
   */
  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  /**
   * Fecha o modal de edição da tarefa.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  /**
   * Atualiza a tarefa e recarrega a lista de tarefas.
   * 
   * @param {number} id - ID da tarefa.
   * @param {Object} values - Valores atualizados da tarefa.
   */
  const handleUpdateTask = async (id: number, values: { title: string; description: string; status: string }) => {
    await editTask(id, values);
    fetchTasks();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="home-container">
        <h1>Lista de Tarefas</h1>
        <Link to="/create">Criar Nova Tarefa</Link>
        <div className="columns">
          {['pendente', 'em progresso', 'concluída'].map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                  {getColumnTasks(status).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => openModal(task)}
                        >
                          <button
                            className="delete-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTask(task.id);
                            }}
                          >
                            &times;
                          </button>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>Status: {task.status}</p>
                          <p>Criado dia {new Date(task.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
        {selectedTask && (
          <TaskModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            task={selectedTask}
            onUpdate={handleUpdateTask}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default Home;
