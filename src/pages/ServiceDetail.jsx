import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ArrowLeftIcon, 
  CheckIcon, 
  PlayIcon,
  ArrowRightIcon,
  StarIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  BoltIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { getServiceBySlug } from '../data/services';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Function to generate theme-appropriate gradient
  const getGradientColor = (accentColor) => {
    if (isDark) {
      return `linear-gradient(135deg, ${accentColor}, white)`;
    } else {
      // For light mode, use the accent color with a darker variant for better contrast
      return `linear-gradient(135deg, ${accentColor}, #374151)`; // gray-700
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundService = getServiceBySlug(slug);
      console.log('Service found for slug:', slug, foundService);
      setService(foundService);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    // Auto-advance timeline steps
    if (service?.process) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % service.process.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [service]);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
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
          <p className="text-gray-900 dark:text-gray-100 text-lg">Loading service details...</p>
        </motion.div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 flex items-center justify-center transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Back to Services
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-500">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet transform-gpu z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-20 pb-20 px-6 overflow-hidden"
        style={{ y, opacity }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-64 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${service.accentColor}20` }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
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
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/services')}
            className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Services</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4 mb-6"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: service.accentColor }}
                >
                  {service.title.charAt(0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Premium Service
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
              >
                {service.title}
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              >
                {service.description}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <button 
                  className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30 transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Started Now
                </button>
                <button className="border-2 border-gray-400 dark:border-neutral-600 text-gray-800 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 hover:border-gray-500 dark:hover:bg-neutral-800/50 dark:hover:border-neutral-500 transition-all duration-300 flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(service.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  variants={statsVariants}
                  className="text-center p-6 bg-white dark:bg-neutral-800/50 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 rounded-2xl"
                >
                  <motion.div
                    className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      delay: 0.5 + index * 0.1 
                    }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              What We{' '}
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: getGradientColor(service.accentColor) }}
              >
                Offer
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions designed to drive your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.bullets.map((bullet, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white dark:bg-neutral-800/30 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: service.accentColor }}
                >
                  <CheckIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{bullet}</h3>
                  <p className="text-gray-700 dark:text-gray-400">Professional implementation with industry best practices</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-20 px-6 bg-gray-100 dark:bg-neutral-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why It{' '}
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: getGradientColor(service.accentColor) }}
              >
                Matters
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-6 bg-white dark:bg-gradient-to-r from-neutral-800/50 to-neutral-700/30 backdrop-blur-xl border border-gray-200 dark:border-neutral-600/30 rounded-2xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.accentColor}20` }}
                >
                  <StarIcon 
                    className="w-6 h-6"
                    style={{ color: service.accentColor }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{benefit}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Timeline */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How We{' '}
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: getGradientColor(service.accentColor) }}
              >
                Do It
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">Our proven step-by-step process</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neutral-300 to-neutral-800 dark:from-neutral-600 dark:to-neutral-800 hidden lg:block"></div>

            <div className="space-y-12">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-12 gap-6`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className="p-8 bg-white dark:bg-neutral-800/50 backdrop-blur-xl border border-gray-200 dark:border-neutral-700 rounded-2xl">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{step.step}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 hidden lg:block">
                    <motion.div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-white ${
                        activeStep === index ? 'scale-110' : 'scale-100'
                      }`}
                      style={{ 
                        backgroundColor: activeStep === index ? service.accentColor : 'rgb(55 65 81)',
                        borderColor: service.accentColor
                      }}
                      animate={{ 
                        scale: activeStep === index ? 1.1 : 1,
                        backgroundColor: activeStep === index ? service.accentColor : 'rgb(55 65 81)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="py-20 px-6 bg-gray-100 dark:bg-neutral-900/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Investment{' '}
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: getGradientColor(service.accentColor) }}
              >
                Plans
              </span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. All plans include our commitment to excellence and results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.tiers.map((tier, index) => {
              const isPopular = tier.name === service.pricing.popular;
              
              return (
                <motion.div
                  key={tier.name}
                  className={`relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 group cursor-pointer ${
                    isPopular 
                      ? 'bg-white dark:bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border-2 scale-105' 
                      : 'bg-white dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800/70'
                  }`}
                  style={{
                    borderColor: isPopular ? service.accentColor : undefined
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: isPopular ? 1.05 : 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-white font-semibold text-sm flex items-center space-x-2 shadow-lg"
                      style={{ backgroundColor: service.accentColor }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    >
                      <TrophyIcon className="w-4 h-4" />
                      <span>Most Popular</span>
                    </motion.div>
                  )}

                  {/* Tier Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{tier.name}</h3>
                    <p className="text-gray-700 dark:text-gray-400 mb-6">{tier.description}</p>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                        {service.pricing.currency}{tier.price.toLocaleString()}
                      </span>
                      <span className="text-gray-700 dark:text-gray-400 ml-2">
                        /{tier.duration}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {tier.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${service.accentColor}20`,
                            color: service.accentColor
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                      >
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: service.accentColor }}
                        >
                          <CheckIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isPopular
                        ? 'text-white shadow-lg'
                        : 'border border-neutral-600 text-gray-300 hover:bg-neutral-700/50'
                    }`}
                    style={isPopular ? {
                      background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}CC)`,
                      boxShadow: `0 10px 40px ${service.accentColor}25`
                    } : {}}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: isPopular ? `0 15px 50px ${service.accentColor}35` : undefined
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = '/contact'}
                  >
                    {isPopular ? 'Get Started Now' : 'Choose Plan'}
                  </motion.button>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-10">
                    {isPopular ? (
                      <SparklesIcon className="w-8 h-8" style={{ color: service.accentColor }} />
                    ) : (
                      <BoltIcon className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ 
                      background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${service.accentColor}, transparent 40%)`
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              Need a custom solution? We create tailored packages for unique requirements.
            </p>
            <motion.button
              className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-semibold border-b-2 border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-gray-400 transition-colors duration-300"
              whileHover={{ y: -2 }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact us for custom pricing
            </motion.button>
          </motion.div>

          {/* Money-back Guarantee */}
          <motion.div
            className="flex items-center justify-center space-x-4 mt-16 p-6 bg-white dark:bg-neutral-800/30 border border-gray-200 dark:border-neutral-700 rounded-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${service.accentColor}20` }}
            >
              <StarIcon 
                className="w-6 h-6"
                style={{ color: service.accentColor }}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">100% Satisfaction Guarantee</h4>
              <p className="text-gray-700 dark:text-gray-400">Not happy with the results? We'll work until you are, or your money back.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="relative overflow-hidden bg-white/90 dark:bg-dark/90 backdrop-blur-xl border rounded-3xl p-12"
            style={{ borderColor: `${service.accentColor}30` }}
          >
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${service.accentColor.replace('#', '%23')}' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Let's Build{' '}
                <span 
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: getGradientColor(service.accentColor) }}
                >
                  Together
                </span>
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to transform your business with our {service.title.toLowerCase()}? 
                Get a free consultation and discover how we can help you achieve your goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}CC)`,
                    boxShadow: `0 10px 40px ${service.accentColor}25`
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: `0 15px 50px ${service.accentColor}35`
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Free Quote
                </motion.button>
                
                <motion.button
                  className="border-2 border-gray-400 dark:border-neutral-600 text-gray-800 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 hover:border-gray-500 dark:hover:bg-neutral-800/50 dark:hover:border-neutral-500 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/services')}
                >
                  <span>View All Services</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ServiceDetail; 