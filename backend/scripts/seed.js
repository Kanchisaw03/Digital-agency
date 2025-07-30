import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import User from '../models/User.js';
import Service from '../models/Service.js';
import CaseStudy from '../models/CaseStudy.js';
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
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
    isActive: true,
  },
  {
    name: 'Editor User',
    email: 'editor@vigyapana.com',
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
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'WordPress'],
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    title: 'UI/UX Design',
    description: 'Design user-centered experiences that delight customers and drive engagement through intuitive interfaces.',
    detailedDescription: 'Our UI/UX design process focuses on understanding your users and creating interfaces that are both beautiful and functional. We use research-driven design methodologies to ensure every interaction is meaningful.',
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
      startingPrice: 2000,
      currency: 'USD',
      pricingModel: 'project-based'
    },
    stats: {
      completedProjects: 67,
      clientsSatisfied: 63,
      averageImprovement: '180% increase in user engagement'
    },
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision'],
    isActive: true,
    isFeatured: false,
    order: 3
  },
  {
    title: 'Social Media Management',
    description: 'Build and engage your community across all social platforms with strategic content and community management.',
    detailedDescription: 'Our social media management services help you build authentic relationships with your audience. We create engaging content, manage your community, and track performance across all major social platforms.',
    category: 'Social Media Management',
    features: [
      'Content Strategy',
      'Social Media Posting',
      'Community Management',
      'Influencer Partnerships',
      'Social Advertising',
      'Analytics & Reporting'
    ],
    pricing: {
      startingPrice: 800,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 124,
      clientsSatisfied: 118,
      averageImprovement: '400% increase in engagement'
    },
    technologies: ['Hootsuite', 'Buffer', 'Canva', 'Facebook Business Manager'],
    isActive: true,
    isFeatured: false,
    order: 4
  },
  {
    title: 'Online Reputation Management',
    description: 'Protect and enhance your brand reputation with proactive monitoring and strategic response management.',
    detailedDescription: 'Our reputation management services help you monitor, manage, and improve your online presence. We track mentions across the web and implement strategies to build and maintain a positive brand image.',
    category: 'Online Reputation Management',
    features: [
      'Reputation Monitoring',
      'Review Management',
      'Crisis Response',
      'Brand Mention Tracking',
      'Sentiment Analysis',
      'Content Strategy'
    ],
    pricing: {
      startingPrice: 1200,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 78,
      clientsSatisfied: 74,
      averageImprovement: '95% positive sentiment score'
    },
    technologies: ['Brand24', 'Mention', 'Google Alerts', 'ReviewTrackers'],
    isActive: true,
    isFeatured: false,
    order: 5
  },
  {
    title: 'Fraud Detection & Review Management',
    description: 'Protect your business from fraudulent activities and manage your online reviews effectively.',
    detailedDescription: 'Our advanced fraud detection and review management system helps businesses identify suspicious activities and manage their online reputation through automated monitoring and response systems.',
    category: 'Fraud Detection & Review Management',
    features: [
      'Fraud Detection Algorithms',
      'Review Monitoring',
      'Automated Alerts',
      'Response Management',
      'Analytics Dashboard',
      'API Integration'
    ],
    pricing: {
      startingPrice: 2500,
      currency: 'USD',
      pricingModel: 'monthly'
    },
    stats: {
      completedProjects: 34,
      clientsSatisfied: 32,
      averageImprovement: '6,500+ fraud attempts blocked'
    },
    technologies: ['Machine Learning', 'Python', 'TensorFlow', 'API Integration'],
    isActive: true,
    isFeatured: true,
    order: 6
  }
];

const caseStudies = [
  {
    title: 'Axis Bank Digital Transformation',
    client: {
      name: 'Axis Bank',
      logo: '/uploads/logos/axis-bank.png',
      website: 'https://axisbank.com',
      industry: 'Finance'
    },
    description: 'Complete digital transformation resulting in 312% increase in qualified leads and improved customer engagement.',
    challenge: 'Axis Bank needed to modernize their digital presence and improve lead generation through their online channels. Their existing website had poor conversion rates and limited mobile optimization.',
    solution: 'We implemented a comprehensive digital strategy including website redesign, SEO optimization, performance marketing campaigns, and advanced analytics tracking. The new platform featured improved UX, faster load times, and better mobile experience.',
    results: [
      {
        metric: 'Lead Generation',
        value: '312%',
        improvement: 'increase'
      },
      {
        metric: 'Mobile Conversions',
        value: '450%',
        improvement: 'increase'
      },
      {
        metric: 'Page Load Speed',
        value: '60%',
        improvement: 'faster'
      }
    ],
    services: ['Web Development', 'SEO & Performance Marketing', 'UI/UX Design'],
    technologies: ['React', 'Node.js', 'Google Analytics', 'Google Ads'],
    duration: '6 months',
    timeline: {
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-07-15')
    },
    tags: ['finance', 'digital-transformation', 'lead-generation'],
    isPublished: true,
    isFeatured: true,
    viewCount: 1247,
    order: 1,
    seo: {
      slug: 'axis-bank-digital-transformation',
      metaTitle: 'Axis Bank Case Study - 312% Lead Increase | Vigyapana',
      metaDescription: 'See how we helped Axis Bank achieve 312% increase in leads through digital transformation.',
      keywords: ['axis bank', 'digital transformation', 'lead generation', 'case study']
    }
  },
  {
    title: 'Airtel Customer Engagement Boost',
    client: {
      name: 'Airtel',
      logo: '/uploads/logos/airtel.png',
      website: 'https://airtel.in',
      industry: 'Technology'
    },
    description: 'Enhanced customer engagement platform resulting in 356% increase in customer calls and improved service delivery.',
    challenge: 'Airtel wanted to improve customer engagement and reduce response times for customer service inquiries. Their existing platform had limited automation and poor user experience.',
    solution: 'We developed a comprehensive customer engagement platform with AI-powered chatbots, automated call routing, and improved self-service options. The solution included mobile optimization and real-time analytics.',
    results: [
      {
        metric: 'Customer Calls',
        value: '356%',
        improvement: 'increase'
      },
      {
        metric: 'Response Time',
        value: '70%',
        improvement: 'reduction'
      },
      {
        metric: 'Customer Satisfaction',
        value: '85%',
        improvement: 'increase'
      }
    ],
    services: ['Web Development', 'UI/UX Design', 'Digital Strategy'],
    technologies: ['React', 'AI/ML', 'MongoDB', 'AWS'],
    duration: '8 months',
    timeline: {
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-11-01')
    },
    tags: ['telecommunications', 'customer-engagement', 'ai'],
    isPublished: true,
    isFeatured: true,
    viewCount: 892,
    order: 2,
    seo: {
      slug: 'airtel-customer-engagement-boost',
      metaTitle: 'Airtel Case Study - 356% Call Increase | Vigyapana',
      metaDescription: 'Discover how we helped Airtel achieve 356% increase in customer calls through platform optimization.',
      keywords: ['airtel', 'customer engagement', 'telecommunications', 'case study']
    }
  },
  {
    title: 'JM Financial Fraud Prevention System',
    client: {
      name: 'JM Financial',
      logo: '/uploads/logos/jm-financial.png',
      website: 'https://jmfinancial.in',
      industry: 'Finance'
    },
    description: 'Advanced fraud detection system that successfully identified and prevented over 6,500 fraudulent attempts.',
    challenge: 'JM Financial needed a robust fraud detection system to protect their clients from online financial fraud. Their existing security measures were insufficient for the growing threats.',
    solution: 'We implemented an advanced machine learning-based fraud detection system with real-time monitoring, automated alerts, and comprehensive analytics dashboard. The system includes behavioral analysis and pattern recognition.',
    results: [
      {
        metric: 'Fraud Prevention',
        value: '6,500+',
        improvement: 'attempts blocked'
      },
      {
        metric: 'False Positives',
        value: '85%',
        improvement: 'reduction'
      },
      {
        metric: 'Detection Speed',
        value: '95%',
        improvement: 'faster'
      }
    ],
    services: ['Fraud Detection & Review Management', 'Web Development'],
    technologies: ['Machine Learning', 'Python', 'TensorFlow', 'Real-time Analytics'],
    duration: '10 months',
    timeline: {
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-12-01')
    },
    tags: ['finance', 'fraud-detection', 'machine-learning', 'security'],
    isPublished: true,
    isFeatured: true,
    viewCount: 1156,
    order: 3,
    seo: {
      slug: 'jm-financial-fraud-prevention-system',
      metaTitle: 'JM Financial Case Study - 6,500+ Fraud Attempts Blocked | Vigyapana',
      metaDescription: 'Learn how our fraud detection system helped JM Financial block over 6,500 fraudulent attempts.',
      keywords: ['jm financial', 'fraud detection', 'machine learning', 'case study']
    }
  }
];

const testimonials = [
  {
    client: {
      name: 'Rajesh Kumar',
      position: 'Digital Marketing Head',
      company: 'Axis Bank',
      avatar: '/uploads/avatars/rajesh-kumar.jpg',
      companyLogo: '/uploads/logos/axis-bank.png'
    },
    quote: 'Vigyapana transformed our digital presence completely. The 312% increase in leads exceeded all our expectations. Their team understands the financial sector and delivers results.',
    rating: 5,
    service: 'SEO & Performance Marketing',
    isPublished: true,
    isFeatured: true,
    order: 1,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['finance', 'lead-generation', 'seo']
  },
  {
    client: {
      name: 'Priya Sharma',
      position: 'Customer Experience Manager',
      company: 'Airtel',
      avatar: '/uploads/avatars/priya-sharma.jpg',
      companyLogo: '/uploads/logos/airtel.png'
    },
    quote: 'The customer engagement platform developed by Vigyapana has revolutionized how we interact with our customers. The 356% increase in calls shows the real impact of their work.',
    rating: 5,
    service: 'Web Development',
    isPublished: true,
    isFeatured: true,
    order: 2,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['telecommunications', 'customer-engagement', 'web-development']
  },
  {
    client: {
      name: 'Amit Patel',
      position: 'Chief Technology Officer',
      company: 'JM Financial',
      avatar: '/uploads/avatars/amit-patel.jpg',
      companyLogo: '/uploads/logos/jm-financial.png'
    },
    quote: 'The fraud detection system has been a game-changer for us. Blocking over 6,500 fraud attempts while reducing false positives by 85% - simply outstanding work.',
    rating: 5,
    service: 'Fraud Detection & Review Management',
    isPublished: true,
    isFeatured: true,
    order: 3,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['finance', 'fraud-detection', 'security']
  },
  {
    client: {
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      company: 'TechCorp Solutions',
      avatar: '/uploads/avatars/sarah-johnson.jpg'
    },
    quote: 'Working with Vigyapana was an absolute pleasure. They delivered a beautiful, functional website that perfectly represents our brand. Highly recommended!',
    rating: 5,
    service: 'UI/UX Design',
    isPublished: true,
    isFeatured: false,
    order: 4,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['design', 'branding', 'website']
  },
  {
    client: {
      name: 'Michael Chen',
      position: 'Founder',
      company: 'StartupXYZ',
      avatar: '/uploads/avatars/michael-chen.jpg'
    },
    quote: 'Their social media management services helped us grow our following by 400%. The content strategy and community engagement are top-notch.',
    rating: 4,
    service: 'Social Media Management',
    isPublished: true,
    isFeatured: false,
    order: 5,
    source: 'direct',
    verificationStatus: 'verified',
    tags: ['social-media', 'startup', 'growth']
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
    email: 'jane.smith@example.com',
    phone: '+1-555-987-6543',
    company: 'E-commerce Plus',
    industry: 'E-commerce',
    designation: 'Marketing Manager',
    subject: 'Website Redesign Project',
    message: 'Our current website needs a complete overhaul. Looking for a modern, responsive design with better user experience.',
    serviceInterest: ['Web Development', 'UI/UX Design'],
    budget: '$50,000 - $100,000',
    timeline: 'Within 6 months',
    status: 'contacted',
    priority: 'medium',
    source: 'Google Search'
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phone: '+1-555-456-7890',
    company: 'Financial Services Co.',
    industry: 'Finance',
    designation: 'IT Director',
    subject: 'Fraud Detection System',
    message: 'We need a robust fraud detection system for our online banking platform. Looking for ML-based solutions.',
    serviceInterest: ['Fraud Detection & Review Management'],
    budget: 'Over $100,000',
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
      CaseStudy.deleteMany({}),
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

    // Seed case studies
    console.log('📊 Seeding case studies...');
    const createdCaseStudies = await CaseStudy.create(caseStudies);
    console.log(`✅ Created ${createdCaseStudies.length} case studies`);

    // Link testimonials to case studies
    const updatedTestimonials = testimonials.map((testimonial, index) => {
      if (createdCaseStudies[index]) {
        testimonial.project = createdCaseStudies[index]._id;
      }
      return testimonial;
    });

    // Seed testimonials
    console.log('💬 Seeding testimonials...');
    const createdTestimonials = await Testimonial.create(updatedTestimonials);
    console.log(`✅ Created ${createdTestimonials.length} testimonials`);

    // Seed sample contacts
    console.log('📧 Seeding sample contacts...');
    const createdContacts = await Contact.create(sampleContacts);
    console.log(`✅ Created ${createdContacts.length} sample contacts`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Services: ${createdServices.length}`);
    console.log(`   Case Studies: ${createdCaseStudies.length}`);
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

// Main execution
const main = async () => {
  try {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run if this file is executed directly
if (process.argv[1] === __filename) {
  main();
}

export default seedDatabase; 