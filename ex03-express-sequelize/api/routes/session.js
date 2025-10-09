import { Router } from "express";
import { getSessionUser } from '../controllers/sessionController';
import { checkAuth } from '../middleware/auth';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Protege a rota com o middleware 'checkAuth'
router.get("/", checkAuth, asyncHandler(getSessionUser));

export default router;