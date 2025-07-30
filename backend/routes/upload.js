import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
const logosDir = path.join(uploadsDir, 'logos');
const caseStudiesDir = path.join(uploadsDir, 'case-studies');
const testimonialsDir = path.join(uploadsDir, 'testimonials');

[uploadsDir, avatarsDir, logosDir, caseStudiesDir, testimonialsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = uploadsDir;
    
    // Determine upload path based on file type or route
    switch (req.body.type || req.params.type) {
      case 'avatar':
        uploadPath = avatarsDir;
        break;
      case 'logo':
        uploadPath = logosDir;
        break;
      case 'case-study':
        uploadPath = caseStudiesDir;
        break;
      case 'testimonial':
        uploadPath = testimonialsDir;
        break;
      default:
        uploadPath = uploadsDir;
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    
    cb(null, sanitizedBaseName + '-' + uniqueSuffix + extension);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, svg, webp)'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: fileFilter,
});

// @desc    Upload single image
// @route   POST /api/upload/image/:type
// @access  Private/Admin
router.post('/image/:type', protect, adminOnly, (req, res) => {
  const uploadSingle = upload.single('image');
  
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size is 5MB.',
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    // Generate file URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.params.type}/${req.file.filename}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
        type: req.params.type,
      },
    });
  });
});

// @desc    Upload multiple images
// @route   POST /api/upload/images/:type
// @access  Private/Admin
router.post('/images/:type', protect, adminOnly, (req, res) => {
  const uploadMultiple = upload.array('images', 10); // Max 10 files
  
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'One or more files are too large. Maximum size is 5MB per file.',
        });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          success: false,
          error: 'Too many files. Maximum is 10 files.',
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded',
      });
    }

    // Generate file URLs
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      url: `${baseUrl}/uploads/${req.params.type}/${file.filename}`,
      type: req.params.type,
    }));

    res.json({
      success: true,
      message: `${files.length} files uploaded successfully`,
      data: files,
    });
  });
});

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:type/:filename
// @access  Private/Admin
router.delete('/:type/:filename', protect, adminOnly, async (req, res) => {
  try {
    const { type, filename } = req.params;
    
    // Validate type
    const validTypes = ['avatars', 'logos', 'case-studies', 'testimonials'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type',
      });
    }

    // Construct file path
    const filePath = path.join(uploadsDir, type, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting file',
    });
  }
});

// @desc    Get uploaded files list
// @route   GET /api/upload/:type
// @access  Private/Admin
router.get('/:type', protect, adminOnly, async (req, res) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 20 } = req.query;
    
    // Validate type
    const validTypes = ['avatars', 'logos', 'case-studies', 'testimonials'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type',
      });
    }

    const typeDir = path.join(uploadsDir, type);
    
    if (!fs.existsSync(typeDir)) {
      return res.json({
        success: true,
        count: 0,
        total: 0,
        data: [],
      });
    }

    // Read directory
    const files = fs.readdirSync(typeDir);
    
    // Get file stats
    const fileList = files.map(filename => {
      const filePath = path.join(typeDir, filename);
      const stats = fs.statSync(filePath);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      return {
        filename,
        size: stats.size,
        url: `${baseUrl}/uploads/${type}/${filename}`,
        uploadedAt: stats.birthtime,
        type,
      };
    });

    // Sort by upload date (newest first)
    fileList.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedFiles = fileList.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedFiles.length,
      total: fileList.length,
      totalPages: Math.ceil(fileList.length / limit),
      currentPage: parseInt(page),
      data: paginatedFiles,
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching files',
    });
  }
});

// @desc    Get file info
// @route   GET /api/upload/:type/:filename/info
// @access  Private/Admin
router.get('/:type/:filename/info', protect, adminOnly, async (req, res) => {
  try {
    const { type, filename } = req.params;
    
    // Validate type
    const validTypes = ['avatars', 'logos', 'case-studies', 'testimonials'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type',
      });
    }

    const filePath = path.join(uploadsDir, type, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    const stats = fs.statSync(filePath);
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        url: `${baseUrl}/uploads/${type}/${filename}`,
        uploadedAt: stats.birthtime,
        modifiedAt: stats.mtime,
        type,
      },
    });
  } catch (error) {
    console.error('Get file info error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching file info',
    });
  }
});

export default router; 