import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import apiService from '../../services/api';

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Digital Marketing',
    tags: '',
    featuredImage: '',
    status: 'draft',
    isPublished: false,
    isFeatured: false,
    author: {
      name: 'Admin User',
      bio: '',
      avatar: ''
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  const categories = [
    'Digital Marketing',
    'Web Development',
    'SEO Tips',
    'Social Media',
    'Content Marketing',
    'Industry News',
    'Case Studies',
    'Tutorials',
    'Business Tips',
    'Technology'
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await apiService.blogs.getAll({ published: 'all' });
      if (response.success) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Auto-generate slug from title
    if (name === 'title' && !editingBlog) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        seo: {
          ...formData.seo,
          keywords: formData.seo.keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
        }
      };

      let response;
      if (editingBlog) {
        response = await apiService.blogs.update(editingBlog._id, blogData);
        toast.success('Blog updated successfully!');
      } else {
        response = await apiService.blogs.create(blogData);
        toast.success('Blog created successfully!');
      }

      if (response.success) {
        fetchBlogs();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(', '),
      featuredImage: blog.featuredImage || '',
      status: blog.status,
      isPublished: blog.isPublished,
      isFeatured: blog.isFeatured,
      author: {
        name: blog.author?.name || '',
        bio: blog.author?.bio || '',
        avatar: blog.author?.avatar || ''
      },
      seo: {
        metaTitle: blog.seo?.metaTitle || '',
        metaDescription: blog.seo?.metaDescription || '',
        keywords: blog.seo?.keywords?.join(', ') || ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await apiService.blogs.delete(id);
        if (response.success) {
          toast.success('Blog deleted successfully!');
          fetchBlogs();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const response = await apiService.blogs.toggle(id);
      if (response.success) {
        toast.success('Blog status updated!');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error toggling blog status:', error);
      toast.error('Failed to update blog status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Digital Marketing',
      tags: '',
      featuredImage: '',
      status: 'draft',
      isPublished: false,
      isFeatured: false,
      author: {
        name: 'Admin User',
        bio: '',
        avatar: ''
      },
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showForm ? 'Cancel' : 'Add New Blog'}
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="10"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="You can use HTML tags for formatting..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="seo, marketing, tips"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="mr-2 rounded"
                  />
                  Published
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="mr-2 rounded"
                  />
                  Featured
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blogs List */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {blogs.map((blog) => (
                <motion.tr
                  key={blog._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/30"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {blog.title}
                        {blog.isFeatured && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        {blog.excerpt?.substring(0, 60)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : blog.status === 'draft'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {blog.views || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePublish(blog._id)}
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No blogs found. Create your first blog post!
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsManager;
