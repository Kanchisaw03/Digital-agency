const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Get default headers with auth
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.auth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/admin/login';
          throw new Error('Authentication failed');
        }
        
        const errorData = await response.json().catch(() => ({}));
        
        // Create error object with details for validation errors
        const error = new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        if (errorData.details) {
          error.details = errorData.details;
        }
        throw error;
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication
  auth = {
    login: async (credentials) => {
      return this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        auth: false,
      });
    },

    logout: async () => {
      return this.request('/auth/logout', {
        method: 'POST',
      });
    },

    me: async () => {
      return this.request('/auth/me');
    },

    updateProfile: async (data) => {
      return this.request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    changePassword: async (data) => {
      return this.request('/auth/password', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    getUsers: async () => {
      return this.request('/auth/users');
    },

    createUser: async (data) => {
      return this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  };

  // Dashboard
  dashboard = {
    getStats: async () => {
      return this.request('/dashboard/stats');
    },

    getContactAnalytics: async () => {
      return this.request('/dashboard/contacts/analytics');
    },

    getPerformance: async () => {
      return this.request('/dashboard/performance');
    },

    getActivity: async () => {
      return this.request('/dashboard/activity');
    },
  };

  // Services
  services = {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/services${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/services/${id}`);
    },

    create: async (data) => {
      return this.request('/services', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id, data) => {
      return this.request(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id) => {
      return this.request(`/services/${id}`, {
        method: 'DELETE',
      });
    },

    toggle: async (id) => {
      return this.request(`/services/${id}/toggle`, {
        method: 'PATCH',
      });
    },

    getCategories: async () => {
      return this.request('/services/categories/list');
    },
  };

  // Case Studies
  caseStudies = {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/case-studies${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/case-studies/${id}`);
    },

    getBySlug: async (slug) => {
      return this.request(`/case-studies/slug/${slug}`);
    },

    create: async (data) => {
      return this.request('/case-studies', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id, data) => {
      return this.request(`/case-studies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id) => {
      return this.request(`/case-studies/${id}`, {
        method: 'DELETE',
      });
    },

    toggle: async (id) => {
      return this.request(`/case-studies/${id}/toggle`, {
        method: 'PATCH',
      });
    },

    getStats: async () => {
      return this.request('/case-studies/stats/overview');
    },
  };

  // Testimonials
  testimonials = {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/testimonials${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/testimonials/${id}`);
    },

    create: async (data) => {
      return this.request('/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id, data) => {
      return this.request(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id) => {
      return this.request(`/testimonials/${id}`, {
        method: 'DELETE',
      });
    },

    toggle: async (id) => {
      return this.request(`/testimonials/${id}/toggle`, {
        method: 'PATCH',
      });
    },

    verify: async (id, status) => {
      return this.request(`/testimonials/${id}/verify`, {
        method: 'PATCH',
        body: JSON.stringify({ isVerified: status }),
      });
    },

    getStats: async () => {
      return this.request('/testimonials/stats/overview');
    },
  };

  // Contacts
  contacts = {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return this.request(`/contact${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
      return this.request(`/contact/${id}`);
    },

    update: async (id, data) => {
      return this.request(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id) => {
      return this.request(`/contact/${id}`, {
        method: 'DELETE',
      });
    },

    getStats: async () => {
      return this.request('/contact/stats/overview');
    },
  };

  // File Upload
  upload = {
    uploadImage: async (file, type) => {
      const formData = new FormData();
      formData.append('image', file);

      return this.request(`/upload/image/${type}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });
    },

    uploadImages: async (files, type) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      return this.request(`/upload/images/${type}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      });
    },

    getFiles: async (type) => {
      return this.request(`/upload/${type}`);
    },

    deleteFile: async (type, filename) => {
      return this.request(`/upload/${type}/${filename}`, {
        method: 'DELETE',
      });
    },
  };
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 