import jwt from 'jsonwebtoken';
import models from '../models';

export const login = async (req, res) => {
    const { login, password } = req.body;

    // Validação básica de entrada
    if (!login || !password) {
        return res.status(400).json({ message: "Login e senha são obrigatórios." });
    }

    // Busca o usuário pelo username ou email
    const user = await models.User.findByLogin(login);

    if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // Valida a senha usando o método do modelo
    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // Se tudo estiver correto, gera o token
    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.MY_SECRET, // Usa a chave secreta do .env
        { expiresIn: '1h' } // Define um tempo de expiração para o token
    );

    return res.status(200).json({ token });
};