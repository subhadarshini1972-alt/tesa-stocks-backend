import express from 'express';
import { getInvoices, createInvoice, getInvoice } from '../controllers/invoices';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', getInvoices);
router.post('/', authMiddleware, createInvoice);
router.get('/:id', getInvoice);

export default router;
