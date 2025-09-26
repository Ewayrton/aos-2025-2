import Sequelize from "sequelize";
import pg from "pg";
import getTarefaModel from "./Tarefa.js";


// !!! Simular a conexão com um banco de dados em memória !!! \\
//const sequelize = new Sequelize("database", "username", "password", {
//  dialect: "sqlite",
//  storage: ":memory:",
//  logging: false, 
//});

if (!process.env.POSTGRES_URL) {
  throw new Error('A variável de ambiente POSTGRES_URL não está definida.');
}

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const models = {
  Tarefa: getTarefaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});



export { sequelize };

export default models;