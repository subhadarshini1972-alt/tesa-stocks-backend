import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const getItems = async (req: Request, res: Response) => {
  try {
    // Mock data for demo
    const items = [
      {
        id: '1',
        name: 'Wireless Mouse',
        sku: 'ITM-001',
        barcode: '012345678905',
        category: 'Electronics',
        location: 'Aisle 3, Bin B',
        qty: 42,
        reorder_threshold: 10,
        unit_price: 1499,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        name: 'USB-C Cable',
        sku: 'ITM-002',
        barcode: '012345678912',
        category: 'Electronics',
        location: 'Aisle 3, Bin C',
        qty: 8,
        reorder_threshold: 15,
        unit_price: 399,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json({ id, message: 'Item fetched' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, sku, barcode, category, location, qty, reorder_threshold, unit_price } = req.body;

    const item = {
      id: uuidv4(),
      name,
      sku,
      barcode,
      category,
      location,
      qty,
      reorder_threshold,
      unit_price,
      created_at: new Date(),
      updated_at: new Date()
    };

    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    res.json({ id, ...updates, updated_at: new Date() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.json({ message: `Item ${id} deleted` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
