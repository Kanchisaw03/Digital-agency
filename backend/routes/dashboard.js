import express from 'express';
import Contact from '../models/Contact.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get dashboard overview statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const thisYear = new Date(today.getFullYear(), 0, 1);

    // Contact Statistics
    const totalContacts = await Contact.countDocuments();
    const newContactsThisMonth = await Contact.countDocuments({
      createdAt: { $gte: thisMonth }
    });
    const newContactsLastMonth = await Contact.countDocuments({
      createdAt: { $gte: lastMonth, $lt: thisMonth }
    });

    const contactsByStatus = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const contactsByPriority = await Contact.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Service Statistics
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });



    // Testimonial Statistics
    const totalTestimonials = await Testimonial.countDocuments();
    const publishedTestimonials = await Testimonial.countDocuments({ isPublished: true });
    const averageRating = await Testimonial.aggregate([
      { $match: { isPublished: true, verificationStatus: 'verified' } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    // User Statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });

    // Recent Activity
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message status createdAt');

    // Monthly Contact Trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyContactTrends = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Service Interest Analytics
    const serviceInterestAnalytics = await Contact.aggregate([
      { $unwind: '$serviceInterest' },
      {
        $group: {
          _id: '$serviceInterest',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Industry Analytics
    const industryAnalytics = await Contact.aggregate([
      { $match: { industry: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: '$industry',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Calculate growth rates
    const contactGrowthRate = newContactsLastMonth > 0 
      ? ((newContactsThisMonth - newContactsLastMonth) / newContactsLastMonth * 100).toFixed(1)
      : newContactsThisMonth > 0 ? 100 : 0;

    res.json({
      success: true,
      data: {
        overview: {
          totalContacts,
          newContactsThisMonth,
          contactGrowthRate: parseFloat(contactGrowthRate),
          totalServices,
          activeServices,
          totalBlogs: await Blog.countDocuments(),
          publishedBlogs: await Blog.countDocuments({ isPublished: true, status: 'published' }),
          draftBlogs: await Blog.countDocuments({ status: 'draft' }),
          totalTestimonials,
          publishedTestimonials,
          averageRating: averageRating[0]?.avgRating || 0,
          totalRatings: averageRating[0]?.count || 0,
          totalUsers,
          activeUsers
        },
        contacts: {
          byStatus: contactsByStatus,
          byPriority: contactsByPriority,
          monthlyTrends: monthlyContactTrends,
          recent: recentContacts
        },
        analytics: {
          serviceInterest: serviceInterestAnalytics,
          industries: industryAnalytics
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching dashboard statistics'
    });
  }
});

// @desc    Get contact analytics
// @route   GET /api/dashboard/contacts/analytics
// @access  Private/Admin
router.get('/contacts/analytics', protect, adminOnly, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case '7d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } };
        break;
      case '30d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } };
        break;
      case '90d':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) } };
        break;
      case '1y':
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000) } };
        break;
      default:
        dateFilter = { createdAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } };
    }

    // Daily contact submissions
    const dailySubmissions = await Contact.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Conversion funnel
    const conversionFunnel = await Contact.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Source analytics
    const sourceAnalytics = await Contact.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Budget distribution
    const budgetDistribution = await Contact.aggregate([
      { 
        $match: {
          ...dateFilter,
          budget: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: '$budget',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        dailySubmissions,
        conversionFunnel,
        sourceAnalytics,
        budgetDistribution,
        period
      }
    });
  } catch (error) {
    console.error('Contact analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching contact analytics'
    });
  }
});

// @desc    Get performance metrics
// @route   GET /api/dashboard/performance
// @access  Private/Admin
router.get('/performance', protect, adminOnly, async (req, res) => {
  try {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // Response time metrics (mock data - replace with actual metrics)
    const responseMetrics = {
      averageResponseTime: '2.3 hours',
      responseRate: 95.2,
      resolvedThisMonth: await Contact.countDocuments({
        status: { $in: ['converted', 'closed'] },
        createdAt: { $gte: thisMonth }
      })
    };

    // Conversion metrics
    const totalContactsThisMonth = await Contact.countDocuments({
      createdAt: { $gte: thisMonth }
    });

    const convertedThisMonth = await Contact.countDocuments({
      status: 'converted',
      createdAt: { $gte: thisMonth }
    });

    const conversionRate = totalContactsThisMonth > 0 
      ? ((convertedThisMonth / totalContactsThisMonth) * 100).toFixed(1)
      : 0;

    // Service performance
    const servicePerformance = await Contact.aggregate([
      { $match: { createdAt: { $gte: thisMonth } } },
      { $unwind: '$serviceInterest' },
      {
        $group: {
          _id: '$serviceInterest',
          inquiries: { $sum: 1 },
          converted: {
            $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] }
          }
        }
      },
      {
        $addFields: {
          conversionRate: {
            $cond: [
              { $gt: ['$inquiries', 0] },
              { $multiply: [{ $divide: ['$converted', '$inquiries'] }, 100] },
              0
            ]
          }
        }
      },
      { $sort: { inquiries: -1 } }
    ]);



    res.json({
      success: true,
      data: {
        response: responseMetrics,
        conversion: {
          rate: parseFloat(conversionRate),
          totalInquiries: totalContactsThisMonth,
          converted: convertedThisMonth
        },
        servicePerformance,

      }
    });
  } catch (error) {
    console.error('Performance metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching performance metrics'
    });
  }
});

// @desc    Get recent activity feed
// @route   GET /api/dashboard/activity
// @access  Private/Admin
router.get('/activity', protect, adminOnly, async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) / 2)
      .select('name email company status priority createdAt')
      .lean();



    // Recently published testimonials
    const recentTestimonials = await Testimonial.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('client.name client.company rating createdAt')
      .lean();

    // Combine and sort all activities
    const activities = [
      ...recentContacts.map(contact => ({
        type: 'contact',
        title: `New contact from ${contact.name}`,
        description: `${contact.company || contact.email} - ${contact.status}`,
        priority: contact.priority,
        timestamp: contact.createdAt,
        data: contact
      })),

      ...recentTestimonials.map(testimonial => ({
        type: 'testimonial',
        title: `New testimonial received`,
        description: `${testimonial.client.name} from ${testimonial.client.company} - ${testimonial.rating} stars`,
        timestamp: testimonial.createdAt,
        data: testimonial
      }))
    ];

    // Sort by timestamp and limit
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limitedActivities = activities.slice(0, parseInt(limit));

    res.json({
      success: true,
      count: limitedActivities.length,
      data: limitedActivities
    });
  } catch (error) {
    console.error('Activity feed error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching activity feed'
    });
  }
});

export default router; 