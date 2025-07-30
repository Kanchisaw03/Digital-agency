import express from 'express';
import { body, validationResult } from 'express-validator';
import Testimonial from '../models/Testimonial.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      service,
      featured,
      published = 'true',
      verified,
      limit,
      page = 1,
      sortBy = 'order',
      order = 'asc',
      minRating,
    } = req.query;

    const query = {};
    
    // Filter by published status (public only sees published)
    if (published === 'true') {
      query.isPublished = true;
    }
    
    // Filter by service
    if (service && service !== 'all') {
      query.service = service;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Filter by verification status
    if (verified === 'true') {
      query.verificationStatus = 'verified';
    }
    
    // Filter by minimum rating
    if (minRating) {
      query.rating = { $gte: parseInt(minRating) };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    let testimonialsQuery = Testimonial.find(query)
      .populate('project', 'title client')
      .sort(sortOptions);
    
    if (limit) {
      const skip = (page - 1) * limit;
      testimonialsQuery = testimonialsQuery.limit(parseInt(limit)).skip(skip);
    }

    const testimonials = await testimonialsQuery.exec();
    const total = await Testimonial.countDocuments(query);

    res.json({
      success: true,
      count: testimonials.length,
      total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
      currentPage: parseInt(page),
      data: testimonials,
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching testimonials',
    });
  }
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
      .populate('project', 'title client services');
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    // Only return published testimonials to public (unless admin)
    if (!testimonial.isPublished && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching testimonial',
    });
  }
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
router.post('/', [
  protect,
  adminOnly,
  body('client.name').trim().isLength({ min: 2, max: 50 }).withMessage('Client name must be between 2 and 50 characters'),
  body('client.position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('client.company').trim().isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),
  body('quote').trim().isLength({ min: 10, max: 500 }).withMessage('Quote must be between 10 and 500 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully',
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating testimonial',
    });
  }
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  adminOnly,
  body('client.name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Client name must be between 2 and 50 characters'),
  body('client.position').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('client.company').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Company must be between 2 and 100 characters'),
  body('quote').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Quote must be between 10 and 500 characters'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('project', 'title client');

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      data: testimonial,
      message: 'Testimonial updated successfully',
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating testimonial',
    });
  }
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    await testimonial.deleteOne();

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting testimonial',
    });
  }
});

// @desc    Toggle testimonial status
// @route   PATCH /api/testimonials/:id/toggle
// @access  Private/Admin
router.patch('/:id/toggle', protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    testimonial.isPublished = !testimonial.isPublished;
    await testimonial.save();

    res.json({
      success: true,
      data: testimonial,
      message: `Testimonial ${testimonial.isPublished ? 'published' : 'unpublished'} successfully`,
    });
  } catch (error) {
    console.error('Toggle testimonial error:', error);
    res.status(500).json({
      success: false,
      error: 'Error toggling testimonial status',
    });
  }
});

// @desc    Update verification status
// @route   PATCH /api/testimonials/:id/verify
// @access  Private/Admin
router.patch('/:id/verify', [
  protect,
  adminOnly,
  body('status').isIn(['pending', 'verified', 'rejected']).withMessage('Status must be pending, verified, or rejected'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { status } = req.body;
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: status },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      data: testimonial,
      message: `Testimonial verification status updated to ${status}`,
    });
  } catch (error) {
    console.error('Update verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating verification status',
    });
  }
});

// @desc    Get testimonial statistics
// @route   GET /api/testimonials/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, adminOnly, async (req, res) => {
  try {
    const total = await Testimonial.countDocuments();
    const published = await Testimonial.countDocuments({ isPublished: true });
    const featured = await Testimonial.countDocuments({ isFeatured: true });
    const verified = await Testimonial.countDocuments({ verificationStatus: 'verified' });
    
    const serviceStats = await Testimonial.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const ratingDistribution = await Testimonial.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const averageRating = await Testimonial.aggregate([
      { $match: { isPublished: true, verificationStatus: 'verified' } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        total,
        published,
        featured,
        verified,
        pending: total - published,
        averageRating: averageRating[0]?.avgRating || 0,
        totalRatings: averageRating[0]?.totalRatings || 0,
        serviceStats,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error('Testimonial stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching testimonial statistics',
    });
  }
});

export default router; 