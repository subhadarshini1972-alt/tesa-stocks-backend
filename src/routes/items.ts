import express from 'express';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/items';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getItems);
router.get('/:id', getItem);

// Protected routes
router.post('/', authMiddleware, createItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

export default router;
