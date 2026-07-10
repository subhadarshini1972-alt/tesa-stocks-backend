# Database Initialization Script

## Run these SQL commands in your Supabase dashboard

### Create Tables

```sql
-- Items table
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  barcode VARCHAR(100),
  category VARCHAR(100),
  location VARCHAR(255),
  qty INTEGER DEFAULT 0,
  reorder_threshold INTEGER DEFAULT 5,
  unit_price DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('in', 'out', 'new')),
  qty INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no INTEGER UNIQUE NOT NULL,
  items JSONB,
  total_amount DECIMAL(10,2),
  payment_mode VARCHAR(50),
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_items_sku ON items(sku);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_transactions_item_id ON transactions(item_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);
```

### Insert Sample Data

```sql
INSERT INTO items (name, sku, barcode, category, location, qty, reorder_threshold, unit_price)
VALUES
  ('Wireless Mouse', 'ITM-001', '012345678905', 'Electronics', 'Aisle 3, Bin B', 42, 10, 1499),
  ('USB-C Cable', 'ITM-002', '012345678912', 'Electronics', 'Aisle 3, Bin C', 8, 15, 399),
  ('Shipping Box', 'ITM-003', '012345678929', 'Packaging', 'Aisle 1, Bin A', 0, 25, 25),
  ('Bubble Wrap', 'ITM-004', '012345678936', 'Packaging', 'Aisle 1, Bin D', 60, 10, 299),
  ('Printer Paper', 'ITM-005', '012345678943', 'Office', 'Aisle 5, Bin A', 5, 8, 280),
  ('Stapler', 'ITM-006', '012345678950', 'Office', 'Aisle 5, Bin B', 19, 5, 120);
```

### Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on tables
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, restrict in production)
CREATE POLICY "items_policy" ON items FOR ALL USING (true);
CREATE POLICY "transactions_policy" ON transactions FOR ALL USING (true);
CREATE POLICY "invoices_policy" ON invoices FOR ALL USING (true);
```
