import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a service description'],
    maxLength: [500, 'Description cannot be more than 500 characters'],
  },
  detailedDescription: {
    type: String,
    maxLength: [2000, 'Detailed description cannot be more than 2000 characters'],
  },
  icon: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: [true, 'Please provide a service category'],
    enum: [
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
    ],
  },
  features: [{
    type: String,
    trim: true,
  }],
  pricing: {
    startingPrice: {
      type: Number,
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    pricingModel: {
      type: String,
      enum: ['fixed', 'hourly', 'monthly', 'project-based', 'custom'],
      default: 'custom',
    },
  },
  stats: {
    completedProjects: {
      type: Number,
      default: 0,
    },
    clientsSatisfied: {
      type: Number,
      default: 0,
    },
    averageImprovement: {
      type: String,
      default: '',
    },
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
}, {
  timestamps: true,
});

// Index for better query performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, order: 1 });

export default mongoose.model('Service', serviceSchema); 