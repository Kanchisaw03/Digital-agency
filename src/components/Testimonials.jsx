import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rohit Verma',
    company: 'Axis Bank',
    quote: 'Vigyapana helped us boost online leads by 312% within months.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ananya Singh',
    company: 'Aptech',
    quote: 'The design strategy doubled our website retention rate.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-dark">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">What Our Clients Say</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 * i, duration: 0.7 }}
          >
            <TestimonialCard {...t} />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 