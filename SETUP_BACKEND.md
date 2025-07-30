# 🚀 Vigyapana Backend Setup Guide

This guide will help you set up the complete Vigyapana backend system with all features working.

## 📋 Prerequisites

### Required Software

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud - recommended)
- **Git** - [Download](https://git-scm.com/)

### Optional Tools

- **MongoDB Compass** - GUI for MongoDB
- **Postman** - API testing
- **VS Code** - Code editor

## 🛠️ Step-by-Step Installation

### 1. Project Setup

```bash
# Navigate to the project directory
cd my-project

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Database Setup

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add your IP to whitelist
6. Create a database user

#### Option B: Local MongoDB

```bash
# Install MongoDB Community Server
# Start MongoDB service
mongod

# MongoDB will run on mongodb://localhost:27017
```

### 3. Environment Configuration

```bash
# Copy environment template
cp config.env.example .env

# Edit .env file with your settings
```

**Required Environment Variables:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/vigyapana
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/vigyapana

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (choose one)
# Gmail SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# OR SendGrid
# SENDGRID_API_KEY=your-sendgrid-api-key

# Admin Configuration
ADMIN_EMAIL=admin@vigyapana.com
ADMIN_PASSWORD=admin123

# Client Configuration
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5173/admin

# File Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=uploads/

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Email Configuration

#### Gmail Setup (Recommended for Development)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASS`

#### SendGrid Setup (Recommended for Production)

1. Create account at [SendGrid](https://sendgrid.com/)
2. Get API key from dashboard
3. Add `SENDGRID_API_KEY` to .env

### 5. Database Seeding

```bash
# Seed the database with sample data
npm run seed
```

This will create:

- Admin user (admin@vigyapana.com / admin123)
- Sample services
- Case studies
- Testimonials
- Sample contacts

### 6. Start the Application

```bash
# Start backend server
npm run dev

# In another terminal, start frontend
cd ..
npm run dev
```

**Access Points:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 🧪 Testing the Installation

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 45.123,
  "environment": "development"
}
```

### 2. Login Test

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vigyapana.com",
    "password": "admin123"
  }'
```

### 3. Services Test

```bash
curl http://localhost:5000/api/services
```

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas: Check network access and database user

#### 2. JWT Secret Error

```
Error: JWT secret not defined
```

**Solution:**

- Set `JWT_SECRET` in .env file

#### 3. Email Sending Failed

```
Error: Invalid login credentials
```

**Solutions:**

- Use App Password for Gmail (not regular password)
- Check SMTP settings
- Ensure 2FA is enabled for Gmail

#### 4. File Upload Issues

```
Error: ENOENT: no such file or directory
```

**Solution:**

- Uploads folder is created automatically
- Check file permissions

#### 5. Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### Database Issues

#### Reset Database

```bash
# Connect to MongoDB
mongo vigyapana

# Drop database
db.dropDatabase()

# Re-run seeder
npm run seed
```

#### View Collections

```bash
mongo vigyapana
show collections
db.users.find()
```

## 📁 Project Structure

```
backend/
├── middleware/          # Custom middleware
│   ├── auth.js         # Authentication middleware
│   ├── errorHandler.js # Error handling
│   └── notFound.js     # 404 handler
├── models/             # Database models
│   ├── User.js         # User model
│   ├── Service.js      # Service model
│   ├── Contact.js      # Contact model
│   ├── CaseStudy.js    # Case study model
│   └── Testimonial.js  # Testimonial model
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── services.js     # Services routes
│   ├── contact.js      # Contact routes
│   ├── caseStudies.js  # Case studies routes
│   ├── testimonials.js # Testimonials routes
│   ├── dashboard.js    # Dashboard routes
│   └── upload.js       # File upload routes
├── scripts/            # Utility scripts
│   └── seed.js         # Database seeder
├── uploads/            # File uploads (auto-created)
│   ├── avatars/
│   ├── logos/
│   ├── case-studies/
│   └── testimonials/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables
└── README.md          # Documentation
```

## 🚀 Development Workflow

### 1. Code Changes

- Backend auto-restarts with nodemon
- Check logs in terminal
- Test API endpoints

### 2. Database Changes

- Update models in `models/` folder
- Run migrations if needed
- Update seeder if required

### 3. New Features

- Add routes in `routes/` folder
- Add middleware if needed
- Update documentation

## 🔐 Security Checklist

### Development

- [x] Environment variables secure
- [x] JWT secret set
- [x] CORS configured
- [x] Rate limiting enabled
- [x] Input validation active

### Production

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Configure HTTPS
- [ ] Use production database
- [ ] Set up email service
- [ ] Configure monitoring
- [ ] Set up backups

## 📈 Performance Optimization

### Database

```javascript
// Add indexes for better performance
db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ createdAt: -1 });
db.services.createIndex({ category: 1, isActive: 1 });
```

### Caching

- Consider Redis for session storage
- Implement API response caching
- Use CDN for file uploads

## 📦 Production Deployment

### Environment Setup

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...atlas.mongodb.net/vigyapana
JWT_SECRET=very-secure-production-secret
EMAIL_HOST=smtp.sendgrid.net
SENDGRID_API_KEY=your-sendgrid-key
```

### Deployment Platforms

#### Render

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

#### Railway

```bash
npm install -g @railway/cli
railway login
railway deploy
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring

### Logs

```bash
# View logs
npm run dev

# Production logging
npm start 2>&1 | tee app.log
```

### Health Monitoring

- Set up uptime monitoring
- Monitor database connections
- Track API response times

## 🤝 Getting Help

### Documentation

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)

### Support

- Email: dev@vigyapana.com
- Create GitHub issue
- Check troubleshooting section

---

## ✅ Quick Start Checklist

- [ ] Node.js installed
- [ ] MongoDB setup (local or Atlas)
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Database seeded (`npm run seed`)
- [ ] Backend started (`npm run dev`)
- [ ] Frontend started (`npm run dev`)
- [ ] Health check passed
- [ ] Login test successful

**Congratulations! Your Vigyapana backend is now running! 🎉**

---

_For issues or questions, refer to the troubleshooting section or contact support._
