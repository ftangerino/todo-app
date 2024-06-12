import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import './Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await axios.post('http://localhost:4000/auth/register', {
                username: values.username,
                password: values.password,
              });
              navigate('/login');
            } catch (error: any) {
              if (error.response && error.response.status === 409) {
                setErrors({ username: 'Username already exists.' });
              } else {
                setErrorMessage('Registration failed. Please try again.');
              }
              setTimeout(() => {
                setErrorMessage('');
              }, 3000); // Remover a mensagem após 3 segundos
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error-message" />
              
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error-message" />
              
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              
              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
        <p>Já possui uma conta? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
