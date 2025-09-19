import { Router } from "express";
import { criarTarefa,
        listarTarefas,
        listarTarefasPorId,
        atualizarTarefa,
        deletarTarefa 
        } from "../controllers/tarefasController.js";

    
    const router = Router();

    //POST
    router.post('/', criarTarefa);

    //GET
    router.get('/', listarTarefas);

    //GET BY ID
    router.get('/:objectId', listarTarefasPorId);

    //PUT
    router.put('/:objectId', atualizarTarefa);

    //DELETE
    router.delete('/:objectId', deletarTarefa);

    export default router;