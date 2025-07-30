import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { getAllServices } from '../data/services';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for filtering (can be expanded later)
  const categories = ['All', 'Development', 'Marketing', 'Optimization', 'AI & Automation'];

  useEffect(() => {
    // Simulate loading delay for smooth animations
    const timer = setTimeout(() => {
      const servicesData = getAllServices();
      console.log('Services data loaded:', servicesData);
      setServices(servicesData || []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => {
              const categoryMap = {
        'Development': ['website-development', 'ecommerce-solutions'],
        'Marketing': ['digital-marketing'],
        'Optimization': ['seo-optimization'],
        'AI & Automation': ['ai-agents']
      };
        return categoryMap[selectedCategory]?.includes(service.slug);
      });

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
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 flex items-center justify-center transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-900 dark:text-gray-100 text-lg">Loading our amazing services...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 transition-colors duration-500">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-6 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-64 w-96 h-96 bg-primary-violet/10 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            variants={titleVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>
          
          <motion.p 
            variants={titleVariants}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From cutting-edge web development to powerful digital marketing strategies, 
            we deliver solutions that drive your business forward in the digital age.
          </motion.p>

          {/* Service Count */}
          <motion.div
            variants={filterVariants}
            className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 mb-8"
          >
            <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
            <span>{services.length} Premium Services Available</span>
            <div className="w-2 h-2 bg-primary-violet rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section 
        className="px-6 mb-16"
        variants={filterVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white shadow-lg shadow-primary-blue/25'
                    : 'bg-gray-200 dark:bg-neutral-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-700/50 border border-gray-300 dark:border-neutral-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="px-6 pb-20"
        layout
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-6 pb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 dark:bg-dark/90 backdrop-blur-xl border border-gray-200 dark:border-neutral-800 rounded-3xl p-12 transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Your Business?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals and drive unprecedented growth.
            </p>
            <motion.button
              className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Get Free Consultation
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services; 