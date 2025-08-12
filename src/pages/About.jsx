import { motion } from 'framer-motion';
import { FaGlobe, FaUsers, FaBalanceScale, FaHandshake } from 'react-icons/fa';

const whyChoose = [
  { icon: <FaUsers size={28} />, title: 'Diversity', desc: 'A team from all walks of life, bringing unique perspectives.' },
  { icon: <FaHandshake size={28} />, title: 'Inclusivity', desc: 'We foster a culture where every voice is valued.' },
  { icon: <FaBalanceScale size={28} />, title: 'Equality', desc: 'Opportunities and respect for all, always.' },
];

const globalStats = [
  { label: '500+ Team', icon: <FaUsers size={24} />, color: 'from-primary-blue to-primary-green' },
  { label: '14+ Global Offices', icon: <FaGlobe size={24} />, color: 'from-primary-green to-primary-violet' },
  { label: '400,000+ Listings Managed', icon: <FaBalanceScale size={24} />, color: 'from-primary-violet to-primary-blue' },
];

const milestones = [
  { year: '2018', text: 'Founded with a vision for digital excellence.' },
  { year: '2020', text: 'Expanded to 5 countries, 100+ clients.' },
  { year: '2022', text: 'Launched AI-powered marketing tools.' },
  { year: '2024', text: '14+ offices, 500+ team, 400,000+ listings.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 pb-10">
      {/* Who We Are */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent mb-4"
        >
          Who We Are
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Vigyapana is a global digital marketing and IT agency driven by diversity, inclusivity, and a passion for results. Our team blends creativity, technology, and strategy to elevate brands worldwide.
        </motion.p>
      </section>
      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {whyChoose.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:border-primary-blue hover:shadow-primary-blue/30 transition-all"
          >
            <div className="mb-4 rounded-full bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet p-3 shadow-lg">
              <span className="text-white text-2xl">{c.icon}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-100">{c.title}</h3>
            <p className="text-gray-400 text-sm">{c.desc}</p>
          </motion.div>
        ))}
      </section>
      {/* Global Reach */}
      <section className="max-w-4xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 justify-center items-center">
        {globalStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            className={`flex-1 min-w-[180px] bg-white dark:bg-neutral-900 border-2 rounded-xl p-8 text-center shadow-lg border-transparent bg-clip-padding relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:${s.color} before:opacity-60 before:-z-10`}
          >
            <div className="mb-2 flex justify-center">{s.icon}</div>
            <div className="text-xl font-bold bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent">{s.label}</div>
          </motion.div>
        ))}
      </section>
      {/* Timeline Animation */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent"
        >
          Our Growth Journey
        </motion.h2>
        <div className="relative border-l-2 border-primary-blue/40 pl-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              className="mb-8 last:mb-0 relative"
            >
              <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary-blue via-primary-green to-primary-violet border-2 border-dark"></div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{m.year}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{m.text}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 