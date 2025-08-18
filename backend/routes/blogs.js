import express from 'express';
import { body, validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      featured,
      published = 'true',
      limit,
      page = 1,
      sortBy = 'publishedAt',
      order = 'desc',
      search,
      tags,
    } = req.query;

    const query = {};
    
    // Filter by published status (public only sees published blogs)
    if (published === 'true') {
      query.isPublished = true;
      query.status = 'published';
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search in title, excerpt, and content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    let blogsQuery = Blog.find(query)
      .select('-content') // Exclude full content for list view
      .sort(sortOptions);
    
    if (limit) {
      const skip = (page - 1) * limit;
      blogsQuery = blogsQuery.limit(parseInt(limit)).skip(skip);
    }

    const blogs = await blogsQuery.exec();
    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      count: blogs.length,
      total,
      data: blogs,
      pagination: limit ? {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      } : null,
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      ...(req.query.preview !== 'true' && { isPublished: true, status: 'published' })
    }).populate('relatedPosts', 'title slug excerpt featuredImage publishedAt readTime');

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
    }

    // Increment view count (only for published posts)
    if (blog.isPublished && blog.status === 'published') {
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private (Admin only)
router.post('/', protect, adminOnly, [
  body('title').notEmpty().withMessage('Title is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Blog creation validation errors:', errors.array());
      console.log('Request body:', req.body);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    // Generate slug if not provided
    let slug = req.body.slug;
    if (!slug && req.body.title) {
      slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    const blogData = {
      ...req.body,
      slug: slug,
      author: {
        name: req.body.author?.name || req.user?.name || 'Admin User',
        avatar: req.body.author?.avatar || '',
        bio: req.body.author?.bio || '',
      },
    };

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: blogData.slug });
    if (existingBlog) {
      blogData.slug = `${blogData.slug}-${Date.now()}`;
    }

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    console.error('Error details:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Database Validation Error',
        details: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
router.put('/:id', protect, adminOnly, [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Toggle blog published status
// @route   PATCH /api/blogs/:id/toggle
// @access  Private (Admin only)
router.patch('/:id/toggle', protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
    }

    blog.isPublished = !blog.isPublished;
    blog.status = blog.isPublished ? 'published' : 'draft';
    
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }

    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Toggle blog error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Public
router.post('/:id/comments', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array(),
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found',
      });
    }

    const comment = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      isApproved: false, // Comments need approval
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Comment submitted for approval',
      data: comment,
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// @desc    Get blog statistics
// @route   GET /api/blogs/stats
// @access  Private (Admin only)
router.get('/admin/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true, status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalComments = await Blog.aggregate([
      { $project: { commentCount: { $size: '$comments' } } },
      { $group: { _id: null, totalComments: { $sum: '$commentCount' } } }
    ]);

    const stats = {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews: totalViews[0]?.totalViews || 0,
      totalComments: totalComments[0]?.totalComments || 0,
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get blog stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

export default router;
