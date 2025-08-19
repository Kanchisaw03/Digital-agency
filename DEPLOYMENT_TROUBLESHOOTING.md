# Deployment Troubleshooting Guide

## 🚨 Current Issue: "vite: not found"

### Problem:
The build is failing because Vite is not found during the build process.

### Solutions:

#### 1. **Force Redeploy (Recommended)**
- Go to Render Dashboard
- Select your service
- Click "Manual Deploy" → "Deploy latest commit"
- This ensures the latest render.yaml is used

#### 2. **Check Build Command**
Current build command should be: `npm run build:prod`

If it's still showing the old command:
- Go to Settings → Build & Deploy
- Update Build Command to: `npm run build:prod`
- Save and redeploy

#### 3. **Alternative Build Commands**
If the issue persists, try these alternatives:

**Option A:**
```bash
npm install && npm run build
```

**Option B:**
```bash
npm ci && npm run build
```

**Option C:**
```bash
npm install && cd backend && npm install && cd .. && npx vite build
```

#### 4. **Verify Package.json**
Ensure these scripts exist:
```json
{
  "scripts": {
    "build": "npx vite build",
    "build:prod": "npm install && cd backend && npm install && cd .. && npx vite build",
    "start": "node backend/server.js"
  }
}
```

#### 5. **Check Dependencies**
Ensure Vite is in devDependencies:
```json
{
  "devDependencies": {
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^4.5.2"
  }
}
```

## 🔧 Manual Fix Steps

1. **Update Render Settings:**
   - Build Command: `npm run build:prod`
   - Start Command: `npm run start`

2. **Force Redeploy:**
   - Manual Deploy → Deploy latest commit

3. **Monitor Logs:**
   - Check build logs for specific errors
   - Verify all dependencies are installed

## 📞 If Still Failing

1. Check if the latest code is pushed to GitHub
2. Verify render.yaml is in the root directory
3. Try clearing Render cache (delete and recreate service)
4. Check if there are any Node.js version conflicts
