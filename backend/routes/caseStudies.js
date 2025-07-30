import express from 'express';
import CaseStudy from '../models/CaseStudy.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let query = {};
    
    // Build query
    if (req.query.published !== undefined) {
      query.isPublished = req.query.published === 'true';
    }
    
    if (req.query.featured !== undefined) {
      query.isFeatured = req.query.featured === 'true';
    }
    
    if (req.query.services) {
      query.services = { $in: req.query.services.split(',') };
    }
    
    if (req.query.industry) {
      query['client.industry'] = req.query.industry;
    }
    
    if (req.query.tags) {
      query.tags = { $in: req.query.tags.split(',') };
    }
    
    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { 'client.name': { $regex: req.query.search, $options: 'i' } },
      ];
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Sort
    let sort = { order: 1, createdAt: -1 };
    if (req.query.sort) {
      const sortBy = req.query.sort;
      if (sortBy === 'views') sort = { viewCount: -1 };
      if (sortBy === 'newest') sort = { createdAt: -1 };
      if (sortBy === 'oldest') sort = { createdAt: 1 };
      if (sortBy === 'title') sort = { title: 1 };
    }
    
    const caseStudies = await CaseStudy.find(query)
      .sort(sort)
      .limit(limit)
      .skip(startIndex)
      .select('-__v');
    
    const total = await CaseStudy.countDocuments(query);
    
    // Pagination result
    const pagination = {};
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    if (startIndex + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    
    res.status(200).json({
      success: true,
      count: caseStudies.length,
      total,
      pagination,
      data: caseStudies,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single case study
// @route   GET /api/case-studies/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }
    
    // Increment view count
    caseStudy.viewCount += 1;
    await caseStudy.save();
    
    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get case study by slug
// @route   GET /api/case-studies/slug/:slug
// @access  Public
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findOne({ 'seo.slug': req.params.slug });
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }
    
    // Increment view count
    caseStudy.viewCount += 1;
    await caseStudy.save();
    
    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create case study
// @route   POST /api/case-studies
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    // Generate slug if not provided
    if (!req.body.seo?.slug && req.body.title) {
      req.body.seo = req.body.seo || {};
      req.body.seo.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');
    }
    
    const caseStudy = await CaseStudy.create(req.body);
    
    res.status(201).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    let caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }
    
    // Generate slug if title changed and no slug provided
    if (req.body.title && req.body.title !== caseStudy.title && !req.body.seo?.slug) {
      req.body.seo = req.body.seo || {};
      req.body.seo.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');
    }
    
    caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }
    
    await CaseStudy.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Case study deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Toggle case study publish status
// @route   PATCH /api/case-studies/:id/toggle
// @access  Private/Admin
router.patch('/:id/toggle', protect, authorize('admin'), async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        message: 'Case study not found',
      });
    }
    
    caseStudy.isPublished = !caseStudy.isPublished;
    await caseStudy.save();
    
    res.status(200).json({
      success: true,
      data: caseStudy,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get case studies statistics
// @route   GET /api/case-studies/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, authorize('admin'), async (req, res, next) => {
  try {
    const totalCaseStudies = await CaseStudy.countDocuments();
    const publishedCaseStudies = await CaseStudy.countDocuments({ isPublished: true });
    const featuredCaseStudies = await CaseStudy.countDocuments({ isFeatured: true });
    const totalViews = await CaseStudy.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$viewCount' } } }
    ]);
    
    // Most viewed case studies
    const mostViewed = await CaseStudy.find({ isPublished: true })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount client.name');
    
    // Case studies by service
    const byService = await CaseStudy.aggregate([
      { $unwind: '$services' },
      { $group: { _id: '$services', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Case studies by industry
    const byIndustry = await CaseStudy.aggregate([
      { $group: { _id: '$client.industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Monthly case studies creation
    const monthlyStats = await CaseStudy.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          total: totalCaseStudies,
          published: publishedCaseStudies,
          featured: featuredCaseStudies,
          totalViews: totalViews[0]?.totalViews || 0,
        },
        mostViewed,
        distribution: {
          byService,
          byIndustry,
        },
        monthlyStats,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router; 