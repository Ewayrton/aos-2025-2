import { Router } from "express";
import { login } from '../controllers/loginController';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// A rota de login é pública
router.post("/", asyncHandler(login));

export default router;