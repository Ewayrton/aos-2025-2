import jwt from 'jsonwebtoken';
import models from '../models';

export const checkAuth = async (req, res, next) => {
  // Pega o token do cabeçalho 'Authorization'
  const authHeader = req.headers.authorization;

  // 1. Verifica se o cabeçalho existe e está no formato correto ('Bearer token...')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // 2. Extrai apenas o token, ignorando a parte 'Bearer '
  const token = authHeader.substring(7);

  try {
    // 3. Verifica se o token é válido usando a chave secreta
    const decoded = jwt.verify(token, process.env.MY_SECRET);

    // 4. Se for válido, busca o usuário no banco e o anexa ao 'context' da requisição
    req.context.me = await models.User.findByPk(decoded.id);
    
    if (!req.context.me) {
        return res.status(401).json({ message: 'Usuário do token não encontrado.'});
    }

    // 5. Permite que a requisição continue para a rota final
    return next();
  } catch (err) {
    // Se o token for inválido ou expirado, retorna um erro
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};