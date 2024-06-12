import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; // Importar o arquivo de estilo

/**
 * Componente para a página de aterrissagem.
 * 
 * @returns {React.FC} - Componente funcional do React.
 */
const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <h1>Bem vindo ao seu Task Manager</h1>
      <div className="landing-buttons">
        <Link to="/login" className="landing-button">Entrar na Conta</Link>
        <Link to="/register" className="landing-button">Cadastrar</Link>
      </div>
    </div>
  );
};

export default Landing;
