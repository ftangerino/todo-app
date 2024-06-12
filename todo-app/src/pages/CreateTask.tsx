import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTasks } from '../context/TaskContext';
import './CreateTask.css';

/**
 * Componente para criação de uma nova tarefa.
 * Utiliza Formik para manipulação de formulários e Yup para validação.
 */
const CreateTask: React.FC = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="create-task-container">
      <div className="create-task-card">
        <h1>Criar Tarefa</h1>
        <Formik
          initialValues={{
            title: '',
            description: '',
            status: 'pendente',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            status: Yup.string().oneOf(['pendente', 'em progresso', 'concluída']).required('Status is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await addTask(values);
            setSubmitting(false);
            navigate('/home');
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="title">Nome da Tarefa</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" className="error-message" />

              <label htmlFor="description">Descrição</label>
              <Field name="description" type="text" />
              <ErrorMessage name="description" component="div" className="error-message" />

              <label htmlFor="status">Status</label>
              <Field as="select" name="status">
                <option value="pendente">Pendente</option>
                <option value="em progresso">Em Progresso</option>
                <option value="concluída">Concluída</option>
              </Field>
              <button type="submit">Criar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTask;
