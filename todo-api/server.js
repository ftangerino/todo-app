require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // cors para usar aplicações em portas diferentes
app.use(express.json());
app.use('/api', taskRoutes);
app.use('/auth', authRoutes);
swaggerDocs(app);

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
