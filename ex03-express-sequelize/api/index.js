import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();
app.set("trust proxy", true);

// Middlewares essenciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para injetar os models no contexto de cada requisição.
// Removemos a lógica de usuário fixo daqui.
app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Configuração das rotas
app.use("/", routes.root);
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);
app.use("/login", routes.login);

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages();
  }
  console.log("Banco de dados sincronizado com sucesso.");

  // Lógica para funcionar tanto localmente quanto na Vercel
  if (!process.env.VERCEL) {
    app.listen(port, () => {
      console.log(`Servidor local rodando na porta ${port}!`);
    });
  }
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      password: "password123",
      messages: [
        { text: "Published the Road to learn React" },
      ],
    },
    { include: [models.Message] }
  );
  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      password: "password456",
      messages: [
        { text: "Happy to release ..." },
      ],
    },
    { include: [models.Message] }
  );
};

// Exporta o app para ser usado pela Vercel
export default app;