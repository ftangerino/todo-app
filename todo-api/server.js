require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Permite o uso de aplicações em portas diferentes
app.use(express.json());
app.use('/api', taskRoutes); // Rotas para tarefas
app.use('/auth', authRoutes); // Rotas para autenticação
swaggerDocs(app); // Documentação Swagger

// Sincroniza o modelo com o banco de dados e inicia o servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
