import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing'; // Importar o componente Landing
import { TaskProvider } from './context/TaskContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Adicionar a rota da página de seleção */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
          <Route path="/update/:id" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
