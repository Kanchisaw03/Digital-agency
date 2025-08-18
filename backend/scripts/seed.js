import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import User from '../models/User.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import Contact from '../models/Contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vigyapana');
    console.log('📱 MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Sample data
const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@vigyapana.com',
    username: 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
    isActive: true,
  },
  {
    name: 'Editor User',
    email: 'editor@vigyapana.com',
    username: 'editor',
    password: 'editor123',
    role: 'editor',
    isActive: true,
  }
];

const services = [
  {
    title: 'SEO & Performance Marketing',
    description: 'Drive organic traffic and boost your online visibility with our comprehensive SEO strategies and performance marketing campaigns.',
    detailedDescription: 'Our SEO and performance marketing services combine technical optimization, content strategy, and data-driven campaigns to maximize your online presence. We focus on sustainable growth through white-hat techniques and continuous optimization.',
    category: 'SEO & Performance Marketing',
    features: [
      'Keyword Research & Analysis',
      'On-Page & Technical SEO',
      'Content Optimization',
      'Link Building',
      'Performance Tracking',
      'PPC Campaign Management'
    ],
    pricing: {
      startingPrice: 1500,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 156,
      clientsSatisfied: 140,
      averageImprovement: '312% increase in organic traffic'
    },
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Google Ads', 'Facebook Ads'],
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    title: 'Website Development',
    description: 'Create stunning, responsive websites that convert visitors into customers with our modern web development solutions.',
    detailedDescription: 'We build high-performance websites using the latest technologies and best practices. From simple landing pages to complex web applications, our development team delivers solutions that are fast, secure, and scalable.',
    category: 'Web Development',
    features: [
      'Responsive Design',
      'Custom Development',
      'E-commerce Solutions',
      'CMS Integration',
      'Performance Optimization',
      'Security Implementation'
    ],
    pricing: {
      startingPrice: 3000,
      currency: 'USD',
      pricingModel: 'project-based'
    },
    stats: {
      completedProjects: 89,
      clientsSatisfied: 85,
      averageImprovement: '250% faster load times'
    },
    technologies: ['React', 'Node.js', 'MongoDB', 'WordPress', 'Shopify'],
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    title: 'UI/UX Design',
    description: 'Design user-centered experiences that delight customers and drive conversions through intuitive interfaces.',
    detailedDescription: 'Our UI/UX design services focus on creating beautiful, functional designs that provide exceptional user experiences. We use data-driven design principles and user research to create interfaces that convert.',
    category: 'UI/UX Design',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing',
      'Design Systems',
      'Mobile-First Design'
    ],
    pricing: {
      startingPrice: 2500,
      currency: 'USD',
      pricingModel: 'project-based'
    },
    stats: {
      completedProjects: 67,
      clientsSatisfied: 64,
      averageImprovement: '180% increase in user engagement'
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle'],
    isActive: true,
    isFeatured: false,
    order: 3
  },
  {
    title: 'Social Media Management',
    description: 'Build your brand presence and engage with your audience across all major social media platforms.',
    detailedDescription: 'Our social media management services help you build a strong online presence, engage with your audience, and drive business results through strategic content and community management.',
    category: 'Social Media Management',
    features: [
      'Content Strategy',
      'Content Creation',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting',
      'Influencer Partnerships'
    ],
    pricing: {
      startingPrice: 1200,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 134,
      clientsSatisfied: 128,
      averageImprovement: '340% increase in social engagement'
    },
    technologies: ['Hootsuite', 'Buffer', 'Canva', 'Facebook Business', 'Instagram Creator Studio'],
    isActive: true,
    isFeatured: false,
    order: 4
  },
  {
    title: 'Content Marketing',
    description: 'Create compelling content that attracts, engages, and converts your target audience into loyal customers.',
    detailedDescription: 'Our content marketing services help you tell your brand story, establish thought leadership, and drive organic growth through strategic content creation and distribution.',
    category: 'Content Marketing',
    features: [
      'Content Strategy',
      'Blog Writing',
      'Video Content',
      'Email Marketing',
      'SEO Content',
      'Content Distribution'
    ],
    pricing: {
      startingPrice: 1800,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 98,
      clientsSatisfied: 92,
      averageImprovement: '275% increase in organic leads'
    },
    technologies: ['WordPress', 'HubSpot', 'Mailchimp', 'Google Analytics', 'SEMrush'],
    isActive: true,
    isFeatured: false,
    order: 5
  },
  {
    title: 'Digital Strategy Consulting',
    description: 'Get expert guidance on your digital transformation journey with our comprehensive strategy consulting services.',
    detailedDescription: 'Our digital strategy consulting helps businesses navigate the complex digital landscape, identify opportunities, and create roadmaps for sustainable growth and competitive advantage.',
    category: 'Digital Strategy',
    features: [
      'Digital Audit',
      'Competitive Analysis',
      'Growth Strategy',
      'Technology Consulting',
      'Performance Optimization',
      'ROI Analysis'
    ],
    pricing: {
      startingPrice: 5000,
      currency: 'USD',
      pricingModel: 'project-based'
    },
    stats: {
      completedProjects: 45,
      clientsSatisfied: 43,
      averageImprovement: '420% ROI improvement'
    },
    technologies: ['Google Analytics', 'Tableau', 'HubSpot', 'Salesforce', 'Microsoft Power BI'],
    isActive: true,
    isFeatured: true,
    order: 6
  }
];

const blogs = [
  {
    title: "Complete Guide to Digital Marketing ROI: Measuring Success in 2024",
    slug: "complete-guide-digital-marketing-roi-2024",
    excerpt: "Learn how to accurately measure and optimize your digital marketing ROI with proven strategies, tools, and metrics that drive real business growth.",
    content: `<h2>Introduction</h2>
    <p>In today's competitive digital landscape, measuring return on investment (ROI) is crucial for business success. This comprehensive guide will walk you through everything you need to know about digital marketing ROI, from basic calculations to advanced attribution models.</p>
    
    <h2>Understanding Digital Marketing ROI</h2>
    <p>Digital marketing ROI is the measure of profit or loss generated from your digital marketing campaigns relative to the amount invested. The basic formula is:</p>
    
    <blockquote>
    ROI = (Revenue Generated - Marketing Cost) / Marketing Cost × 100
    </blockquote>
    
    <p>However, calculating true ROI in digital marketing is more complex than this simple formula suggests.</p>
    
    <h2>Key Metrics to Track</h2>
    
    <h3>1. Customer Acquisition Cost (CAC)</h3>
    <p>CAC represents the total cost of acquiring a new customer through your marketing efforts. This includes advertising spend, content creation costs, and staff time.</p>
    
    <h3>2. Customer Lifetime Value (CLV)</h3>
    <p>CLV predicts the total revenue you can expect from a customer throughout their relationship with your business. A healthy business has a CLV:CAC ratio of at least 3:1.</p>
    
    <h3>3. Conversion Rate</h3>
    <p>Track conversion rates across different channels and campaigns to identify your most effective marketing activities.</p>
    
    <h2>Attribution Models Explained</h2>
    
    <h3>First-Touch Attribution</h3>
    <p>Credits the first touchpoint in the customer journey. Useful for understanding which channels drive initial awareness.</p>
    
    <h3>Last-Touch Attribution</h3>
    <p>Credits the final touchpoint before conversion. Helps identify which channels are best at closing deals.</p>
    
    <h3>Multi-Touch Attribution</h3>
    <p>Distributes credit across multiple touchpoints. Provides a more holistic view of the customer journey.</p>
    
    <h2>Tools for Measuring ROI</h2>
    
    <h3>Google Analytics 4</h3>
    <p>The latest version of Google Analytics offers enhanced e-commerce tracking, custom conversions, and improved attribution modeling.</p>
    
    <h3>Marketing Automation Platforms</h3>
    <p>Tools like HubSpot, Marketo, and Pardot provide comprehensive ROI tracking across multiple channels.</p>
    
    <h3>CRM Integration</h3>
    <p>Connecting your CRM with marketing tools provides a complete view of the customer journey from first touch to closed deal.</p>
    
    <h2>Common ROI Measurement Challenges</h2>
    
    <h3>Long Sales Cycles</h3>
    <p>B2B companies often face challenges with long sales cycles. Consider using micro-conversions and leading indicators to measure progress.</p>
    
    <h3>Offline Conversions</h3>
    <p>Track phone calls, in-store visits, and other offline conversions using call tracking, UTM parameters, and promo codes.</p>
    
    <h3>Brand Awareness Impact</h3>
    <p>Brand campaigns may not drive immediate conversions but contribute to long-term growth. Use brand lift studies and assisted conversions to measure impact.</p>
    
    <h2>Best Practices for Improving ROI</h2>
    
    <ul>
    <li><strong>Set Clear Goals:</strong> Define specific, measurable objectives for each campaign</li>
    <li><strong>Test and Optimize:</strong> Continuously A/B test ad copy, landing pages, and targeting</li>
    <li><strong>Focus on Quality Traffic:</strong> Target audiences most likely to convert</li>
    <li><strong>Optimize for Mobile:</strong> Ensure all touchpoints are mobile-friendly</li>
    <li><strong>Personalize Experiences:</strong> Use data to create personalized customer journeys</li>
    </ul>
    
    <h2>Case Study: E-commerce ROI Optimization</h2>
    <p>A mid-sized e-commerce company increased their digital marketing ROI by 340% over 12 months by implementing these strategies:</p>
    
    <ol>
    <li>Implemented proper attribution modeling</li>
    <li>Focused budget on high-performing channels</li>
    <li>Optimized landing pages for conversion</li>
    <li>Implemented retargeting campaigns</li>
    <li>Used marketing automation for lead nurturing</li>
    </ol>
    
    <h2>Conclusion</h2>
    <p>Measuring digital marketing ROI effectively requires a combination of the right tools, proper attribution modeling, and continuous optimization. By focusing on the metrics that matter most to your business and implementing best practices, you can significantly improve your marketing performance and drive sustainable growth.</p>
    
    <p>Remember, ROI measurement is not a one-time activity but an ongoing process that requires regular review and adjustment as your business and market conditions evolve.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e0e98e?w=100&h=100&fit=crop&crop=face",
      bio: "Digital Marketing Strategist with 10+ years of experience helping businesses optimize their marketing ROI"
    },
    category: "Digital Marketing",
    tags: ["roi", "digital marketing", "analytics", "conversion tracking", "attribution", "marketing metrics"],
    status: "published",
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date("2024-01-20"),
    readTime: 12,
    views: 2150,
    likes: 156
  },
  {
    title: "Modern Web Development Stack: React, Node.js, and MongoDB Best Practices",
    slug: "modern-web-development-stack-react-nodejs-mongodb",
    excerpt: "Master the MERN stack with this comprehensive guide covering React hooks, Node.js APIs, MongoDB optimization, and deployment strategies for scalable web applications.",
    content: `<h2>Introduction</h2>
    <p>The MERN stack (MongoDB, Express.js, React, Node.js) has become one of the most popular choices for building modern web applications. This guide will walk you through best practices, common pitfalls, and optimization techniques for each component of the stack.</p>
    
    <h2>React Best Practices</h2>
    
    <h3>1. Component Architecture</h3>
    <p>Organize your React components using a clear hierarchy and separation of concerns:</p>
    
    <pre><code>src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── contexts/         # React contexts
└── utils/            # Utility functions</code></pre>
    
    <h3>2. State Management with Hooks</h3>
    <p>Use React hooks effectively for state management:</p>
    
    <pre><code>// Custom hook for API calls
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};</code></pre>
    
    <h3>3. Performance Optimization</h3>
    <ul>
    <li><strong>React.memo:</strong> Prevent unnecessary re-renders</li>
    <li><strong>useMemo and useCallback:</strong> Optimize expensive calculations</li>
    <li><strong>Code splitting:</strong> Use React.lazy for route-based splitting</li>
    <li><strong>Virtual scrolling:</strong> Handle large lists efficiently</li>
    </ul>
    
    <h2>Node.js and Express.js Best Practices</h2>
    
    <h3>1. Project Structure</h3>
    <p>Organize your Node.js application for maintainability:</p>
    
    <pre><code>backend/
├── controllers/      # Request handlers
├── models/          # Database models
├── routes/          # Route definitions
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── config/          # Configuration files
└── tests/           # Test files</code></pre>
    
    <h3>2. Error Handling</h3>
    <p>Implement comprehensive error handling:</p>
    
    <pre><code>// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error
  console.error(err);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};</code></pre>
    
    <h3>3. API Design</h3>
    <ul>
    <li><strong>RESTful routes:</strong> Follow REST conventions</li>
    <li><strong>Validation:</strong> Use express-validator for input validation</li>
    <li><strong>Authentication:</strong> Implement JWT-based authentication</li>
    <li><strong>Rate limiting:</strong> Protect against abuse</li>
    </ul>
    
    <h2>MongoDB Optimization</h2>
    
    <h3>1. Schema Design</h3>
    <p>Design efficient MongoDB schemas:</p>
    
    <pre><code>const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String
  },
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});</code></pre>
    
    <h3>2. Indexing Strategy</h3>
    <ul>
    <li><strong>Compound indexes:</strong> For multi-field queries</li>
    <li><strong>Text indexes:</strong> For full-text search</li>
    <li><strong>Sparse indexes:</strong> For optional fields</li>
    <li><strong>TTL indexes:</strong> For automatic document expiration</li>
    </ul>
    
    <h3>3. Query Optimization</h3>
    <p>Write efficient MongoDB queries:</p>
    
    <pre><code>// Use projection to limit returned fields
const users = await User.find(
  { status: 'active' },
  'name email profile.avatar'
);

// Use aggregation for complex queries
const stats = await User.aggregate([
  { $match: { createdAt: { $gte: startDate } } },
  { $group: { _id: '$role', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);</code></pre>
    
    <h2>Security Best Practices</h2>
    
    <h3>1. Authentication and Authorization</h3>
    <ul>
    <li><strong>JWT tokens:</strong> Use secure, stateless authentication</li>
    <li><strong>Password hashing:</strong> Use bcrypt with appropriate rounds</li>
    <li><strong>Role-based access:</strong> Implement proper authorization</li>
    <li><strong>Session management:</strong> Handle token refresh securely</li>
    </ul>
    
    <h3>2. Data Protection</h3>
    <ul>
    <li><strong>Input validation:</strong> Sanitize all user inputs</li>
    <li><strong>SQL injection:</strong> Use parameterized queries</li>
    <li><strong>XSS protection:</strong> Sanitize HTML content</li>
    <li><strong>CORS:</strong> Configure appropriate CORS policies</li>
    </ul>
    
    <h2>Deployment and DevOps</h2>
    
    <h3>1. Environment Configuration</h3>
    <p>Use environment variables for configuration:</p>
    
    <pre><code>// .env file
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
REDIS_URL=redis://...</code></pre>
    
    <h3>2. Docker Containerization</h3>
    <pre><code># Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
    
    <h2>Performance Optimization</h2>
    
    <h3>1. Frontend Optimization</h3>
    <ul>
    <li><strong>Bundle splitting:</strong> Reduce initial bundle size</li>
    <li><strong>Lazy loading:</strong> Load components on demand</li>
    <li><strong>Image optimization:</strong> Use WebP format and responsive images</li>
    <li><strong>Caching:</strong> Implement service workers for offline support</li>
    </ul>
    
    <h3>2. Backend Optimization</h3>
    <ul>
    <li><strong>Caching:</strong> Redis for session and data caching</li>
    <li><strong>Database optimization:</strong> Query optimization and indexing</li>
    <li><strong>CDN:</strong> Content delivery network for static assets</li>
    <li><strong>Load balancing:</strong> Distribute traffic across multiple servers</li>
    </ul>
    
    <h2>Testing Strategies</h2>
    
    <h3>1. Frontend Testing</h3>
    <pre><code>// React component test with Jest and Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('submits form with correct data', () => {
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});</code></pre>
    
    <h3>2. Backend Testing</h3>
    <pre><code>// API endpoint test with Jest and Supertest
describe('POST /api/users', () => {
  test('creates a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);
      
    expect(response.body.user.email).toBe(userData.email);
  });
});</code></pre>
    
    <h2>Conclusion</h2>
    <p>Building scalable web applications with the MERN stack requires attention to architecture, performance, security, and best practices. By following the guidelines in this comprehensive guide, you'll be well-equipped to create robust, maintainable applications that can scale with your business needs.</p>
    
    <p>Remember that technology evolves rapidly, so stay updated with the latest developments in the React, Node.js, and MongoDB ecosystems. Continuous learning and adaptation are key to success in modern web development.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    author: {
      name: "Arjun Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      bio: "Full-Stack Developer and Technical Lead with expertise in MERN stack and cloud architecture"
    },
    category: "Web Development",
    tags: ["mern stack", "react", "nodejs", "mongodb", "javascript", "web development", "best practices"],
    status: "published",
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date("2024-01-18"),
    readTime: 15,
    views: 1840,
    likes: 124
  },
  {
    title: "Social Media Marketing Strategy for Small Businesses in 2024",
    slug: "social-media-marketing-strategy-small-businesses-2024",
    excerpt: "Discover proven social media strategies specifically designed for small businesses, including platform selection, content planning, and budget optimization techniques.",
    content: `<h2>Introduction</h2>
    <p>Social media marketing has become essential for small businesses looking to compete in today's digital marketplace. With over 4.8 billion social media users worldwide, platforms like Facebook, Instagram, LinkedIn, and TikTok offer unprecedented opportunities to reach your target audience cost-effectively.</p>
    
    <p>This comprehensive guide will walk you through creating a winning social media strategy tailored specifically for small businesses with limited budgets but unlimited potential.</p>
    
    <h2>Understanding Your Audience</h2>
    
    <h3>Creating Buyer Personas</h3>
    <p>Before diving into content creation, you need to understand who you're talking to. Develop detailed buyer personas that include:</p>
    
    <ul>
    <li><strong>Demographics:</strong> Age, gender, location, income level</li>
    <li><strong>Psychographics:</strong> Interests, values, lifestyle choices</li>
    <li><strong>Behavior patterns:</strong> Social media usage, shopping habits</li>
    <li><strong>Pain points:</strong> Challenges your product/service solves</li>
    <li><strong>Preferred platforms:</strong> Where they spend their time online</li>
    </ul>
    
    <h3>Research Tools</h3>
    <p>Use these free and affordable tools to research your audience:</p>
    
    <ul>
    <li><strong>Google Analytics:</strong> Understand your website visitors</li>
    <li><strong>Facebook Audience Insights:</strong> Discover Facebook user behavior</li>
    <li><strong>Instagram Insights:</strong> Analyze your Instagram followers</li>
    <li><strong>Surveys:</strong> Directly ask your customers about their preferences</li>
    </ul>
    
    <h2>Platform Selection Strategy</h2>
    
    <h3>Facebook</h3>
    <p><strong>Best for:</strong> Local businesses, B2C companies, community building</p>
    <p><strong>Demographics:</strong> Broad age range, particularly 25-54</p>
    <p><strong>Content types:</strong> Posts, Stories, Reels, Events, Groups</p>
    
    <h3>Instagram</h3>
    <p><strong>Best for:</strong> Visual brands, lifestyle products, younger demographics</p>
    <p><strong>Demographics:</strong> Primarily 18-34, visual-oriented users</p>
    <p><strong>Content types:</strong> Photos, Stories, Reels, IGTV, Shopping posts</p>
    
    <h3>LinkedIn</h3>
    <p><strong>Best for:</strong> B2B companies, professional services, thought leadership</p>
    <p><strong>Demographics:</strong> Working professionals, decision-makers</p>
    <p><strong>Content types:</strong> Articles, Posts, Videos, Company updates</p>
    
    <h3>TikTok</h3>
    <p><strong>Best for:</strong> Creative brands, Gen Z targeting, viral content</p>
    <p><strong>Demographics:</strong> Primarily 16-24, entertainment-focused</p>
    <p><strong>Content types:</strong> Short-form videos, Challenges, Duets</p>
    
    <h2>Content Strategy Framework</h2>
    
    <h3>The 80/20 Rule</h3>
    <p>Follow the 80/20 rule for content distribution:</p>
    <ul>
    <li><strong>80% Value-driven content:</strong> Educational, entertaining, inspirational</li>
    <li><strong>20% Promotional content:</strong> Product features, sales, company news</li>
    </ul>
    
    <h3>Content Pillars</h3>
    <p>Develop 3-5 content pillars that align with your business goals:</p>
    
    <ol>
    <li><strong>Educational:</strong> Tips, tutorials, how-to guides</li>
    <li><strong>Behind-the-scenes:</strong> Company culture, process insights</li>
    <li><strong>User-generated content:</strong> Customer stories, reviews</li>
    <li><strong>Industry news:</strong> Trends, updates, commentary</li>
    <li><strong>Community:</strong> Engagement posts, questions, polls</li>
    </ol>
    
    <h2>Budget-Friendly Content Creation</h2>
    
    <h3>DIY Content Tools</h3>
    <p>Create professional-looking content without breaking the bank:</p>
    
    <ul>
    <li><strong>Canva:</strong> Graphic design templates and tools</li>
    <li><strong>Unsplash/Pexels:</strong> Free high-quality stock photos</li>
    <li><strong>Loom:</strong> Screen recording for tutorials</li>
    <li><strong>Smartphone:</strong> High-quality photos and videos</li>
    <li><strong>Natural lighting:</strong> Best lighting is often free</li>
    </ul>
    
    <h3>Content Repurposing</h3>
    <p>Maximize your content ROI by repurposing across platforms:</p>
    
    <ul>
    <li><strong>Blog post → Instagram carousel</strong></li>
    <li><strong>Video → Audio podcast</strong></li>
    <li><strong>Webinar → Multiple short clips</strong></li>
    <li><strong>Customer review → Multiple platform posts</strong></li>
    <li><strong>FAQ → Story highlights</strong></li>
    </ul>
    
    <h2>Engagement and Community Building</h2>
    
    <h3>Authentic Engagement Strategies</h3>
    <ul>
    <li><strong>Respond promptly:</strong> Aim for responses within 2-4 hours</li>
    <li><strong>Ask questions:</strong> Encourage conversation in your posts</li>
    <li><strong>Share user content:</strong> Highlight customer stories</li>
    <li><strong>Join conversations:</strong> Comment on relevant industry posts</li>
    <li><strong>Host live sessions:</strong> Q&As, tutorials, behind-the-scenes</li>
    </ul>
    
    <h3>Building a Community</h3>
    <p>Foster a loyal community around your brand:</p>
    
    <ol>
    <li><strong>Create a Facebook Group:</strong> Build a space for customers to connect</li>
    <li><strong>Use hashtags strategically:</strong> Create a branded hashtag</li>
    <li><strong>Collaborate with local businesses:</strong> Cross-promote content</li>
    <li><strong>Share customer success stories:</strong> Make customers the hero</li>
    <li><strong>Provide exclusive value:</strong> Special offers for followers</li>
    </ol>
    
    <h2>Paid Advertising on a Budget</h2>
    
    <h3>Start Small, Scale Smart</h3>
    <p>Begin with a modest budget and test different approaches:</p>
    
    <ul>
    <li><strong>$5-10/day:</strong> Test different audiences and content</li>
    <li><strong>Focus on one platform:</strong> Master one before expanding</li>
    <li><strong>Boost high-performing posts:</strong> Amplify what already works</li>
    <li><strong>Use lookalike audiences:</strong> Target people similar to customers</li>
    </ul>
    
    <h2>Analytics and Performance Tracking</h2>
    
    <h3>Key Metrics to Monitor</h3>
    
    <h4>Awareness Metrics</h4>
    <ul>
    <li><strong>Reach:</strong> How many people saw your content</li>
    <li><strong>Impressions:</strong> Total number of times content was displayed</li>
    <li><strong>Follower growth:</strong> Rate of audience expansion</li>
    </ul>
    
    <h4>Engagement Metrics</h4>
    <ul>
    <li><strong>Engagement rate:</strong> Likes, comments, shares per post</li>
    <li><strong>Click-through rate:</strong> Clicks on links or CTAs</li>
    <li><strong>Save/share rate:</strong> Content deemed valuable enough to save</li>
    </ul>
    
    <h4>Conversion Metrics</h4>
    <ul>
    <li><strong>Website traffic:</strong> Visitors from social media</li>
    <li><strong>Lead generation:</strong> Email signups, form submissions</li>
    <li><strong>Sales attribution:</strong> Revenue directly from social media</li>
    </ul>
    
    <h2>Common Mistakes to Avoid</h2>
    
    <h3>1. Being on Every Platform</h3>
    <p>Focus on 2-3 platforms where your audience is most active rather than spreading yourself thin across all platforms.</p>
    
    <h3>2. Inconsistent Posting</h3>
    <p>Irregular posting confuses algorithms and audiences. Maintain a consistent schedule, even if it's just 3 times per week.</p>
    
    <h3>3. Ignoring Engagement</h3>
    <p>Social media is social. Respond to comments, engage with your audience, and participate in conversations.</p>
    
    <h3>4. Over-Promoting</h3>
    <p>Constantly selling will drive followers away. Focus on providing value and building relationships.</p>
    
    <h3>5. Not Tracking Results</h3>
    <p>Without analytics, you're flying blind. Regularly review your performance and adjust strategies accordingly.</p>
    
    <h2>Conclusion</h2>
    <p>Social media marketing for small businesses doesn't have to be overwhelming or expensive. By focusing on your audience, choosing the right platforms, creating valuable content, and consistently engaging with your community, you can build a strong social media presence that drives real business results.</p>
    
    <p>Remember, social media success doesn't happen overnight. It requires patience, consistency, and a willingness to adapt based on what your audience responds to. Start with the basics, measure your results, and gradually expand your efforts as you see what works best for your business.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    author: {
      name: "Neha Gupta",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      bio: "Social Media Marketing Expert helping small businesses grow their online presence and engagement"
    },
    category: "Social Media",
    tags: ["social media marketing", "small business", "content strategy", "facebook marketing", "instagram marketing", "community building"],
    status: "published",
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date("2024-01-25"),
    readTime: 18,
    views: 3200,
    likes: 245
  }
];

const testimonials = [
  {
    client: {
      name: 'Rajesh Kumar',
      position: 'CEO',
      company: 'TechStart Solutions',
      avatar: '/uploads/avatars/rajesh-kumar.jpg',
      companyLogo: '/uploads/logos/techstart-solutions.png'
    },
    quote: 'Vigyapana transformed our online presence completely. Their SEO strategies increased our organic traffic by 400% in just 6 months.',
    rating: 5,
    service: 'SEO & Performance Marketing',
    isPublished: true,
    isFeatured: true,
    order: 1,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['seo', 'b2b', 'saas']
  },
  {
    client: {
      name: 'Priya Sharma',
      position: 'Marketing Director',
      company: 'Fashion Forward',
      avatar: '/uploads/avatars/priya-sharma.jpg',
      companyLogo: '/uploads/logos/fashion-forward.png'
    },
    quote: 'The website they built for us is not just beautiful, but also converts amazingly well. Our online sales have tripled since the launch.',
    rating: 5,
    service: 'Web Development',
    isPublished: true,
    isFeatured: true,
    order: 2,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['web-development', 'e-commerce', 'fashion']
  },
  {
    client: {
      name: 'Amit Patel',
      position: 'Founder',
      company: 'Green Earth NGO',
      avatar: '/uploads/avatars/amit-patel.jpg',
      companyLogo: '/uploads/logos/green-earth-ngo.png'
    },
    quote: 'Their social media strategy helped us reach thousands of supporters and significantly increase our donation campaigns effectiveness.',
    rating: 5,
    service: 'Social Media Management',
    isPublished: true,
    isFeatured: false,
    order: 3,
    source: 'google',
    verificationStatus: 'verified',
    tags: ['social-media', 'ngo', 'nonprofit']
  },
  {
    client: {
      name: 'Sarah Johnson',
      position: 'Brand Manager',
      company: 'Wellness Plus',
      avatar: '/uploads/avatars/sarah-johnson.jpg',
      companyLogo: '/uploads/logos/wellness-plus.png'
    },
    quote: 'The UI/UX redesign they did for our app increased user engagement by 250%. The user experience is now seamless and intuitive.',
    rating: 4,
    service: 'UI/UX Design',
    isPublished: true,
    isFeatured: false,
    order: 4,
    source: 'linkedin',
    verificationStatus: 'verified',
    tags: ['ui-ux', 'mobile-app', 'healthcare']
  },
  {
    client: {
      name: 'Michael Chen',
      position: 'Startup Founder',
      company: 'InnovateLab',
      avatar: '/uploads/avatars/michael-chen.jpg'
    },
    quote: 'Their digital strategy consulting helped us identify key growth opportunities and optimize our marketing spend for better ROI.',
    rating: 5,
    service: 'Digital Strategy',
    isPublished: true,
    isFeatured: false,
    order: 5,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['strategy', 'startup', 'consulting']
  }
];

const sampleContacts = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567',
    company: 'Tech Innovations Inc.',
    industry: 'Technology',
    designation: 'CEO',
    subject: 'SEO Services Inquiry',
    message: 'We are looking to improve our search engine rankings and increase organic traffic. Would like to discuss your SEO services.',
    serviceInterest: ['SEO & Performance Marketing'],
    budget: '$15,000 - $50,000',
    timeline: 'Within 3 months',
    status: 'new',
    priority: 'high',
    source: 'Website'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@fashionbrand.com',
    phone: '+1-555-987-6543',
    company: 'Fashion Brand Co.',
    industry: 'Retail',
    designation: 'Marketing Manager',
    subject: 'Website Development Project',
    message: 'We need a complete website redesign with e-commerce functionality. Looking for a modern, responsive design that converts well.',
    serviceInterest: ['Web Development', 'UI/UX Design'],
    budget: '$15,000 - $50,000',
    timeline: 'Within 6 months',
    status: 'contacted',
    priority: 'medium',
    source: 'Google Search'
  },
  {
    name: 'Robert Wilson',
    email: 'robert@localrestaurant.com',
    phone: '+1-555-456-7890',
    company: 'Local Restaurant Group',
    industry: 'Hospitality',
    designation: 'Owner',
    subject: 'Social Media Management',
    message: 'Need help with social media marketing for our restaurant chain. Want to increase local engagement and drive more foot traffic.',
    serviceInterest: ['Social Media Management', 'Content Marketing'],
    budget: '$5,000 - $15,000',
    timeline: 'ASAP',
    status: 'in-progress',
    priority: 'urgent',
    source: 'Referral'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
      Contact.deleteMany({})
    ]);

    // Seed users
    console.log('👥 Seeding users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Seed services
    console.log('🛠️ Seeding services...');
    const createdServices = await Service.create(services);
    console.log(`✅ Created ${createdServices.length} services`);

    // Seed blogs
    console.log('📝 Seeding blogs...');
    const createdBlogs = await Blog.create(blogs);
    console.log(`✅ Created ${createdBlogs.length} blogs`);

    // Seed testimonials
    console.log('💬 Seeding testimonials...');
    const createdTestimonials = await Testimonial.create(testimonials);
    console.log(`✅ Created ${createdTestimonials.length} testimonials`);

    // Seed sample contacts
    console.log('📧 Seeding sample contacts...');
    const createdContacts = await Contact.create(sampleContacts);
    console.log(`✅ Created ${createdContacts.length} sample contacts`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Services: ${createdServices.length}`);
    console.log(`   Blogs: ${createdBlogs.length}`);
    console.log(`   Testimonials: ${createdTestimonials.length}`);
    console.log(`   Sample Contacts: ${createdContacts.length}`);
    
    console.log('\n🔑 Admin Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@vigyapana.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Main function
const main = async () => {
  try {
    await connectDB();
    await seedDatabase();
    console.log('\n✨ Seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run the seeding
main();

export default seedDatabase;
