import { Router } from "express";

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error("Database Error:", error); 
        res.status(500).json({ error: "Internal Server Error" }); 
    });
};

router.post('/', asyncHandler(async (req, res) => {
    const novaTarefa = await req.context.models.Tarefa.create(req.body);
    return res.status(201).json(novaTarefa);
}));

router.get('/', asyncHandler(async (req, res) => {
    const tarefas = await req.context.models.Tarefa.findAll();
    return res.status(200).json(tarefas);
}));

router.get('/:objectId', asyncHandler(async (req, res) => {
    const { objectId } = req.params;
    const tarefa = await req.context.models.Tarefa.findByPk(objectId);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    return res.status(200).json(tarefa);
}));

router.put('/:objectId', asyncHandler(async (req, res) => {
    const { objectId } = req.params;
    
    const [updated] = await req.context.models.Tarefa.update(req.body, {
        where: { objectId: objectId }
    });

    if (updated === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }    

    const tarefaAtualizada = await req.context.models.Tarefa.findByPk(objectId);
    return res.status(200).json(tarefaAtualizada);
}));

router.delete('/:objectId', asyncHandler(async (req, res) => {
    const { objectId } = req.params;
    
    const deletada = await req.context.models.Tarefa.destroy({
        where: { objectId: objectId }
    });

    if (deletada === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
    } 
    return res.status(204).send();
}));

export default router;