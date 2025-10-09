export const getSessionUser = async (req, res) => {
  // O middleware de autenticação (checkAuth) já fez a validação do token
  // e colocou os dados do usuário em req.context.me.

  if (!req.context.me) {
    // Essa verificação é uma segurança extra, mas o middleware já deve ter barrado a requisição
    return res.status(404).send('Sessão de usuário não encontrada.');
  }
  
  // Remove a senha do objeto antes de enviar como resposta
  const { password, ...userWithoutPassword } = req.context.me.get();

  return res.send(userWithoutPassword);
};