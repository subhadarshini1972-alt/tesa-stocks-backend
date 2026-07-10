import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = [];
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { items, total_amount, payment_mode } = req.body;

    const invoice = {
      id: uuidv4(),
      invoice_no: Math.floor(Math.random() * 9000) + 1000,
      items,
      total_amount,
      payment_mode,
      status: 'completed',
      created_at: new Date()
    };

    res.status(201).json(invoice);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json({ id, message: 'Invoice fetched' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
