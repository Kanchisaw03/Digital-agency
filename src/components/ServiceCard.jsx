import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ service, index = 0 }) => {
  const navigate = useNavigate();

  // Early return if service is not provided
  if (!service) {
    return (
      <div className="p-8 bg-gray-100 dark:bg-neutral-800/50 rounded-2xl border border-gray-200 dark:border-neutral-700 transition-colors duration-300">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <div className="w-16 h-16 bg-neutral-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
            ?
          </div>
          <p>Service data not available</p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/services/${service.slug}`);
  };

  // Provide fallback values for service properties
  const {
    title = 'Service Title',
    tagline = 'Service description',
    bullets = [],
    accentColor = '#3b82f6', // primary-blue as fallback
    slug = 'service'
  } = service;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const hoverVariants = {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      className="group relative cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        variants={hoverVariants}
        className="relative overflow-hidden bg-white/50 dark:bg-neutral-800/30 backdrop-blur-sm border border-gray-200/50 dark:border-neutral-700/50 rounded-2xl p-8 h-full hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors duration-300"
      >
        {/* Content */}
        <div className="relative z-10">
          {/* Service Icon */}
          <motion.div
            variants={iconVariants}
            className="mb-6"
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {title.charAt(0)}
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {title}
          </h3>

          {/* Tagline */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
            {tagline}
          </p>

          {/* CTA */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            <span className="font-medium">Learn More</span>
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard; 