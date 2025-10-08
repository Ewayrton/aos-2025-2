import { Router } from "express";

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// GET todos os usuários
router.get("/", asyncHandler(async (req, res) => {
    const users = await req.context.models.User.findAll();
    return res.status(200).json(users);
}));

// GET usuário por ID
router.get("/:userId", asyncHandler(async (req, res) => {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
}));

// POST criar novo usuário (Sign Up)
router.post("/", asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = await req.context.models.User.create({
        username,
        email,
        password,
    });
    
    // Omitimos a senha da resposta por segurança
    const { password: _, ...userWithoutPassword } = newUser.get();

    return res.status(201).json(userWithoutPassword);
}));

// ... (as rotas PUT e DELETE podem permanecer as mesmas por enquanto)

// Middleware de tratamento de erros no final do arquivo
router.use((error, req, res, next) => {
    console.error(error);
    // Trata erros de validação do Sequelize
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
});

export default router;