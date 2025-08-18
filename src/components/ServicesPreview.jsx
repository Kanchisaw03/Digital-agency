import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GlobeAltIcon, 
  MegaphoneIcon, 
  HeartIcon,
  VideoCameraIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ServicesPreview() {
  const featuredServices = [
    {
      title: 'Web Solutions',
      description: 'Custom websites and payment integrations',
      icon: GlobeAltIcon,
      color: 'blue',
      features: ['Website Development', 'Razorpay Integration'],
      gradient: 'from-blue-500 to-blue-600',
      services: [
        { name: 'Website Development', id: 'website-development' },
        { name: 'Razorpay Integration', id: 'razorpay-integration' }
      ]
    },
    {
      title: 'Digital Marketing',
      description: 'Meta ads, social media, and growth strategies',
      icon: MegaphoneIcon,
      color: 'orange',
      features: ['Meta Ad Marketing', 'Social Media Handling'],
      gradient: 'from-orange-500 to-red-500',
      services: [
        { name: 'Meta Ad Marketing', id: 'meta-ad-marketing' },
        { name: 'Social Media Handling', id: 'social-media-handling' }
      ]
    },
    {
      title: 'NGO Support',
      description: 'Fundraising and donor relationship management',
      icon: HeartIcon,
      color: 'pink',
      features: ['Donor Management', 'Fundraising Support'],
      gradient: 'from-pink-500 to-rose-500',
      services: [
        { name: 'Donor Relationship Management', id: 'donor-relationship-management' }
      ]
    },
    {
      title: 'Media & Content',
      description: 'Professional video production and editing',
      icon: VideoCameraIcon,
      color: 'purple',
      features: ['Video Shoots', 'Professional Editing'],
      gradient: 'from-purple-500 to-indigo-500',
      services: [
        { name: 'Video Shoot', id: 'video-shoot' },
        { name: 'Video Editing', id: 'video-editing' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.section 
      className="py-20 bg-gray-50 dark:bg-dark transition-colors duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          variants={titleVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>
        
        <motion.p
          variants={titleVariants}
          className="text-lg text-gray-700 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
        >
          Comprehensive digital solutions for individuals and NGOs with transparent pricing and special discounts
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features as Links */}
                <div className="space-y-2">
                  {service.services.slice(0, 2).map((serviceItem, featureIndex) => (
                    <Link 
                      key={featureIndex}
                      to={`/services/detail/${serviceItem.id}`}
                      className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group/link"
                    >
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
                      <span className="group-hover/link:underline">{serviceItem.name}</span>
                      <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`h-1 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Pricing Note */}
        <motion.div
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full">
            <HeartIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Special NGO Discounts: 20-30% OFF
            </span>
          </div>
        </motion.div>

        {/* View All Services Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="/services"
            className="inline-flex items-center bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30 transition-all duration-300 group"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Services & Pricing</span>
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}