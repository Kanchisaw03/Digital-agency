import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function Blogs() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await apiService.blogs.getAll({ 
        published: 'true',
        sortBy: 'publishedAt',
        order: 'desc'
      });
      
      if (response.success) {
        setBlogs(response.data);
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(blog => blog.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 pb-10">
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Insights & Ideas
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights in digital marketing, web development, and business growth.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none min-w-[200px] transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredBlogs.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500 group"
              >
                {blog.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Category and Featured Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {blog.category}
                    </span>
                    {blog.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{blog.tags.length - 3} more</span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {blog.readTime} min read
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {blog.views || 0}
                      </div>
                      <div className="flex items-center">
                        <HeartIcon className="w-4 h-4 mr-1" />
                        {blog.likes || 0}
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  {blog.author && (
                    <div className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                      {blog.author.avatar && (
                        <img 
                          src={blog.author.avatar} 
                          alt={blog.author.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {blog.author.name}
                        </p>
                        {blog.author.bio && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {blog.author.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Read More Button */}
                  <button 
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Read Full Article
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-gray-400 mb-4">
              <TagIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Blog Stats */}
        {!loading && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {blogs.length}
                </span>
                <span className="ml-1">Total Articles</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {categories.length}
                </span>
                <span className="ml-1">Categories</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {blogs.reduce((total, blog) => total + (blog.views || 0), 0)}
                </span>
                <span className="ml-1">Total Views</span>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}