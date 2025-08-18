export const servicesData = [
  // Web Solutions
  {
    id: 'website-development',
    name: 'Website Development',
    category: 'Web Solutions',
    categoryColor: 'blue',
    shortDescription: 'Custom scoped website development tailored to your needs',
    detailedDescription: 'Transform your digital presence with our comprehensive website development service. We create custom, responsive websites that are perfectly tailored to your specific requirements and business goals. From simple landing pages to complex web applications, our development process ensures your website is fast, secure, and optimized for search engines.',
    basePrice: null, // Custom pricing
    pricing: 'custom',
    features: [
      'Responsive Design (Mobile, Tablet, Desktop)',
      'SEO Optimized Structure',
      'Custom Functionality Development',
      'Content Management System Integration',
      'Performance Optimization',
      'Security Implementation',
      'Cross-browser Compatibility',
      'Analytics Integration'
    ],
    includes: [
      'Initial consultation and requirement analysis',
      'Custom design mockups and wireframes',
      'Frontend and backend development',
      'Testing across multiple devices and browsers',
      'Basic SEO setup and optimization',
      '30 days of post-launch support',
      'Training for content management',
      'Documentation and handover'
    ],
    timeline: '2-8 weeks (depending on complexity)',
    deliverables: [
      'Fully functional website',
      'Source code and documentation',
      'Admin panel access',
      'Analytics setup',
      'Basic SEO configuration'
    ]
  },
  {
    id: 'razorpay-integration',
    name: 'Razorpay Integration',
    category: 'Web Solutions',
    categoryColor: 'blue',
    shortDescription: 'Seamless payment gateway integration for your website',
    detailedDescription: 'Enable secure online payments on your website with our professional Razorpay integration service. We handle the complete setup process, from account creation to testing, ensuring your customers can make payments safely and efficiently. Perfect for e-commerce sites, donation platforms, and service booking systems.',
    basePrice: 3000,
    pricing: 'one-time',
    features: [
      'Payment Gateway Setup',
      'Multiple Payment Methods Support',
      'Testing & Validation',
      'Security Implementation',
      'Mobile-Optimized Checkout',
      'Documentation',
      'Basic Support'
    ],
    includes: [
      'Razorpay account setup assistance',
      'Integration with your existing website',
      'Payment form customization',
      'Test transaction validation',
      'Live payment gateway activation',
      'Basic webhook configuration',
      'Payment confirmation emails setup',
      '15 days of technical support'
    ],
    timeline: '3-5 business days',
    deliverables: [
      'Fully integrated payment system',
      'Test payment confirmations',
      'Integration documentation',
      'Admin dashboard access',
      'Payment tracking setup'
    ],
    notes: ['Razorpay account registration required', 'Business documents needed for activation']
  },
  
  // Digital Marketing
  {
    id: 'meta-ad-account-setup',
    name: 'Meta Ad Account Setup',
    category: 'Digital Marketing',
    categoryColor: 'orange',
    shortDescription: 'Professional setup and configuration of your Meta advertising account',
    detailedDescription: 'Get your Meta (Facebook & Instagram) advertising off to the perfect start with our comprehensive account setup service. We configure your Business Manager, create optimized ad accounts, set up tracking pixels, and establish proper audience targeting foundations. This service ensures your advertising campaigns start with the best possible foundation for success.',
    basePrice: 8000,
    pricing: 'one-time',
    features: [
      'Business Manager Configuration',
      'Ad Account Setup',
      'Pixel Installation & Setup',
      'Audience Creation',
      'Campaign Structure Planning',
      'Conversion Tracking Setup',
      'Basic Campaign Templates',
      'Account Optimization'
    ],
    includes: [
      'Meta Business Manager setup',
      'Ad account creation and configuration',
      'Facebook and Instagram pixel installation',
      'Custom audience creation (based on your data)',
      'Lookalike audience setup',
      'Conversion tracking configuration',
      'Basic campaign structure templates',
      'Account permissions and user management',
      'Initial account optimization',
      '30 days of setup support'
    ],
    timeline: '5-7 business days',
    deliverables: [
      'Fully configured Meta Business Manager',
      'Active ad account with proper settings',
      'Installed and verified tracking pixels',
      'Custom audience segments',
      'Campaign templates',
      'Setup documentation and guidelines'
    ],
    notes: ['Business verification may be required', 'Access to your website needed for pixel installation']
  },
  {
    id: 'meta-ad-marketing',
    name: 'Meta Ad Marketing',
    category: 'Digital Marketing',
    categoryColor: 'orange',
    shortDescription: 'Complete Meta advertising campaign management and optimization',
    detailedDescription: 'Maximize your return on advertising spend with our comprehensive Meta advertising management service. We handle everything from strategy development to daily optimization, ensuring your Facebook and Instagram campaigns deliver the best possible results. Our data-driven approach focuses on continuous improvement and scaling successful campaigns.',
    basePrice: null, // Percentage-based
    pricing: 'percentage',
    specialPricing: {
      individual: '50% of ad spend',
      'ngo-medium': '40% of ad spend',
      'ngo-large': '30% of ad spend'
    },
    features: [
      'Campaign Strategy Development',
      'Ad Creation & Design',
      'Daily Campaign Optimization',
      'A/B Testing',
      'Audience Research & Targeting',
      'Performance Monitoring',
      'Monthly Reporting',
      'Budget Management'
    ],
    includes: [
      'Comprehensive advertising strategy development',
      'Custom ad creative design and copywriting',
      'Campaign setup and launch',
      'Daily monitoring and optimization',
      'A/B testing of ads, audiences, and placements',
      'Detailed performance tracking and analytics',
      'Monthly strategy review calls',
      'Comprehensive monthly reports',
      'Budget optimization and scaling recommendations',
      'Competitor analysis and insights'
    ],
    timeline: 'Ongoing monthly service',
    deliverables: [
      'Active, optimized ad campaigns',
      'Monthly performance reports',
      'Strategy recommendations',
      'Creative assets',
      'Audience insights'
    ],
    notes: [
      '18% of ad spend + GST as management fee',
      'Minimum ad spend of ₹20,000/month recommended',
      'Ad spend is separate from management fee'
    ],
    expertiseBands: {
      new: '15% service fee',
      medium: '10-12% service fee',
      expert: '8-10% service fee'
    }
  },
  {
    id: 'social-media-handling',
    name: 'Social Media Handling',
    category: 'Digital Marketing',
    categoryColor: 'orange',
    shortDescription: 'Complete social media management and content creation',
    detailedDescription: 'Build and maintain a strong social media presence with our comprehensive social media management service. We handle everything from content creation to community management, ensuring your brand stays active, engaged, and growing across all major social platforms.',
    basePrice: 3000,
    pricing: 'monthly',
    features: [
      'Content Creation & Design',
      'Daily Posting Schedule',
      'Community Management',
      'Hashtag Research & Strategy',
      'Stories & Reels Creation',
      'Analytics & Reporting',
      'Engagement Monitoring',
      'Brand Voice Development'
    ],
    includes: [
      'Custom content calendar creation',
      'Daily posts (images, videos, carousels)',
      'Instagram Stories and Reels',
      'Facebook and Instagram management',
      'Community engagement and response management',
      'Hashtag research and optimization',
      'Monthly analytics reports',
      'Content strategy development',
      'Brand voice guidelines',
      'Competitor analysis'
    ],
    timeline: 'Ongoing monthly service',
    deliverables: [
      '30+ posts per month',
      'Stories and Reels content',
      'Monthly analytics report',
      'Content calendar',
      'Engagement insights'
    ],
    platforms: ['Instagram', 'Facebook', 'LinkedIn (upon request)']
  },
  
  // Fundraising & NGO Support
  {
    id: 'donor-relationship-management',
    name: 'Donor Relationship Management',
    category: 'Fundraising & NGO Support',
    categoryColor: 'pink',
    shortDescription: 'Comprehensive donor management and relationship building system',
    detailedDescription: 'Strengthen your fundraising efforts with our comprehensive donor relationship management service. We help NGOs and non-profits build lasting relationships with donors through systematic communication, personalized outreach, and data-driven insights. Our approach focuses on donor retention, engagement, and sustainable fundraising growth.',
    basePrice: 8999,
    pricing: 'monthly',
    features: [
      'Donor Database Management',
      'Communication Automation',
      'Personalized Outreach',
      'Campaign Tracking',
      'Donation Analytics',
      'Reporting & Insights',
      'Follow-up Systems',
      'Retention Strategies'
    ],
    includes: [
      'Donor database setup and management',
      'Automated email communication sequences',
      'Personalized donor outreach campaigns',
      'Donation tracking and analytics',
      'Monthly fundraising reports',
      'Donor segmentation and targeting',
      'Thank you and follow-up automation',
      'Campaign performance analysis',
      'Donor retention strategies',
      'Monthly strategy consultations'
    ],
    timeline: 'Ongoing monthly service',
    deliverables: [
      'Organized donor database',
      'Automated communication systems',
      'Monthly performance reports',
      'Campaign analytics',
      'Retention insights'
    ],
    idealFor: ['NGOs', 'Non-profits', 'Charitable organizations', 'Social enterprises']
  },
  
  // Media & Content
  {
    id: 'video-shoot',
    name: 'Video Shoot',
    category: 'Media & Content',
    categoryColor: 'purple',
    shortDescription: 'Professional video production services for your brand',
    detailedDescription: 'Create compelling visual content with our professional video production service. From concept development to final delivery, we handle all aspects of video creation including pre-production planning, professional filming, and post-production. Perfect for marketing campaigns, product launches, testimonials, and brand storytelling.',
    basePrice: 10000,
    pricing: 'per-project',
    features: [
      'Pre-production Planning',
      'Professional Equipment',
      'On-location Shooting',
      'Multiple Camera Angles',
      'Professional Lighting',
      'Audio Recording',
      'Raw Footage Delivery',
      'Basic Editing'
    ],
    includes: [
      'Pre-production consultation and planning',
      'Script development assistance',
      'Professional camera equipment (4K capable)',
      'Professional lighting setup',
      'High-quality audio recording',
      'Multiple camera angles (up to 3 cameras)',
      'On-location shooting (within city limits)',
      'Raw footage delivery',
      'Basic color correction',
      '1 round of revisions'
    ],
    timeline: '1-2 weeks (including planning)',
    deliverables: [
      'High-quality video footage',
      'Raw files and edited version',
      'Multiple format exports',
      'Project documentation'
    ],
    notes: [
      'Travel charges extra for outstation shoots',
      'Additional equipment rental if needed',
      'Drone footage available at extra cost'
    ],
    duration: 'Half-day or full-day shoots available'
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    category: 'Media & Content',
    categoryColor: 'purple',
    shortDescription: 'Professional video editing and post-production services',
    detailedDescription: 'Transform your raw footage into polished, professional videos with our comprehensive video editing service. We handle all aspects of post-production including cutting, color correction, audio enhancement, graphics, and final delivery in multiple formats. Perfect for marketing videos, social media content, and corporate communications.',
    basePrice: 4000,
    pricing: 'per-project',
    features: [
      'Professional Video Editing',
      'Color Correction & Grading',
      'Audio Enhancement',
      'Motion Graphics',
      'Text & Title Animation',
      'Transitions & Effects',
      'Multiple Format Export',
      'Revision Rounds'
    ],
    includes: [
      'Professional video editing and cutting',
      'Color correction and grading',
      'Audio enhancement and noise reduction',
      'Basic motion graphics and titles',
      'Transition effects and animations',
      'Music and sound effects integration',
      'Multiple format exports (MP4, MOV, etc.)',
      '2 rounds of revisions',
      'Final delivery in preferred formats',
      'Project file backup'
    ],
    timeline: '3-7 business days',
    deliverables: [
      'Professionally edited video',
      'Multiple format exports',
      'Thumbnail images',
      'Project files (if requested)'
    ],
    videoLength: 'Up to 5 minutes (longer videos quoted separately)',
    notes: [
      'Additional charges for videos longer than 5 minutes',
      'Complex animations quoted separately',
      'Rush delivery available at extra cost'
    ]
  }
];

export const getServiceById = (id) => {
  return servicesData.find(service => service.id === id);
};

export const getServicesByCategory = (category) => {
  return servicesData.filter(service => service.category === category);
};

export const getAllCategories = () => {
  const categories = [...new Set(servicesData.map(service => service.category))];
  return categories;
};
