import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTasks } from '../context/TaskContext';

const UpdateTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, editTask } = useTasks();
  const [task, setTask] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    const taskToUpdate = tasks.find(task => task.id === Number(id));
    if (taskToUpdate) {
      setTask(taskToUpdate);
    }
  }, [id, tasks]);

  return (
    <div>
      <h1>Update Task</h1>
      <Formik
        enableReinitialize
        initialValues={task}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          status: Yup.string().oneOf(['pendente', 'em progresso', 'concluída']).required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await editTask(Number(id), values);
          setSubmitting(false);
          navigate('/');
        }}
      >
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
          <label htmlFor="description">Description</label>
          <Field name="description" type="text" />
          <label htmlFor="status">Status</label>
          <Field as="select" name="status">
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluída">Concluída</option>
          </Field>
          <button type="submit">Update</button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateTask;
