import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function StatsCard({ label, value, suffix, color, index }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      count: value,
      transition: { duration: 1.2, delay: 0.2 * index, ease: 'easeOut' },
    });
  }, [value, controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.7 }}
      className={`flex-1 min-w-[220px] bg-white dark:bg-neutral-900 border-2 rounded-xl p-8 text-center shadow-lg border-transparent bg-clip-padding relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:${color} before:opacity-60 before:-z-10`}
    >
      <motion.span
        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent"
        animate={controls}
        initial={{ count: 0 }}
      >
        {Math.floor(count)}{suffix}
      </motion.span>
      <div className="mt-2 text-gray-600 dark:text-gray-300 text-lg font-medium">{label}</div>
    </motion.div>
  );
} 