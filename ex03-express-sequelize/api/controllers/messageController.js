import models from '../models';

// GET para listar todas as mensagens
export const getAllMessages = async (req, res) => {
    const messages = await models.Message.findAll();
    return res.status(200).json(messages);
};

// GET para buscar uma mensagem pelo ID
export const getMessageById = async (req, res) => {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
        return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    return res.status(200).json(message);
};

// POST para criar uma nova mensagem
export const createMessage = async (req, res) => {
    const newMessage = await models.Message.create({
        text: req.body.text,
        userId: req.context.me.id, // Associa a mensagem ao usuário logado
    });
    return res.status(201).json(newMessage);
};

// DELETE para remover uma mensagem
export const deleteMessage = async (req, res) => {
    const result = await models.Message.destroy({
        where: { 
            id: req.params.messageId, 
            userId: req.context.me.id // Regra de negócio: só permite deletar a própria mensagem
        },
    });

    // Se 'result' for 0, nenhuma linha foi deletada (não encontrou ou não tinha permissão)
    return res.sendStatus(result ? 204 : 404);
};