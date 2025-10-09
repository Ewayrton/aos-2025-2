import { Router } from "express";
import { 
    getAllUsers, 
    getUserById, 
    signUp, 
    putUser, 
    deleteUser 
} from '../controllers/userController';

const router = Router();

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

//rotas
router.get("/", asyncHandler(getAllUsers)); 
router.get("/:userId", asyncHandler(getUserById));
router.post("/", asyncHandler(signUp));
router.put("/:userId", asyncHandler(putUser));
router.delete("/:userId", asyncHandler(deleteUser));

export default router;