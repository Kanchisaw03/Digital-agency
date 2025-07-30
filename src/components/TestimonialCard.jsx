import { motion } from 'framer-motion';

export default function TestimonialCard({ avatar, quote, name, company }) {
  return (
    <motion.div
      className="bg-neutral-900 border-2 border-gradient-to-br from-primary-blue via-primary-green to-primary-violet rounded-xl p-6 max-w-xs flex flex-col items-center shadow-lg"
      whileHover={{ scale: 1.04 }}
    >
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full border-4 border-primary-blue mb-4 object-cover shadow"
        loading="lazy"
      />
      <blockquote className="text-gray-200 italic mb-3 text-center">“{quote}”</blockquote>
      <div className="font-semibold text-primary-blue">{name}</div>
      <div className="text-xs text-gray-400">{company}</div>
    </motion.div>
  );
} 