import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Importar o arquivo de estilo

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to the Task Manager</h1>
      <div className="landing-buttons">
        <Link to="/login" className="landing-button">Entrar na Conta</Link>
        <Link to="/register" className="landing-button">Cadastrar</Link>
      </div>
    </div>
  );
};

export default Landing;
