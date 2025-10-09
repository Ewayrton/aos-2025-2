import models from '../models';

// POST para criar uma nova tarefa
export const criarTarefa = async (req, res) => {
    const novaTarefa = await models.Tarefa.create(req.body);
    return res.status(201).json(novaTarefa);
};

// GET para listar todas as tarefas
export const listarTarefas = async (req, res) => {
    const tarefas = await models.Tarefa.findAll();
    return res.status(200).json(tarefas);
};

// GET para buscar uma tarefa pelo ID
export const listarTarefaPorId = async (req, res) => {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    return res.status(200).json(tarefa);
};

// PUT para atualizar uma tarefa
export const atualizarTarefa = async (req, res) => {
    const { tarefaId } = req.params;

    const [updated] = await models.Tarefa.update(req.body, {
        where: { objectId: tarefaId }
    });

    if (!updated) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    const tarefaAtualizada = await models.Tarefa.findByPk(tarefaId);
    return res.status(200).json(tarefaAtualizada);
};

// DELETE para remover uma tarefa
export const deletarTarefa = async (req, res) => {
    const { tarefaId } = req.params;

    const deletada = await models.Tarefa.destroy({
        where: { objectId: tarefaId }
    });

    if (!deletada) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    return res.status(204).send(); // 204 No Content é a resposta padrão para delete com sucesso
};