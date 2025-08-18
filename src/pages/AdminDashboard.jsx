import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import ServicesManager from '../components/admin/ServicesManager';
import BlogsManager from '../components/admin/BlogsManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import toast from 'react-hot-toast';
import {
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ClockIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  PlusIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    isLoading,
    stats,
    services,

    testimonials,
    contacts,
    lastUpdated,
    refreshData,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast.success('Data refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const quickStats = [
    {
      title: 'Total Services',
      value: stats?.totalServices || services.length,
      icon: BriefcaseIcon,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: '+12%',
      trend: 'up'
    },

    {
      title: 'Testimonials',
      value: stats?.totalTestimonials || testimonials.length,
      icon: ChatBubbleLeftRightIcon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Contact Submissions',
      value: stats?.totalContacts || contacts.length,
      icon: UserGroupIcon,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      change: '+22%',
      trend: 'up'
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'services', label: 'Services', icon: BriefcaseIcon },
    { id: 'blogs', label: 'Blogs', icon: DocumentTextIcon },
    { id: 'testimonials', label: 'Testimonials', icon: ChatBubbleLeftRightIcon },
    { id: 'contacts', label: 'Contacts', icon: UserGroupIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
  ];

  const recentContacts = contacts.slice(0, 5);
  const pendingTestimonials = testimonials.filter(t => !t.isVerified).slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Vigyapana Admin</h1>
              <div className="ml-4 flex items-center text-sm text-gray-400">
                <ClockIcon className="w-4 h-4 mr-1" />
                Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <ArrowPathIcon className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <div className="text-right">
                <p className="text-sm text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">{stat.change}</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('services')}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg hover:bg-blue-600/20 transition-colors"
                >
                  <PlusIcon className="w-6 h-6 text-blue-400" />
                  <span className="text-sm text-blue-400">Add Service</span>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className="flex flex-col items-center gap-2 p-4 bg-green-600/10 border border-green-600/20 rounded-lg hover:bg-green-600/20 transition-colors"
                >
                  <DocumentTextIcon className="w-6 h-6 text-green-400" />
                  <span className="text-sm text-green-400">Write Blog</span>
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className="flex flex-col items-center gap-2 p-4 bg-purple-600/10 border border-purple-600/20 rounded-lg hover:bg-purple-600/20 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-400" />
                  <span className="text-sm text-purple-400">Manage Reviews</span>
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="flex flex-col items-center gap-2 p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg hover:bg-yellow-600/20 transition-colors"
                >
                  <UserGroupIcon className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm text-yellow-400">View Contacts</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Contacts */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Contacts</h3>
                <div className="space-y-3">
                  {recentContacts.length > 0 ? (
                    recentContacts.map((contact) => (
                      <div key={contact._id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-400">{contact.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded ${
                            contact.status === 'new' ? 'bg-blue-600/20 text-blue-400' :
                            contact.status === 'in-progress' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-green-600/20 text-green-400'
                          }`}>
                            {contact.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No recent contacts</p>
                  )}
                </div>
              </div>

              {/* Pending Reviews */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Pending Reviews</h3>
                <div className="space-y-3">
                  {pendingTestimonials.length > 0 ? (
                    pendingTestimonials.map((testimonial) => (
                      <div key={testimonial._id} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white font-medium">{testimonial.clientName}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {testimonial.content}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">{testimonial.company}</span>
                          <div className="flex gap-2">
                            <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">
                              Approve
                            </button>
                            <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No pending reviews</p>
                  )}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Database: Online</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">API: Healthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Performance: Good</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && <ServicesManager />}

        {activeTab === 'blogs' && <BlogsManager />}

        {activeTab === 'testimonials' && <TestimonialsManager />}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Contact Management</h2>
              <div className="text-sm text-gray-400">
                Total: {contacts.length} submissions
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="hover:bg-gray-700/30">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">{contact.name}</div>
                            <div className="text-sm text-gray-400">{contact.email}</div>
                            <div className="text-sm text-gray-400">{contact.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-300">{contact.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            contact.status === 'new' ? 'bg-blue-600/20 text-blue-400' :
                            contact.status === 'in-progress' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-green-600/20 text-green-400'
                          }`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <input
                    type="text"
                    value={user?.role || ''}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 capitalize"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">API Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Backend URL: <span className="text-blue-400">http://localhost:5000</span></p>
                <p className="text-gray-300">Frontend URL: <span className="text-blue-400">http://localhost:5173</span></p>
                <p className="text-gray-300">Environment: <span className="text-green-400">Development</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 