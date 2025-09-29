import app from './api/index.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor para desenvolvimento local rodando em http://localhost:${port}`);
});