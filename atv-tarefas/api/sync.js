//script para sincronizar o banco de dados e criar a tabela Tarefas

import dotenv from 'dotenv';
dotenv.config();

import models, { sequelize } from './models/index.js';

const syncDatabase = async () => {
  try {
    
    await sequelize.sync({ force: true });
    console.log('✅ Banco de dados sincronizado com sucesso! A tabela "Tarefas" foi criada.');
  } catch (error) {
    console.error('❌ Erro ao sincronizar o banco de dados:', error);
  } finally {
    
    await sequelize.close();
    console.log('Conexão com o banco de dados fechada.');
  }
};

syncDatabase();