import models from '../models';

// GET para listar todos os usuários
export const getAllUsers = async (req, res) => {
    const users = await models.User.findAll();
    return res.status(200).json(users);
};

// GET para buscar um usuário pelo ID
export const getUserById = async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
};

// POST para criar um novo usuário (Sign Up)
export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = await models.User.create({
        username,
        email,
        password,
    });
    
    const { password: _, ...userWithoutPassword } = newUser.get();

    return res.status(201).json(userWithoutPassword);
};

// PUT
export const putUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const user = await models.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    const { password: _, ...userWithoutPassword } = user.get();
    return res.status(200).json(userWithoutPassword);
};

// DELETE
export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    const user = await models.User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    return res.status(204).send();
};