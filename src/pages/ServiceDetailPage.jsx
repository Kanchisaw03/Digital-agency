import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ExclamationTriangleIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { getServiceById } from '../data/servicesData';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [selectedTier, setSelectedTier] = useState('individual');

  const tiers = [
    { id: 'individual', name: 'Individual / Standard', discount: 0, color: 'blue' },
    { id: 'ngo-medium', name: 'NGO (Medium)', discount: 20, color: 'green' },
    { id: 'ngo-large', name: 'NGO (Large)', discount: 30, color: 'purple' }
  ];

  useEffect(() => {
    const serviceData = getServiceById(id);
    if (serviceData) {
      setService(serviceData);
      // Set document title for SEO
      document.title = `${serviceData.name} - Vigyapana Services`;
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', serviceData.shortDescription);
      }
    } else {
      // Service not found, redirect to services page
      navigate('/services');
    }
  }, [id, navigate]);

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
    const suffix = service.pricing === 'monthly' ? '/month' : service.pricing === 'per-project' ? '/project' : service.pricing === 'one-time' ? '' : '';
    return `₹${price.toLocaleString()}${suffix}`;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-500',
        bgHover: 'hover:bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-500',
        gradient: 'from-blue-500 to-blue-600'
      },
      orange: {
        bg: 'bg-orange-500',
        bgHover: 'hover:bg-orange-600',
        text: 'text-orange-600',
        border: 'border-orange-500',
        gradient: 'from-orange-500 to-orange-600'
      },
      pink: {
        bg: 'bg-pink-500',
        bgHover: 'hover:bg-pink-600',
        text: 'text-pink-600',
        border: 'border-pink-500',
        gradient: 'from-pink-500 to-pink-600'
      },
      purple: {
        bg: 'bg-purple-500',
        bgHover: 'hover:bg-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-500',
        gradient: 'from-purple-500 to-purple-600'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading service details...</p>
        </div>
      </div>
    );
  }

  const colors = getColorClasses(service.categoryColor);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20 transition-colors duration-500">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link 
          to="/services"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="px-6 pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colors.gradient}/10 border ${colors.border}/20 rounded-full mb-6`}>
              <span className={`text-sm font-medium ${colors.text} dark:${colors.text.replace('text-', 'text-')}/80`}>
                {service.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {service.name}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Tier Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
          </div>

          {/* Pricing Display */}
          <div className="text-center mb-12">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {getPricingDisplay(service, selectedTier)}
            </div>
            {service.pricing !== 'custom' && selectedTier !== 'individual' && (
              <div className="text-lg text-green-600 dark:text-green-400">
                Save {tiers.find(t => t.id === selectedTier)?.discount}% with {tiers.find(t => t.id === selectedTier)?.name} pricing
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <CheckIcon className={`w-6 h-6 ${colors.text}`} />
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <StarIcon className={`w-6 h-6 ${colors.text}`} />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckIcon className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline & Deliverables */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <ClockIcon className={`w-5 h-5 ${colors.text}`} />
                  Timeline
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{service.timeline}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className={`w-5 h-5 ${colors.text}`} />
                  Deliverables
                </h3>
                <ul className="space-y-2">
                  {service.deliverables.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Notes & Additional Info */}
            {(service.notes || service.expertiseBands) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
                  Important Notes
                </h3>
                {service.notes && (
                  <div className="space-y-2 mb-4">
                    {service.notes.map((note, index) => (
                      <p key={index} className="text-amber-800 dark:text-amber-200">• {note}</p>
                    ))}
                  </div>
                )}
                {service.expertiseBands && (
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Expertise Bands:</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>New: {service.expertiseBands.new}</div>
                      <div>Medium: {service.expertiseBands.medium}</div>
                      <div>Expert: {service.expertiseBands.expert}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {getPricingDisplay(service, selectedTier)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.pricing === 'monthly' ? 'Per Month' : 
                     service.pricing === 'per-project' ? 'Per Project' : 
                     service.pricing === 'one-time' ? 'One-time Payment' : 
                     'Custom Pricing'}
                  </p>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className={`w-full py-4 px-6 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                  >
                    Book a Call
                  </button>
                  
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className={`w-full py-3 px-6 border-2 ${colors.border} ${colors.text.replace('text-', 'text-').replace('-600', '-700')} dark:${colors.text} rounded-xl font-medium hover:bg-gray-100 hover:border-opacity-80 dark:hover:bg-neutral-800 dark:hover:border-opacity-80 transition-all duration-300`}
                  >
                    Get Custom Quote
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Need help choosing the right package?
                  </p>
                  <button 
                    onClick={() => window.location.href = '/contact'}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Schedule a free consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
