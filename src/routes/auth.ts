import express from 'express';
import { login, register, logout } from '../controllers/auth';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', authMiddleware, logout);

export default router;
