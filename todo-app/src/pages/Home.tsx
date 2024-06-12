import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks, Task } from '../context/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Home.css';
import TaskModal from '../components/TaskModal';

const Home: React.FC = () => {
  const { tasks, fetchTasks, editTask, removeTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

  const getColumnTasks = (status: string) => tasks.filter(task => task.status === status);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async (id: number, values: { title: string; description: string; status: string }) => {
    await editTask(id, values);
    fetchTasks();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="home-container">
        <h1>Tasks</h1>
        <Link to="/create">Create New Task</Link>
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
