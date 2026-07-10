import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = [];
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { item_id, item_name, type, qty, note } = req.body;

    const transaction = {
      id: uuidv4(),
      item_id,
      item_name,
      type,
      qty,
      note,
      created_at: new Date()
    };

    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
