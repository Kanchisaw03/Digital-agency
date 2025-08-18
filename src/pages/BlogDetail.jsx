import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import apiService from '../services/api';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  ClockIcon, 
  TagIcon,
  EyeIcon,
  HeartIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const response = await apiService.blogs.getBySlug(slug);
      
      if (response.success) {
        setBlog(response.data);
        // Fetch related blogs from the same category
        fetchRelatedBlogs(response.data.category, response.data._id);
      } else {
        toast.error('Blog not found');
        navigate('/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category, currentBlogId) => {
    try {
      const response = await apiService.blogs.getAll({ 
        category: category,
        published: 'true',
        limit: 3
      });
      
      if (response.success) {
        // Filter out current blog and limit to 3
        const related = response.data
          .filter(b => b._id !== currentBlogId)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleRelatedBlogClick = (relatedBlog) => {
    navigate(`/blogs/${relatedBlog.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
            Blog not found
          </h2>
          <button
            onClick={() => navigate('/blogs')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100">
      {/* Back Button */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category and Featured Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {blog.category}
            </span>
            {blog.isFeatured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {formatDate(blog.publishedAt || blog.createdAt)}
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-2" />
              {blog.readTime} min read
            </div>
            <div className="flex items-center">
              <EyeIcon className="w-5 h-5 mr-2" />
              {blog.views || 0} views
            </div>
            <div className="flex items-center">
              <HeartIcon className="w-5 h-5 mr-2" />
              {blog.likes || 0} likes
            </div>
          </div>

          {/* Author */}
          {blog.author && (
            <div className="flex items-center mb-8 p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg">
              {blog.author.avatar && (
                <img 
                  src={blog.author.avatar} 
                  alt={blog.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {blog.author.name}
                </p>
                {blog.author.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {blog.author.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Save
            </button>
          </div>
        </motion.header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <img 
              src={blog.featuredImage} 
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-200 dark:border-neutral-700 pt-12"
          >
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <div
                  key={relatedBlog._id}
                  onClick={() => handleRelatedBlogClick(relatedBlog)}
                  className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  {relatedBlog.featuredImage && (
                    <img 
                      src={relatedBlog.featuredImage} 
                      alt={relatedBlog.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {relatedBlog.readTime} min read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
