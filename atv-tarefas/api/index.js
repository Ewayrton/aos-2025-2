import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import tarefasRoutes from './routes/tarefasRoutes.js';
import models, { sequelize } from './models';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/tarefas', tarefasRoutes);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
  });
});

export default app;
//app.listen(port, () => {
//  console.log(`Server running at http://localhost:${port}`);
//});