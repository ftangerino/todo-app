import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Task } from '../context/TaskContext';
import './TaskModal.css'; // Importar o arquivo de estilo

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: Task;
  onUpdate: (id: number, values: { title: string; description: string; status: string }) => void;
}

/**
 * Componente de modal para atualizar uma tarefa.
 * 
 * @param {TaskModalProps} props - Propriedades do componente.
 */
const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, task, onUpdate }) => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Update Task">
      <div className="modal-header">
        <h2>Update Task</h2>
        <button className="close-button" onClick={onRequestClose}></button>
      </div>
      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          status: task.status,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          status: Yup.string().oneOf(['pendente', 'em progresso', 'concluída']).required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onUpdate(task.id, values);
          setSubmitting(false);
          onRequestClose();
        }}
      >
        <Form className="form">
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
          </div>
          <div className="input-container">
            <label htmlFor="status">Status</label>
            <Field as="select" name="status">
              <option value="pendente">Pendente</option>
              <option value="em progresso">Em Progresso</option>
              <option value="concluída">Concluída</option>
            </Field>
          </div>
          <button className="submit" type="submit">Update</button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default TaskModal;
