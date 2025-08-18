import { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  stats: null,
  services: [],

  testimonials: [],
  contacts: [],
  lastUpdated: null,
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_STATS: 'SET_STATS',
  SET_SERVICES: 'SET_SERVICES',

  SET_TESTIMONIALS: 'SET_TESTIMONIALS',
  SET_CONTACTS: 'SET_CONTACTS',
  UPDATE_SERVICE: 'UPDATE_SERVICE',
  DELETE_SERVICE: 'DELETE_SERVICE',

  UPDATE_TESTIMONIAL: 'UPDATE_TESTIMONIAL',
  DELETE_TESTIMONIAL: 'DELETE_TESTIMONIAL',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_LAST_UPDATED: 'SET_LAST_UPDATED',
};

// Reducer
const adminReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    
    case ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    
    case ACTIONS.SET_SERVICES:
      return { ...state, services: action.payload };
    

    
    case ACTIONS.SET_TESTIMONIALS:
      return { ...state, testimonials: action.payload };
    
    case ACTIONS.SET_CONTACTS:
      return { ...state, contacts: action.payload };
    
    case ACTIONS.UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map(service => 
          service._id === action.payload._id ? action.payload : service
        ),
      };
    
    case ACTIONS.DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(service => service._id !== action.payload),
      };
    

    
    case ACTIONS.UPDATE_TESTIMONIAL:
      return {
        ...state,
        testimonials: state.testimonials.map(testimonial => 
          testimonial._id === action.payload._id ? action.payload : testimonial
        ),
      };
    
    case ACTIONS.DELETE_TESTIMONIAL:
      return {
        ...state,
        testimonials: state.testimonials.filter(testimonial => testimonial._id !== action.payload),
      };
    
    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    
    case ACTIONS.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload),
      };
    
    case ACTIONS.SET_LAST_UPDATED:
      return { ...state, lastUpdated: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AdminContext = createContext();

// Provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Initialize authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: ACTIONS.SET_USER, payload: user });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        loadDashboardData();
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: false });
  }, []);

  // Load all dashboard data
  const loadDashboardData = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      
      const [statsRes, servicesRes, testimonialsRes, contactsRes] = await Promise.all([
        apiService.dashboard.getStats().catch(() => null),
        apiService.services.getAll().catch(() => ({ data: [] })),
        apiService.testimonials.getAll().catch(() => ({ data: [] })),
        apiService.contacts.getAll().catch(() => ({ data: [] })),
      ]);

      if (statsRes?.success) {
        dispatch({ type: ACTIONS.SET_STATS, payload: statsRes.data });
      }
      
      if (servicesRes?.success) {
        dispatch({ type: ACTIONS.SET_SERVICES, payload: servicesRes.data });
      }
      

      
      if (testimonialsRes?.success) {
        dispatch({ type: ACTIONS.SET_TESTIMONIALS, payload: testimonialsRes.data });
      }
      
      if (contactsRes?.success) {
        dispatch({ type: ACTIONS.SET_CONTACTS, payload: contactsRes.data });
      }

      dispatch({ type: ACTIONS.SET_LAST_UPDATED, payload: new Date() });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const interval = setInterval(() => {
      loadDashboardData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [state.isAuthenticated]);

  // Context value
  const value = {
    ...state,
    dispatch,
    actions: ACTIONS,
    
    // Helper functions
    refreshData: loadDashboardData,
    
    // Service operations
    updateService: (service) => dispatch({ type: ACTIONS.UPDATE_SERVICE, payload: service }),
    deleteService: (id) => dispatch({ type: ACTIONS.DELETE_SERVICE, payload: id }),
    

    
    // Testimonial operations
    updateTestimonial: (testimonial) => dispatch({ type: ACTIONS.UPDATE_TESTIMONIAL, payload: testimonial }),
    deleteTestimonial: (id) => dispatch({ type: ACTIONS.DELETE_TESTIMONIAL, payload: id }),
    
    // Contact operations
    updateContact: (contact) => dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: contact }),
    deleteContact: (id) => dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id }),
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

// Custom hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext; 