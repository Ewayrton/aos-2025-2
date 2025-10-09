import { Router } from "express";
import { checkAuth } from '../middleware/auth';
import { 
    criarTarefa, 
    listarTarefas, 
    listarTarefaPorId,
    atualizarTarefa,
    deletarTarefa
} from '../controllers/tarefaController';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Todas as rotas de tarefas são protegidas
router.post("/", checkAuth, asyncHandler(criarTarefa));
router.get("/", checkAuth, asyncHandler(listarTarefas));
router.get("/:tarefaId", checkAuth, asyncHandler(listarTarefaPorId));
router.put("/:tarefaId", checkAuth, asyncHandler(atualizarTarefa));
router.delete("/:tarefaId", checkAuth, asyncHandler(deletarTarefa));

export default router;