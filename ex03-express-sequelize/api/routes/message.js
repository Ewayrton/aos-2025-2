import { Router } from "express";
import { checkAuth } from '../middleware/auth';
import { 
    getAllMessages, 
    getMessageById, 
    createMessage, 
    deleteMessage 
} from '../controllers/messageController';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Rotas públicas (qualquer um pode ver as mensagens)
router.get("/", asyncHandler(getAllMessages));
router.get("/:messageId", asyncHandler(getMessageById));

// Rotas protegidas (apenas usuários logados podem criar ou deletar)
router.post("/", checkAuth, asyncHandler(createMessage));
router.delete("/:messageId", checkAuth, asyncHandler(deleteMessage));

export default router;