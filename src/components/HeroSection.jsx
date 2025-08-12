import { motion } from 'framer-motion';
//import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[50vh] py-6 sm:py-10 md:py-20 overflow-hidden bg-gray-50 dark:bg-dark w-full">
      {/* Spline 3D background */}
      {/*<div className="absolute inset-0 w-full h-full max-w-2xl mx-auto opacity-70 pointer-events-none z-0">
        <Spline scene="https://prod.spline.design/hiLpI2oQWZY7pVCY/scene.splinecode" />
      </div>*/}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent drop-shadow-lg max-w-3xl mx-auto"
        >
          Elevate Your Digital Presence with Vigyapana
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto"
        >
          Turning Clicks Into Clients with Smart Design & Strategy.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto z-10"
          onSubmit={e => { e.preventDefault(); alert('Get Started!'); }}
        >
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-blue focus:outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet text-white font-semibold shadow hover:scale-105 transition-transform"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </div>
  );
} 