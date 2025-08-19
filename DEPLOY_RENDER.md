# Render Deployment Guide for Vigyapana

## Quick Fix for Port Binding Issue

The error you're seeing is because Render requires your server to bind to `0.0.0.0` instead of localhost. This has been fixed in `backend/server.js`.

## Quick Fix for Nodemon Issue

If you're seeing `sh: 1: nodemon: not found` error, this is because:
1. Nodemon is a development dependency and not available in production
2. The deployment is trying to run `npm run dev` instead of the production start command

**Solution:** The package.json has been updated with proper production scripts:
- `npm run start` - Production server start
- `npm run render-start` - Render-specific start command
- `npm run prod` - Alternative production start

## Deployment Steps

### Option 1: Manual Deployment

1. **Backend Service:**

   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set Build Command: `npm install`
   - Set Start Command: `npm run render-start`
   - Set Root Directory: `/` (leave empty)
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=https://your-frontend-url.onrender.com
     ADMIN_EMAIL=admin@vigyapana.com
     ADMIN_PASSWORD=your_secure_password
     ```

2. **Frontend Service:**
   - Create a Static Site on Render
   - Set Build Command: `npm install && npm run build`
   - Set Publish Directory: `dist`
   - Add Environment Variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

### Option 2: Using render.yaml (Recommended)

1. The `render.yaml` file has been updated in your project root
2. Push your code to GitHub
3. Connect your repository to Render
4. Render will automatically detect the `render.yaml` file and deploy both services

## Environment Variables Required

### Backend (.env)

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vigyapana
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-frontend-url.onrender.com
ADMIN_EMAIL=admin@vigyapana.com
ADMIN_PASSWORD=your-secure-admin-password
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Database Setup

1. **MongoDB Atlas (Recommended):**

   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get the connection string
   - Add it to MONGODB_URI environment variable

2. **Or use Render's PostgreSQL:**
   - If you prefer PostgreSQL, you'll need to update the models and database connection

## Post-Deployment

1. **Seed the Database:**

   - After successful deployment, run the seed script to populate initial data
   - You can do this through Render's shell or create an API endpoint to trigger seeding

2. **Admin Access:**
   - Use the ADMIN_EMAIL and ADMIN_PASSWORD to access the admin panel
   - URL: `https://your-frontend-url.onrender.com/admin/login`

## Common Issues & Solutions

1. **Port Binding Error:** ✅ Fixed - Server now binds to `0.0.0.0`
2. **Nodemon Not Found:** ✅ Fixed - Updated package.json with production scripts
3. **CORS Issues:** Configure CLIENT_URL correctly in backend environment
4. **Database Connection:** Ensure MongoDB URI is correct and IP whitelist includes Render IPs
5. **Build Failures:** Check that all dependencies are in package.json, not just devDependencies

## Testing Deployment

1. **Backend Health Check:** `https://your-backend-url.onrender.com/api/health`
2. **Frontend:** `https://your-frontend-url.onrender.com`
3. **Admin Panel:** `https://your-frontend-url.onrender.com/admin/login`

## Performance Optimization

- Render free tier services sleep after 15 minutes of inactivity
- Consider upgrading to paid plans for production use
- Enable caching and optimize database queries for better performance

## Troubleshooting

If you still see deployment issues:

1. **Check the logs** in Render dashboard
2. **Verify environment variables** are set correctly
3. **Ensure MongoDB connection** is working
4. **Test locally** with `npm run start` to ensure the server starts properly
