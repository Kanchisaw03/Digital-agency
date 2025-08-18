import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { protect, adminOnly } from '../middleware/auth.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure email transporter
const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  } else {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('phone').optional().matches(/^\+?[\d\s\-\(\)]+$/).withMessage('Please provide a valid phone number'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters'),
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

    const {
      name,
      email,
      phone,
      company,
      industry,
      designation,
      subject,
      message,
      serviceInterest,
      budget,
      timeline,
      source,
    } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      industry,
      designation,
      subject,
      message,
      serviceInterest,
      budget,
      timeline,
      source: source || 'Website',
      ipAddress,
      userAgent,
    });

    // Send email notification
    try {
      const transporter = createTransporter();
      
      // Email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'admin@vigyapana.com',
        subject: `New Contact Form Submission - ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${industry || 'Not provided'}</p>
          <p><strong>Designation:</strong> ${designation || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
          <p><strong>Services of Interest:</strong> ${serviceInterest?.join(', ') || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          <p><strong>Source:</strong> ${source || 'Website'}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${message}</blockquote>
          <hr>
          <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
        `,
      };

      // Confirmation email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Vigyapana - We\'ll be in touch soon!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>We've received your message and appreciate you taking the time to contact us. Our team at Vigyapana will review your inquiry and get back to you within 24 hours.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <p><strong>Services of Interest:</strong> ${serviceInterest?.join(', ') || 'General consultation'}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            
            <p>In the meantime, feel free to explore our <a href="${process.env.CLIENT_URL}/services">services</a> or check out our latest <a href="${process.env.CLIENT_URL}/case-studies">case studies</a>.</p>
            
            <p>Best regards,<br>The Vigyapana Team</p>
            
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              This is an automated response. Please do not reply to this email.
              If you need immediate assistance, please call us at +1 (555) 123-4567.
            </p>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'There was an error submitting your message. Please try again.',
    });
  }
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      priority,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = {};
    
    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Filter by priority
    if (priority && priority !== 'all') {
      query.priority = priority;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const contacts = await Contact.find(query)
      .populate('assignedTo', 'name email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      count: contacts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: contacts,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching contact submissions',
    });
  }
});

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('assignedTo', 'name email');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching contact submission',
    });
  }
});

// @desc    Update contact submission
// @route   PUT /api/contact/:id
// @access  Private/Admin
router.put('/:id', [
  protect,
  adminOnly,
  body('status').optional().isIn(['new', 'contacted', 'in-progress', 'converted', 'closed']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('notes').optional().isLength({ max: 500 }),
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

    const { status, priority, notes, assignedTo, followUpDate } = req.body;
    
    const updateFields = {};
    if (status) updateFields.status = status;
    if (priority) updateFields.priority = priority;
    if (notes) updateFields.notes = notes;
    if (assignedTo) updateFields.assignedTo = assignedTo;
    if (followUpDate) updateFields.followUpDate = followUpDate;
    
    if (status === 'closed') {
      updateFields.closedDate = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
    }

    res.json({
      success: true,
      data: contact,
      message: 'Contact submission updated successfully',
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating contact submission',
    });
  }
});

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact submission deleted successfully',
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting contact submission',
    });
  }
});

// @desc    Get contact statistics
// @route   GET /api/contact/stats/overview
// @access  Private/Admin
router.get('/stats/overview', protect, adminOnly, async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Contact.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Contact.countDocuments();
    const thisMonth = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    res.json({
      success: true,
      data: {
        total,
        thisMonth,
        byStatus: stats,
        byPriority: priorityStats,
      },
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching contact statistics',
    });
  }
});

export default router; 