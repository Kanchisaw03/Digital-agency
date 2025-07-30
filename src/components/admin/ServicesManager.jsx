import { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import apiService from '../../services/api';
import toast from 'react-hot-toast';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ServicesManager = () => {
  const { services, updateService, deleteService } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    pricing: {
      startingPrice: '',
      currency: 'USD',
      pricingModel: 'custom'
    },
    features: [''],
    technologies: [''],
    isActive: true,
    order: 1,
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ['']
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categories = [
    'SEO & Performance Marketing',
    'Web Development',
    'UI/UX Design',
    'Social Media Management',
    'Online Reputation Management',
    'Local Listings & GBP Management',
    'Fraud Detection & Review Management',
    'E-commerce Solutions',
    'Content Marketing',
    'Digital Strategy'
  ];

  // Debug function to test service creation with minimal data
  const testServiceCreation = async () => {
    try {
      const testData = {
        title: 'Test Service',
        description: 'This is a test service with at least 10 characters',
        category: 'Web Development'
      };

      console.log('Testing service creation with:', testData);
      console.log('Current token:', localStorage.getItem('token')?.substring(0, 20) + '...');

      const result = await apiService.services.create(testData);
      console.log('Test service creation result:', result);
      toast.success('Test service created successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Test service creation failed:', error);
      if (error.details) {
        console.log('Validation details:', error.details);
      }
      toast.error(`Test failed: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      category: '',
      pricing: {
        startingPrice: '',
        currency: 'USD',
        pricingModel: 'custom'
      },
      features: [''],
      technologies: [''],
      isActive: true,
      order: 1,
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ['']
      }
    });
    setEditingService(null);
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || '',
        description: service.description || '',
        detailedDescription: service.detailedDescription || '',
        category: service.category || '',
        pricing: {
          startingPrice: service.pricing?.startingPrice || '',
          currency: service.pricing?.currency || 'USD',
          pricingModel: service.pricing?.pricingModel || 'custom'
        },
        features: service.features?.length ? service.features : [''],
        technologies: service.technologies?.length ? service.technologies : [''],
        isActive: service.isActive !== undefined ? service.isActive : true,
        order: service.order || 1,
        seo: {
          metaTitle: service.seo?.metaTitle || '',
          metaDescription: service.seo?.metaDescription || '',
          keywords: service.seo?.keywords?.length ? service.seo.keywords : ['']
        }
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
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
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSeoChange = (field, index, value) => {
    if (field === 'keywords') {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: prev.seo.keywords.map((item, i) => i === index ? value : item)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [field]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields on frontend
      if (!formData.title || formData.title.trim().length < 2) {
        toast.error('Title must be at least 2 characters long');
        setIsLoading(false);
        return;
      }

      if (!formData.description || formData.description.trim().length < 10) {
        toast.error('Description must be at least 10 characters long');
        setIsLoading(false);
        return;
      }

      if (!formData.category) {
        toast.error('Please select a category');
        setIsLoading(false);
        return;
      }

      // Clean up data - ensure all required fields are present
      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        detailedDescription: formData.detailedDescription?.trim() || '',
        pricing: {
          startingPrice: formData.pricing.startingPrice ? parseFloat(formData.pricing.startingPrice) : undefined,
          currency: formData.pricing.currency || 'USD',
          pricingModel: formData.pricing.pricingModel || 'custom'
        },
        features: formData.features.filter(f => f && f.trim()).map(f => f.trim()),
        technologies: formData.technologies.filter(t => t && t.trim()).map(t => t.trim()),
        isActive: Boolean(formData.isActive),
        order: parseInt(formData.order) || 0,
        seo: {
          metaTitle: formData.seo.metaTitle?.trim() || '',
          metaDescription: formData.seo.metaDescription?.trim() || '',
          keywords: formData.seo.keywords.filter(k => k && k.trim()).map(k => k.trim())
        }
      };

      console.log('Submitting service data:', submitData);

      let result;
      if (editingService) {
        result = await apiService.services.update(editingService._id, submitData);
        if (result.success) {
          updateService(result.data);
          toast.success('Service updated successfully!');
        }
      } else {
        result = await apiService.services.create(submitData);
        if (result.success) {
          // Refresh the entire services list
          window.location.reload();
          toast.success('Service created successfully!');
        }
      }

      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
      
      // Show detailed validation errors if available
      if (error.message.includes('Validation failed') && error.details) {
        console.error('Validation details:', error.details);
        const errorMessages = error.details.map(detail => detail.msg || detail.message).join(', ');
        toast.error(`Validation failed: ${errorMessages}`);
      } else {
        toast.error(error.message || 'Failed to save service');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const result = await apiService.services.toggle(service._id);
      if (result.success) {
        updateService(result.data);
        toast.success(`Service ${result.data.isActive ? 'activated' : 'deactivated'}`);
      }
    } catch (error) {
      toast.error('Failed to toggle service status');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await apiService.services.delete(id);
      if (result.success) {
        deleteService(id);
        toast.success('Service deleted successfully');
        setDeleteConfirm(null);
      }
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Services Management</h2>
          <p className="text-gray-400">Manage your service offerings</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={testServiceCreation}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            🧪 Test Create
          </button>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Service
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleActive(service)}
                  className={`p-1 rounded ${
                    service.isActive ? 'text-green-400' : 'text-gray-500'
                  }`}
                  title={service.isActive ? 'Active' : 'Inactive'}
                >
                  {service.isActive ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeSlashIcon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => openModal(service)}
                  className="text-blue-400 hover:text-blue-300 p-1 rounded"
                  title="Edit"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(service._id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded"
                  title="Delete"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-3">{service.description}</p>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-blue-400 font-medium">{service.category}</span>
              <span className="text-green-400 font-bold">
                ${service.pricing?.startingPrice || 'Custom'}+
              </span>
            </div>
            
            {service.technologies && service.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {service.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {service.technologies.length > 3 && (
                  <span className="text-xs text-gray-500">+{service.technologies.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description * (min 10 characters)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Pricing & Settings */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Starting Price ($)
                  </label>
                  <input
                    type="number"
                    name="pricing.startingPrice"
                    value={formData.pricing.startingPrice}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Order Priority
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min={0}
                    max={100}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 mt-8">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-gray-300">Active</span>
                  </label>
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Features
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="text-blue-400 text-sm hover:text-blue-300"
                  >
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange('features', index, e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Enter feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Technologies
                  </label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('technologies')}
                    className="text-blue-400 text-sm hover:text-blue-300"
                  >
                    + Add Technology
                  </button>
                </div>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Enter technology"
                    />
                    {formData.technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('technologies', index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* SEO */}
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-medium text-white mb-4">SEO Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo.metaTitle}
                      onChange={(e) => handleSeoChange('metaTitle', null, e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={formData.seo.metaDescription}
                      onChange={(e) => handleSeoChange('metaDescription', null, e.target.value)}
                      rows={2}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-bold text-white">Confirm Delete</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager; 