import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CursorArrowRaysIcon, 
  GlobeAltIcon, 
  MegaphoneIcon, 
  HeartIcon,
  VideoCameraIcon,
  ScissorsIcon,
  CreditCardIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { servicesData } from '../data/servicesData';

const Services = () => {
  const [selectedTier, setSelectedTier] = useState('individual');

  const tiers = [
    { id: 'individual', name: 'Individual / Standard', discount: 0, color: 'blue' },
    { id: 'ngo-medium', name: 'NGO (Medium)', discount: 20, color: 'green' },
    { id: 'ngo-large', name: 'NGO (Large)', discount: 30, color: 'purple' }
  ];

  // Color mapping for dynamic classes
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        bgHover: 'hover:bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-500',
        gradient: 'from-blue-500 to-blue-600',
        gradientHover: 'hover:from-blue-600 hover:to-blue-700',
        textHover: 'hover:text-blue-700',
        borderHover: 'hover:border-blue-600',
        bgHoverLight: 'hover:bg-blue-100',
        bgHoverDark: 'dark:hover:bg-blue-900/20',
        textDark: 'dark:text-blue-400',
        borderHoverDark: 'dark:hover:border-blue-400'
      },
      orange: {
        bg: 'bg-orange-500',
        bgHover: 'hover:bg-orange-600',
        text: 'text-orange-600',
        border: 'border-orange-500',
        gradient: 'from-orange-500 to-orange-600',
        gradientHover: 'hover:from-orange-600 hover:to-orange-700',
        textHover: 'hover:text-orange-700',
        borderHover: 'hover:border-orange-600',
        bgHoverLight: 'hover:bg-orange-100',
        bgHoverDark: 'dark:hover:bg-orange-900/20',
        textDark: 'dark:text-orange-400',
        borderHoverDark: 'dark:hover:border-orange-400'
      },
      pink: {
        bg: 'bg-pink-500',
        bgHover: 'hover:bg-pink-600',
        text: 'text-pink-600',
        border: 'border-pink-500',
        gradient: 'from-pink-500 to-pink-600',
        gradientHover: 'hover:from-pink-600 hover:to-pink-700',
        textHover: 'hover:text-pink-700',
        borderHover: 'hover:border-pink-600',
        bgHoverLight: 'hover:bg-pink-100',
        bgHoverDark: 'dark:hover:bg-pink-900/20',
        textDark: 'dark:text-pink-400',
        borderHoverDark: 'dark:hover:border-pink-400'
      },
      purple: {
        bg: 'bg-purple-500',
        bgHover: 'hover:bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-500',
        gradient: 'from-purple-500 to-purple-600',
        gradientHover: 'hover:from-purple-600 hover:to-purple-700',
        textHover: 'hover:text-purple-700',
        borderHover: 'hover:border-purple-600',
        bgHoverLight: 'hover:bg-purple-100',
        bgHoverDark: 'dark:hover:bg-purple-900/20',
        textDark: 'dark:text-purple-400',
        borderHoverDark: 'dark:hover:border-purple-400'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  // Group services by category
  const services = servicesData.reduce((acc, service) => {
    const existingCategory = acc.find(cat => cat.category === service.category);
    if (existingCategory) {
      existingCategory.items.push(service);
    } else {
      const iconMap = {
        'Web Solutions': GlobeAltIcon,
        'Digital Marketing': MegaphoneIcon,
        'Fundraising & NGO Support': HeartIcon,
        'Media & Content': VideoCameraIcon
      };
      acc.push({
        category: service.category,
        icon: iconMap[service.category],
        color: service.categoryColor,
        items: [service]
      });
    }
    return acc;
  }, []);

  const calculatePrice = (service, tier) => {
    if (service.pricing === 'custom' || service.pricing === 'percentage') {
      return service.specialPricing ? service.specialPricing[tier] : service.basePrice;
    }
    
    const discount = tiers.find(t => t.id === tier)?.discount || 0;
    const discountedPrice = service.basePrice * (1 - discount / 100);
    return Math.round(discountedPrice);
  };

  const getPricingDisplay = (service, tier) => {
    if (service.pricing === 'custom') {
      return 'Custom Quote';
    }
    
    if (service.pricing === 'percentage') {
      return service.specialPricing ? service.specialPricing[tier] : `${service.basePrice}% of ad spend`;
    }
    
    const price = calculatePrice(service, tier);
    const suffix = service.pricing === 'monthly' ? '/month' : service.pricing === 'per-project' ? '/project' : '';
    return `₹${price.toLocaleString()}${suffix}`;
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 transition-colors duration-500">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
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
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive digital solutions for individuals and NGOs with transparent pricing and special discounts for non-profit organizations.
          </motion.p>

          {/* Tier Selector */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {tiers.map((tier) => {
              const tierColors = getColorClasses(tier.color);
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedTier === tier.id
                      ? `bg-gradient-to-r ${tierColors.gradient} text-white shadow-lg`
                      : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 border-2 border-gray-400 dark:border-neutral-600'
                  }`}
                >
                  {tier.name}
                  {tier.discount > 0 && (
                    <span className="ml-2 text-sm font-bold">
                      ({tier.discount}% OFF)
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="px-6 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12">
            {services.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="space-y-8"
              >
                {/* Category Header */}
                <div className="text-center">
                  {(() => {
                    const colors = getColorClasses(category.color);
                    return (
                      <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${colors.gradient}/10 border ${colors.border}/20 rounded-full`}>
                        <category.icon className={`w-6 h-6 ${colors.text} ${colors.textDark}`} />
                        <h2 className={`text-2xl font-bold ${colors.text} ${colors.textDark}`}>
                          {category.category}
                        </h2>
                      </div>
                    );
                  })()}
                </div>

                {/* Service Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((service, serviceIndex) => {
                    const colors = getColorClasses(category.color);
                    return (
                      <motion.div
                        key={service.name}
                        variants={itemVariants}
                        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="space-y-4">
                          {/* Service Header */}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                              {service.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {service.description}
                            </p>
                          </div>

                          {/* Pricing */}
                          <div className="py-4">
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                              {getPricingDisplay(service, selectedTier)}
                            </div>
                            {service.notes && service.notes.length > 0 && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Note: {service.notes[0]}
                              </p>
                            )}
                          </div>

                          {/* Features */}
                          <div className="space-y-2">
                            {service.features.slice(0, 4).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Buttons */}
                          <div className="space-y-3">
                            <Link 
                              to={`/services/detail/${service.id}`}
                              className={`w-full py-3 px-4 bg-gradient-to-r ${colors.gradient} text-white rounded-lg font-medium ${colors.gradientHover} transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}
                            >
                              <span>View Details</span>
                              <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                            
                            <button 
                              onClick={() => window.location.href = '/contact'}
                              className={`w-full py-2 px-4 border-2 ${colors.border} ${colors.text} ${colors.textDark} rounded-lg font-medium ${colors.bgHoverLight} ${colors.borderHover} ${colors.bgHoverDark} ${colors.borderHoverDark} transition-all duration-300`}
                            >
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Expertise Bands Info */}
      <motion.section 
        className="px-6 pb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Service Fee Structure
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100">New</h4>
                <p className="text-green-600 dark:text-green-400 font-semibold">15% Service Fee</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CursorArrowRaysIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100">Medium</h4>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">10-12% Service Fee</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCardIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100">Expert</h4>
                <p className="text-purple-600 dark:text-purple-400 font-semibold">8-10% Service Fee</p>
              </div>
            </div>
          </div>
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
                Get Started
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect service package for your needs. Special discounts available for NGOs to support their mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Get Free Consultation
            </motion.button>
              <motion.button
                className="border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 hover:border-gray-500 dark:hover:bg-gray-800 dark:hover:border-gray-500 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services; 