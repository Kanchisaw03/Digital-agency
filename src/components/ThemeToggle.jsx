import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    toggleTheme();
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      rotate: 15,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { rotate: -90, opacity: 0 },
    animate: { 
      rotate: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.3
      }
    },
    exit: { 
      rotate: 90, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Sun Icon Component
  const SunIcon = () => (
    <motion.svg
      variants={iconVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-500"
    >
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </motion.svg>
  );

  // Moon Icon Component  
  const MoonIcon = () => (
    <motion.svg
      variants={iconVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-400"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </motion.svg>
  );

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode (Ctrl+J)' : 'Switch to dark mode (Ctrl+J)'}
      >
        {/* Background Circle Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: isDark 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon Container */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isDark ? (
              <MoonIcon key="moon" />
            ) : (
              <SunIcon key="sun" />
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700 dark:border-gray-300 whitespace-nowrap">
              {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              <div className="text-xs opacity-70 mt-1">
                Ctrl+J
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 border-l border-t border-gray-700 dark:border-gray-300 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle; 