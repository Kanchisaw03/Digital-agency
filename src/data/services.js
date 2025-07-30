export const servicesData = [
  {
    slug: "website-development",
    title: "Custom Website Development",
    tagline: "Fast, scalable websites tailored to your brand.",
    description: "We craft stunning, responsive websites that drive conversions and deliver exceptional user experiences. From concept to launch, we build digital solutions that grow with your business.",
    bullets: [
      "Custom responsive design",
      "Performance optimization",
      "SEO-friendly architecture",
      "CMS integration",
      "E-commerce functionality",
      "Progressive Web Apps (PWA)"
    ],
    image: "/images/webdev.svg",
    accentColor: "#6366F1",
    stats: {
      projectsCompleted: 150,
      avgLoadTime: "1.2s",
      clientSatisfaction: "98%"
    },
    process: [
      { step: "Discovery & Strategy", description: "Understanding your goals and target audience" },
      { step: "Design & Prototyping", description: "Creating wireframes and visual designs" },
      { step: "Development", description: "Building with modern technologies and best practices" },
      { step: "Testing & Launch", description: "Thorough testing and smooth deployment" },
      { step: "Maintenance & Support", description: "Ongoing updates and technical support" }
    ],
    benefits: [
      "Increased conversion rates",
      "Better search rankings",
      "Enhanced user experience",
      "Mobile-first approach"
    ],
    pricing: {
      currency: "$",
      popular: "Professional",
      tiers: [
        {
          name: "Starter",
          price: 2499,
          duration: "project",
          description: "Perfect for small businesses and startups",
          features: [
            "Up to 5 pages",
            "Responsive design",
            "Basic SEO setup",
            "Contact form",
            "2 rounds of revisions",
            "30 days support"
          ],
          highlights: ["Quick turnaround", "Budget-friendly"]
        },
        {
          name: "Professional",
          price: 4999,
          duration: "project",
          description: "Ideal for growing businesses",
          features: [
            "Up to 15 pages",
            "Custom design",
            "Advanced SEO",
            "CMS integration",
            "E-commerce ready",
            "Analytics setup",
            "5 rounds of revisions",
            "90 days support"
          ],
          highlights: ["Most Popular", "Best Value"]
        },
        {
          name: "Enterprise",
          price: 9999,
          duration: "project",
          description: "For large businesses and complex projects",
          features: [
            "Unlimited pages",
            "Premium design",
            "Advanced functionality",
            "Custom integrations",
            "Performance optimization",
            "Security hardening",
            "Unlimited revisions",
            "1 year support"
          ],
          highlights: ["Premium features", "Priority support"]
        }
      ]
    }
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Development",
    tagline: "Sell smarter with Shopify & WooCommerce.",
    description: "Transform your business with powerful e-commerce solutions. We build online stores that convert visitors into customers with seamless shopping experiences and robust payment systems.",
    bullets: [
      "Shopify & WooCommerce expertise",
      "Payment gateway integration",
      "Inventory management systems",
      "Multi-currency support",
      "Advanced analytics",
      "Mobile commerce optimization"
    ],
    image: "/images/ecommerce.svg",
    accentColor: "#EC4899",
    stats: {
      storesBuilt: 85,
      avgRevenue: "+250%",
      cartAbandonment: "-35%"
    },
    process: [
      { step: "Business Analysis", description: "Analyzing your products and sales strategy" },
      { step: "Platform Selection", description: "Choosing the best e-commerce platform" },
      { step: "Store Development", description: "Building custom features and integrations" },
      { step: "Payment Setup", description: "Configuring secure payment processing" },
      { step: "Launch & Optimization", description: "Going live and continuous improvements" }
    ],
    benefits: [
      "Streamlined checkout process",
      "Increased online sales",
      "Better inventory control",
      "Enhanced customer insights"
    ],
    pricing: {
      currency: "$",
      popular: "Growth",
      tiers: [
        {
          name: "Starter Store",
          price: 3999,
          duration: "project",
          description: "Launch your online store quickly",
          features: [
            "Up to 50 products",
            "Basic store design",
            "Payment gateway setup",
            "Mobile responsive",
            "Basic analytics",
            "60 days support"
          ],
          highlights: ["Quick setup", "Essential features"]
        },
        {
          name: "Growth",
          price: 7999,
          duration: "project",
          description: "Scale your e-commerce business",
          features: [
            "Up to 500 products",
            "Custom store design",
            "Advanced payment options",
            "Inventory management",
            "Marketing tools",
            "SEO optimization",
            "Advanced analytics",
            "120 days support"
          ],
          highlights: ["Most Popular", "Complete solution"]
        },
        {
          name: "Enterprise",
          price: 15999,
          duration: "project",
          description: "Full-scale e-commerce platform",
          features: [
            "Unlimited products",
            "Custom functionality",
            "Multi-store setup",
            "Advanced integrations",
            "Performance optimization",
            "Security features",
            "Custom reporting",
            "1 year support"
          ],
          highlights: ["Enterprise grade", "Custom solutions"]
        }
      ]
    }
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    tagline: "Get found by the right people.",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies. We help businesses rank higher and attract qualified leads through proven optimization techniques.",
    bullets: [
      "Technical SEO audits",
      "Keyword research & planning",
      "Content optimization",
      "Local SEO strategies",
      "Backlink building",
      "Performance monitoring"
    ],
    image: "/images/seo.svg",
    accentColor: "#38BDF8",
    stats: {
      keywordsRanked: 2500,
      avgTraffic: "+180%",
      rankingImprovement: "85%"
    },
    process: [
      { step: "SEO Audit", description: "Comprehensive analysis of current performance" },
      { step: "Strategy Development", description: "Creating targeted optimization plan" },
      { step: "On-Page Optimization", description: "Optimizing content and technical elements" },
      { step: "Content Creation", description: "Developing SEO-focused content" },
      { step: "Monitoring & Reporting", description: "Tracking progress and adjusting strategy" }
    ],
    benefits: [
      "Higher search rankings",
      "Increased organic traffic",
      "Better user engagement",
      "Long-term growth"
    ],
    pricing: {
      currency: "$",
      popular: "Professional",
      tiers: [
        {
          name: "Basic",
          price: 899,
          duration: "month",
          description: "Essential SEO for small businesses",
          features: [
            "Keyword research (10 keywords)",
            "On-page optimization",
            "Monthly reporting",
            "Basic link building",
            "Local SEO setup"
          ],
          highlights: ["Great start", "Affordable"]
        },
        {
          name: "Professional",
          price: 1899,
          duration: "month",
          description: "Comprehensive SEO strategy",
          features: [
            "Keyword research (25 keywords)",
            "Technical SEO audit",
            "Content optimization",
            "Advanced link building",
            "Competitor analysis",
            "Monthly strategy calls",
            "Detailed reporting"
          ],
          highlights: ["Most Popular", "Best ROI"]
        },
        {
          name: "Enterprise",
          price: 3999,
          duration: "month",
          description: "Advanced SEO for large websites",
          features: [
            "Unlimited keywords",
            "Full technical optimization",
            "Content strategy",
            "PR & outreach",
            "Advanced analytics",
            "Weekly reporting",
            "Dedicated account manager"
          ],
          highlights: ["Premium service", "Maximum results"]
        }
      ]
    }
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Grow your brand across all channels.",
    description: "Amplify your online presence with data-driven marketing strategies. From social media management to PPC campaigns, we help businesses reach their target audience and achieve measurable results.",
    bullets: [
      "Social media marketing",
      "Google Ads & PPC campaigns",
      "Email marketing automation",
      "Content marketing strategy",
      "Conversion rate optimization",
      "Analytics & reporting"
    ],
    image: "/images/marketing.svg",
    accentColor: "#F59E0B",
    stats: {
      campaignsRun: 200,
      avgROI: "420%",
      leadGeneration: "+300%"
    },
    process: [
      { step: "Market Research", description: "Understanding your audience and competitors" },
      { step: "Strategy Planning", description: "Developing multi-channel marketing plan" },
      { step: "Campaign Creation", description: "Building compelling marketing campaigns" },
      { step: "Execution", description: "Launching and managing campaigns" },
      { step: "Optimization", description: "Continuous improvement based on data" }
    ],
    benefits: [
      "Increased brand awareness",
      "Higher quality leads",
      "Better customer retention",
      "Measurable ROI"
    ],
    pricing: {
      currency: "$",
      popular: "Growth",
      tiers: [
        {
          name: "Starter",
          price: 1299,
          duration: "month",
          description: "Essential marketing for small businesses",
          features: [
            "Social media management",
            "Basic PPC campaigns",
            "Email marketing setup",
            "Monthly reporting",
            "2 platforms"
          ],
          highlights: ["Get started", "Core channels"]
        },
        {
          name: "Growth",
          price: 2799,
          duration: "month",
          description: "Comprehensive marketing strategy",
          features: [
            "Multi-platform campaigns",
            "Advanced PPC management",
            "Email automation",
            "Content creation",
            "Landing page optimization",
            "Bi-weekly strategy calls",
            "Detailed analytics"
          ],
          highlights: ["Most Popular", "Complete package"]
        },
        {
          name: "Scale",
          price: 5999,
          duration: "month",
          description: "Full-service marketing for growth",
          features: [
            "Omnichannel campaigns",
            "Advanced automation",
            "Custom integrations",
            "Video marketing",
            "Influencer partnerships",
            "Weekly optimization",
            "Dedicated team"
          ],
          highlights: ["Premium service", "Maximum reach"]
        }
      ]
    }
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Automation",
    tagline: "Intelligent automation that works 24/7.",
    description: "Transform your business operations with custom AI agents that handle customer service, lead generation, data analysis, and workflow automation. Our intelligent solutions learn from your business to deliver personalized experiences at scale.",
    bullets: [
      "Custom AI chatbots & virtual assistants",
      "Automated lead qualification & nurturing",
      "Intelligent data processing & analysis",
      "Multi-platform AI integration",
      "Natural language processing",
      "24/7 customer support automation"
    ],
    image: "/images/ai-agents.svg",
    accentColor: "#8B5CF6",
    stats: {
      botsDeployed: 120,
      avgResponseTime: "0.3s",
      automationSavings: "65%"
    },
    process: [
      { step: "Business Analysis", description: "Understanding your workflow and automation opportunities" },
      { step: "AI Strategy Design", description: "Creating custom AI agent architecture and capabilities" },
      { step: "Development & Training", description: "Building and training AI models with your business data" },
      { step: "Integration & Testing", description: "Seamlessly integrating AI agents into your existing systems" },
      { step: "Optimization & Support", description: "Continuous learning and performance improvement" }
    ],
    benefits: [
      "Reduced operational costs",
      "24/7 availability",
      "Improved customer satisfaction",
      "Increased lead conversion"
    ],
    pricing: {
      currency: "$",
      popular: "Business",
      tiers: [
        {
          name: "Starter Bot",
          price: 1999,
          duration: "month",
          description: "Basic AI chatbot for customer support",
          features: [
            "Simple Q&A chatbot",
            "Basic NLP training",
            "1 platform integration",
            "Monthly updates",
            "Email support"
          ],
          highlights: ["AI-powered", "Easy start"]
        },
        {
          name: "Business",
          price: 4999,
          duration: "month",
          description: "Advanced AI agents for business automation",
          features: [
            "Multi-function AI agents",
            "Advanced NLP & ML",
            "3+ platform integrations",
            "Lead qualification",
            "Data analysis tools",
            "Weekly optimization",
            "Priority support"
          ],
          highlights: ["Most Popular", "Complete automation"]
        },
        {
          name: "Enterprise",
          price: 9999,
          duration: "month",
          description: "Custom AI solutions for large organizations",
          features: [
            "Custom AI development",
            "Unlimited integrations",
            "Advanced analytics",
            "White-label solutions",
            "24/7 monitoring",
            "Dedicated AI team",
            "Custom training"
          ],
          highlights: ["Enterprise grade", "Custom solutions"]
        }
      ]
    }
  }
];

export const getServiceBySlug = (slug) => {
  return servicesData.find(service => service.slug === slug);
};

export const getAllServices = () => {
  return servicesData;
}; 