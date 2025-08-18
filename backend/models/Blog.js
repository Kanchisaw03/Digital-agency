import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a blog title'],
    trim: true,
    maxLength: [200, 'Title cannot be more than 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a blog slug'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a blog excerpt'],
    maxLength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content'],
  },
  featuredImage: {
    type: String,
    default: '',
  },
  author: {
    name: {
      type: String,
      required: [true, 'Please provide author name'],
      trim: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      maxLength: [200, 'Author bio cannot be more than 200 characters'],
    },
  },
  category: {
    type: String,
    required: [true, 'Please provide a blog category'],
    enum: [
      'Digital Marketing',
      'Web Development',
      'SEO Tips',
      'Social Media',
      'Content Marketing',
      'Industry News',
      'Case Studies',
      'Tutorials',
      'Business Tips',
      'Technology',
    ],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  readTime: {
    type: Number, // in minutes
    default: 5,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  seo: {
    metaTitle: {
      type: String,
      maxLength: [60, 'Meta title cannot be more than 60 characters'],
    },
    metaDescription: {
      type: String,
      maxLength: [160, 'Meta description cannot be more than 160 characters'],
    },
    keywords: [String],
    ogImage: String,
  },
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
  comments: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      maxLength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

// Index for better query performance (removing duplicate slug index)
blogSchema.index({ status: 1, isPublished: 1 });
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ isFeatured: 1, publishedAt: -1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ views: -1 });

// Generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  
  // Set publishedAt date when publishing
  if (this.isModified('status') && this.status === 'published' && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Calculate read time based on content length
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
