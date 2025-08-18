import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';

// Import routes
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blogs.js';
import testimonialRoutes from './routes/testimonials.js';
import dashboardRoutes from './routes/dashboard.js';
import uploadRoutes from './routes/upload.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // In development, allow all origins (check both NODE_ENV and if no .env file exists)
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      return callback(null, true);
    }
    
    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:5173',
      process.env.ADMIN_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5173',
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply CORS middleware before rate limiter so that even error responses include CORS headers
app.use(cors(corsOptions));

// Handle preflight requests explicitly before rate limiting
app.options('*', cors(corsOptions));

// Rate limiting should come after CORS so headers are preserved
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Catch 404 and forward to error handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vigyapana');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Ensure a default admin user exists (idempotent)
const ensureAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@vigyapana.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        name: 'Admin User',
        email: adminEmail,
        username: 'admin',
        password: adminPassword,
        role: 'admin',
        isActive: true,
      });
      await admin.save();
      console.log('✅ Default admin user created:', adminEmail);
    } else if (admin.role !== 'admin') {
      admin.role = 'admin';
      admin.isActive = true;
      if (!admin.username) admin.username = 'admin';
      await admin.save();
      console.log('✅ Ensured existing admin user has admin role:', adminEmail);
    }
  } catch (error) {
    console.error('Failed ensuring default admin user:', error);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureAdminUser();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Client URL: ${process.env.CLIENT_URL}`);
      console.log(`⚡ API Health: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

startServer(); 