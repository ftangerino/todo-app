import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import './Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('http://localhost:4000/auth/login', values);
              localStorage.setItem('token', response.data.token);
              navigate('/home'); // Redirecionar para Home após login bem-sucedido
            } catch (error) {
              setErrorMessage('Invalid credentials, please try again.');
              setTimeout(() => {
                setErrorMessage('');
              }, 3000); // Remover a mensagem após 3 segundos
            }
            setSubmitting(false);
          }}
        >
          <Form>
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <button type="submit">Login</button>
          </Form>
        </Formik>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
