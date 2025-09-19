import { v4 as uuidv4 } from 'uuid';

const tarefas = [];

    //POST
    export const criarTarefa = (req, res) => {
        const { descricao, concluida } = req.body;

        if (!descricao){
            return res.status(400).json({ error: 'A descrição da tarefa é obrigatória.' });
        }

        const novaTarefa = {
            objectId: uuidv4(),
            descricao,
            concluida: concluida || false,
        };

        tarefas.push(novaTarefa);
        return res.status(201).json(novaTarefa);
    };

    //GetAll
    export const listarTarefas = (req, res) => {
        return res.status(200).json(tarefas);
    };

    //GetById
    export const listarTarefasPorId = (req, res) => {
        const { objectId } = req.params;
        const tarefa = tarefas.find(tarefa => tarefa.objectId === objectId);

        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        return res.status(200).json(tarefa);
    }

    //PUT
    export const atualizarTarefa = (req, res) => {
        const { objectId } = req.params;
        const { descricao, concluida } = req.body;
        const index = tarefas.findIndex(tarefa => tarefa.objectId === objectId);

        if (index === -1) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }    

        if (descricao !== undefined) {
            tarefas[index].descricao = descricao;
        }

        if (concluida !== undefined) {
            tarefas[index].concluida = concluida;
        }
        return res.status(200).json(tarefas[index]);
    };

    //DELETE
    export const deletarTarefa = (req, res) => {
        const { objectId } = req.params;
        const index = tarefas.findIndex(tarefa => tarefa.objectId === objectId);

        if (index === -1) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        } 

        tarefas.splice(index, 1);
        return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    };