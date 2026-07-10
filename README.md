# TESA STOCKS Backend API

Express.js REST API with Supabase integration for the TESA STOCKS inventory management system.

## Features

- ✅ RESTful API endpoints
- ✅ JWT Authentication
- ✅ Supabase database integration
- ✅ CORS support
- ✅ Error handling
- ✅ Request validation
- ✅ Security middleware (Helmet, CORS)
- ✅ Logging (Morgan)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase PostgreSQL
- **Authentication**: JWT
- **Language**: TypeScript

## Getting Started

### Installation

```bash
git clone https://github.com/subhadarshini1972-alt/tesa-stocks-backend.git
cd tesa-stocks-backend
npm install
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```
PORT=5000
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires auth)

### Items

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (requires auth)
- `PUT /api/items/:id` - Update item (requires auth)
- `DELETE /api/items/:id` - Delete item (requires auth)

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction (requires auth)

### Invoices

- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice (requires auth)
- `GET /api/invoices/:id` - Get single invoice

## Database Schema

### items table

```sql
CREATE TABLE items (
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
```

### transactions table

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id),
  item_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  qty INTEGER NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### invoices table

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no INTEGER UNIQUE NOT NULL,
  items JSONB,
  total_amount DECIMAL(10,2),
  payment_mode VARCHAR(50),
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment to Render

1. Push to GitHub
2. Connect to Render at https://render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

### Deploy Command

```bash
npm install && npm run build && npm start
```

## Health Check

```bash
curl http://localhost:5000/health
```

## License

MIT
