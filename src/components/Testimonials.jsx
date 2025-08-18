import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import apiService from '../services/api';

export default function Testimonials() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await apiService.testimonials.getAll({ published: true, featured: true, limit: 6 });
        const data = res?.data || [];
        const mapped = data.map((t) => ({
          name: t?.client?.name || 'Client',
          company: t?.client?.company || '',
          quote: t?.quote || '',
          avatar: t?.client?.avatar || '/public/images/avatar-placeholder.png',
        }));
        setItems(mapped);
      } catch (e) {
        console.error('Failed to load testimonials', e);
        setItems([]);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="py-16 bg-gray-50 dark:bg-dark">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">What Our Clients Say</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto">
        {items.map((t, i) => (
          <motion.div
            key={`${t.name}-${i}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
          >
            <TestimonialCard {...t} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}