import mongoose from 'mongoose';

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a case study title'],
    trim: true,
    maxLength: [150, 'Title cannot be more than 150 characters'],
  },
  client: {
    name: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    logo: String,
    website: String,
    industry: {
      type: String,
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
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxLength: [300, 'Description cannot be more than 300 characters'],
  },
  challenge: {
    type: String,
    required: [true, 'Please describe the challenge'],
    maxLength: [1000, 'Challenge description cannot be more than 1000 characters'],
  },
  solution: {
    type: String,
    required: [true, 'Please describe the solution'],
    maxLength: [1500, 'Solution description cannot be more than 1500 characters'],
  },
  results: [{
    metric: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    improvement: String,
  }],
  services: [{
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
  technologies: [{
    type: String,
    trim: true,
  }],
  duration: {
    type: String,
    required: [true, 'Please provide project duration'],
  },
  timeline: {
    startDate: Date,
    endDate: Date,
  },
  images: [{
    url: String,
    caption: String,
    isMain: {
      type: Boolean,
      default: false,
    },
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    default: 0,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  testimonial: {
    quote: String,
    author: {
      name: String,
      position: String,
      company: String,
      avatar: String,
    },
  },
}, {
  timestamps: true,
});

// Index for better query performance
caseStudySchema.index({ isPublished: 1, isFeatured: 1, order: 1 });
caseStudySchema.index({ services: 1, isPublished: 1 });
caseStudySchema.index({ tags: 1 });

export default mongoose.model('CaseStudy', caseStudySchema); 