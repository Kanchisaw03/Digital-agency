import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  client: {
    name: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
      maxLength: [50, 'Name cannot be more than 50 characters'],
    },
    position: {
      type: String,
      required: [true, 'Please provide client position'],
      trim: true,
      maxLength: [100, 'Position cannot be more than 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
      maxLength: [100, 'Company cannot be more than 100 characters'],
    },
    avatar: String,
    companyLogo: String,
  },
  quote: {
    type: String,
    required: [true, 'Please provide testimonial quote'],
    maxLength: [500, 'Quote cannot be more than 500 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  service: {
    type: String,
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
      'General',
    ],
    default: 'General',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    enum: ['direct', 'google', 'linkedin', 'facebook', 'twitter', 'clutch', 'other'],
    default: 'direct',
  },
  sourceUrl: String,
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
}, {
  timestamps: true,
});

// Index for better query performance
testimonialSchema.index({ isPublished: 1, isFeatured: 1, order: 1 });
testimonialSchema.index({ service: 1, isPublished: 1 });
testimonialSchema.index({ rating: -1 });

export default mongoose.model('Testimonial', testimonialSchema); 