# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Steps

1. **Push frontend to GitHub**
   ```bash
   cd -tesa-stocks-frontend
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/import
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Set Environment Variables**
   In Vercel dashboard, add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

---

## Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (free at render.com)
- Supabase account

### Steps

1. **Push backend to GitHub**
   ```bash
   cd tesa-stocks-backend
   git push origin main
   ```

2. **Create new service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Select your GitHub repository

3. **Configure Service**
   - **Name**: tesa-stocks-api
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   In Render dashboard, add:
   ```
   PORT=5000
   NODE_ENV=production
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key
   SUPABASE_JWT_SECRET=your-jwt-secret
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRE=7d
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deploy to complete
   - API is live!

---

## Supabase Setup

### Create Project

1. Go to https://supabase.com
2. Sign in or create account
3. Create new project
4. Wait for provisioning

### Get Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** (SUPABASE_URL)
   - **Service Role Key** (SUPABASE_KEY) - keep secret!
   - **Anon Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### Initialize Database

1. Go to SQL Editor
2. Click "New Query"
3. Copy content from `docs/DATABASE.md`
4. Execute

---

## Environment Variables Summary

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-api.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## Testing Deployed API

```bash
# Health check
curl https://your-backend-api.onrender.com/health

# Get items
curl https://your-backend-api.onrender.com/api/items

# Create item (requires auth)
curl -X POST https://your-backend-api.onrender.com/api/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "sku": "TEST-001", "unit_price": 99.99}'
```

---

## Troubleshooting

### Frontend won't build
- Check Node version (16+)
- Clear cache: `rm -rf .next`
- Reinstall: `npm install`

### Backend won't start
- Check environment variables are set
- Check Supabase credentials are correct
- View logs in Render dashboard

### API calls failing from frontend
- Check CORS_ORIGIN matches frontend URL
- Check JWT_SECRET matches in both backend and frontend
- Check API URL in frontend .env is correct

---

## Production Checklist

- [ ] Environment variables set in all services
- [ ] Database tables created in Supabase
- [ ] Sample data inserted
- [ ] CORS properly configured
- [ ] JWT secrets generated and secure
- [ ] API tested from frontend
- [ ] Error handling verified
- [ ] Security headers enabled (Helmet)
- [ ] HTTPS enforced
- [ ] Logging enabled
- [ ] Backups configured
- [ ] Monitoring setup

---

## Support

For issues, check:
- Vercel docs: https://vercel.com/docs
- Render docs: https://render.com/docs
- Supabase docs: https://supabase.com/docs
- Express docs: https://expressjs.com
