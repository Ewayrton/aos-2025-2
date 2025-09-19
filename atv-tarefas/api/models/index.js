import Sequelize from "sequelize";
import getTarefaModel from "./Tarefa";

// !!! Simular a conexão com um banco de dados em memória !!! \\
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: ":memory:",
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