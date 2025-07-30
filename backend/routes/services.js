import express from 'express';
import { body, validationResult } from 'express-validator';
import Service from '../models/Service.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      featured,
      active = 'true',
      limit,
      page = 1,
      sortBy = 'order',
      order = 'asc',
    } = req.query;

    const query = {};
    
    // Filter by active status (public only sees active services)
    if (active === 'true') {
      query.isActive = true;
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    let servicesQuery = Service.find(query).sort(sortOptions);
    
    if (limit) {
      const skip = (page - 1) * limit;
      servicesQuery = servicesQuery.limit(parseInt(limit)).skip(skip);
    }

    const services = await servicesQuery.exec();
    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      count: services.length,
      total,
      data: services,
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching services',
    });
  }
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    // Only return active services to public (unless admin)
    if (!service.isActive && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching service',
    });
  }
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
router.post('/', [
  protect,
  adminOnly,
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('category').isIn([
    'SEO & Performance Marketing',
    'Web Development',
    'UI/UX Design',
    'Social Media Management',
    'Online Reputation Management',
    'Local Listings & GBP Management',
    'Fraud Detection & Review Management',
    'E-commerce Solutions',
    'Content Marketing',
    'Digital Strategy',
  ]).withMessage('Please select a valid category'),
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

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully',
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating service',
    });
  }
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  adminOnly,
  body('title').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('category').optional().isIn([
    'SEO & Performance Marketing',
    'Web Development',
    'UI/UX Design',
    'Social Media Management',
    'Online Reputation Management',
    'Local Listings & GBP Management',
    'Fraud Detection & Review Management',
    'E-commerce Solutions',
    'Content Marketing',
    'Digital Strategy',
  ]).withMessage('Please select a valid category'),
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

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating service',
    });
  }
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting service',
    });
  }
});

// @desc    Get service categories
// @route   GET /api/services/categories/list
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [
      'SEO & Performance Marketing',
      'Web Development',
      'UI/UX Design',
      'Social Media Management',
      'Online Reputation Management',
      'Local Listings & GBP Management',
      'Fraud Detection & Review Management',
      'E-commerce Solutions',
      'Content Marketing',
      'Digital Strategy',
    ];

    // Get count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Service.countDocuments({ category, isActive: true });
        return { name: category, count };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching categories',
    });
  }
});

// @desc    Toggle service status
// @route   PATCH /api/services/:id/toggle
// @access  Private/Admin
router.patch('/:id/toggle', protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    service.isActive = !service.isActive;
    await service.save();

    res.json({
      success: true,
      data: service,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Toggle service error:', error);
    res.status(500).json({
      success: false,
      error: 'Error toggling service status',
    });
  }
});

// @desc    Update service order
// @route   PUT /api/services/reorder
// @access  Private/Admin
router.put('/reorder', protect, adminOnly, async (req, res) => {
  try {
    const { services } = req.body;
    
    if (!Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        error: 'Services must be an array',
      });
    }

    // Update order for each service
    const updatePromises = services.map((service, index) => 
      Service.findByIdAndUpdate(service.id, { order: index }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Service order updated successfully',
    });
  } catch (error) {
    console.error('Reorder services error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating service order',
    });
  }
});

export default router; 