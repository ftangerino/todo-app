import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/**
 * Ponto de entrada principal do aplicativo.
 * Renderiza o componente App na raiz do documento HTML.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
