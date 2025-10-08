import { Router } from "express";
import jwt from 'jsonwebtoken';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/", asyncHandler(async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ message: "Login e senha são obrigatórios." });
    }

    const user = await req.context.models.User.findByLogin(login);

    if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // Gerar o token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.SECRET,
        { expiresIn: '1h' } // Token expira em 1 hora
    );

    return res.status(200).json({ token });
}));

// Middleware de tratamento de erros
router.use((error, req, res, next) => {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
});

export default router;