import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxLength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number'],
  },
  company: {
    type: String,
    trim: true,
    maxLength: [100, 'Company name cannot be more than 100 characters'],
  },
  industry: {
    type: String,
    trim: true,
    enum: [
      'Technology',
      'Healthcare',
      'Finance',
      'E-commerce',
      'Education',
      'Real Estate',
      'Manufacturing',
      'Retail',
      'Hospitality',
      'Professional Services',
      'Non-profit',
      'Government',
      'Other',
    ],
  },
  designation: {
    type: String,
    trim: true,
    maxLength: [100, 'Designation cannot be more than 100 characters'],
  },
  subject: {
    type: String,
    trim: true,
    maxLength: [200, 'Subject cannot be more than 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide your message'],
    maxLength: [1000, 'Message cannot be more than 1000 characters'],
  },
  serviceInterest: [{
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
    ],
  }],
  budget: {
    type: String,
    enum: [
      'Under $5,000',
      '$5,000 - $15,000',
      '$15,000 - $50,000',
      '$50,000 - $100,000',
      'Over $100,000',
      'Not sure',
    ],
  },
  timeline: {
    type: String,
    enum: [
      'ASAP',
      'Within 1 month',
      'Within 3 months',
      'Within 6 months',
      'No specific timeline',
    ],
  },
  source: {
    type: String,
    enum: [
      'Google Search',
      'Social Media',
      'Referral',
      'Website',
      'Advertisement',
      'Event',
      'Other',
    ],
    default: 'Website',
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  notes: {
    type: String,
    maxLength: [500, 'Notes cannot be more than 500 characters'],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ipAddress: String,
  userAgent: String,
  isSpam: {
    type: Boolean,
    default: false,
  },
  followUpDate: Date,
  closedDate: Date,
}, {
  timestamps: true,
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ priority: 1, status: 1 });
contactSchema.index({ email: 1 });

export default mongoose.model('Contact', contactSchema); 