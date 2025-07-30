import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { getAllServices } from '../data/services';

export default function ServicesPreview() {
  // Get the first 4 services for the home page preview
  const featuredServices = getAllServices().slice(0, 4);

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
          className="text-lg text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto"
        >
          Professional digital solutions to grow your business
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <ServiceCard 
              key={service.slug}
              service={service} 
              index={index} 
            />
          ))}
        </div>

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
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 group"
            whileHover={{ y: -2 }}
          >
            <span className="font-medium">View All Services</span>
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