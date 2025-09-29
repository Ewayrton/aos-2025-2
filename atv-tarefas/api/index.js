import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefasRoutes.js';
import { sequelize } from './models/index.js';

// Sincroniza o modelo com o banco de dados
try {
  const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';
  await sequelize.sync({ force: eraseDatabaseOnSync });
  console.log('Banco de dados sincronizado com sucesso.');
} catch (error) {
  console.error('Erro ao sincronizar o banco de dados:', error);
  // Lançar o erro impede que a função com falha seja implantada
  throw error;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tarefas', tarefasRoutes);

// Exporta o 'app' para ser usado pela Vercel
export default app;