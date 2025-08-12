import { useState } from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: 'Top SEO Trends for 2024',
    excerpt: 'Stay ahead with the latest SEO strategies and Google updates for 2024.',
    tags: ['SEO', 'Trends'],
    date: '2024-06-01',
    author: 'Vigyapana Team',
  },
  {
    title: 'Designing for Conversion: UI/UX Best Practices',
    excerpt: 'How to turn visitors into customers with smart design.',
    tags: ['UI/UX', 'Digital Strategy'],
    date: '2024-05-20',
    author: 'Ananya Singh',
  },
  {
    title: 'Performance Marketing: What Works Now',
    excerpt: 'A breakdown of the most effective performance marketing tactics.',
    tags: ['Performance Marketing', 'Trends'],
    date: '2024-05-10',
    author: 'Rohit Verma',
  },
  {
    title: 'Managing Your Online Reputation in 2024',
    excerpt: 'Proven ways to build trust and credibility online.',
    tags: ['Reputation', 'Digital Strategy'],
    date: '2024-04-28',
    author: 'Vigyapana Team',
  },
];

const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export default function Blogs() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const filtered = blogPosts.filter(post =>
    (post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase())) &&
    (!tag || post.tags.includes(tag))
  );
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 pb-10">
      <section className="py-16 md:py-20 max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet bg-clip-text text-transparent mb-8 text-center"
        >
          Insights & Ideas
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-blue focus:outline-none transition w-full md:w-64"
          />
          <div className="flex gap-2 flex-wrap mt-2 md:mt-0">
            <button onClick={() => setTag('')} className={`px-3 py-1 rounded-full text-xs font-semibold ${!tag ? 'bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white' : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'} transition`}>
              All
            </button>
            {allTags.map(t => (
              <button key={t} onClick={() => setTag(t)} className={`px-3 py-1 rounded-full text-xs font-semibold ${tag === t ? 'bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white' : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300'} transition`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filtered.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-lg hover:border-primary-blue hover:shadow-primary-blue/30 transition-all flex flex-col gap-2"
            >
              <div className="flex gap-2 flex-wrap mb-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-primary-blue via-primary-green to-primary-violet text-white font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{post.excerpt}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 mt-10">No blog posts found.</div>
        )}
      </section>
    </div>
  );
} 