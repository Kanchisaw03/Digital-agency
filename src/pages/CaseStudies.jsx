import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  EyeIcon, 
  CalendarIcon, 
  TagIcon,
  ArrowRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/case-studies?status=published');
      const result = await response.json();

      if (response.ok && result.success) {
        // Sort by featured status and creation date
        const sortedCaseStudies = result.data
          .filter(cs => cs.isPublished)
          .sort((a, b) => {
            // Featured first, then by date
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        
        setCaseStudies(sortedCaseStudies);

        // Extract unique categories/industries
        const uniqueCategories = ['All', ...new Set(sortedCaseStudies.map(cs => cs.industry).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        throw new Error(result.error || 'Failed to fetch case studies');
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast.error('Failed to load case studies');
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  const incrementView = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/case-studies/${id}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  const handleCaseStudyClick = (caseStudy) => {
    incrementView(caseStudy._id);
    // Here you could navigate to a detailed case study page
    // For now, we'll show a modal or expand the card
  };

  const filteredCaseStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Case
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 ml-4">
              Studies
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our successful projects and see how we've helped businesses achieve their digital transformation goals.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.filter(Boolean).map((category, index) => (
              <button
                key={`category-${index}-${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading case studies...</p>
              </div>
            </div>
          ) : filteredCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy, index) => (
                <CaseStudyCard 
                  key={caseStudy._id || `case-study-${index}`} 
                  caseStudy={caseStudy} 
                  onClick={() => handleCaseStudyClick(caseStudy)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Case Studies Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {selectedCategory === 'All' 
                  ? 'No case studies are currently available.' 
                  : `No case studies found in the "${selectedCategory}" industry.`}
              </p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  View All Case Studies
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Let's work together to achieve remarkable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Case Study Card Component
const CaseStudyCard = ({ caseStudy, onClick }) => {
  // Add defensive programming for missing caseStudy data
  if (!caseStudy) {
    return null;
  }

  try {
    const {
      title = 'Untitled',
      description = 'No description available',
      client = 'Unknown Client',
      industry = 'General',
      duration,
      technologies = [],
      results = {},
      images = [],
      views = 0,
      isFeatured = false,
      createdAt = new Date(),
      _id
    } = caseStudy;

    // Ensure technologies is always an array
    const safeTechnologies = Array.isArray(technologies) ? technologies : [];
    // Ensure results is always an object
    const safeResults = results && typeof results === 'object' ? results : {};
    // Ensure images is always an array
    const safeImages = Array.isArray(images) ? images : [];
    // Ensure client is always a string
    const safeClient = typeof client === 'object' && client?.name ? client.name : (typeof client === 'string' ? client : 'Unknown Client');
    // Ensure industry is always a string  
    const safeIndustry = typeof industry === 'string' ? industry : 'General';

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 overflow-hidden">
        {safeImages.length > 0 ? (
          <img 
            src={safeImages[0]} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ChartBarIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        
        {/* View Count */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <EyeIcon className="w-3 h-3" />
          {views}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client & Industry */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-blue-400 font-medium">{safeClient}</span>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <TagIcon className="w-3 h-3" />
            {safeIndustry}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        {safeTechnologies && safeTechnologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {safeTechnologies.filter(Boolean).slice(0, 3).map((tech, index) => (
                <span
                  key={`${_id || 'cs'}-tech-${index}-${tech || 'unknown'}`}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {tech || 'Unknown'}
                </span>
              ))}
              {safeTechnologies.filter(Boolean).length > 3 && (
                <span key={`${_id || 'cs'}-tech-more`} className="text-xs text-gray-600 dark:text-gray-500">
                  +{safeTechnologies.filter(Boolean).length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {safeResults && Object.keys(safeResults).length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(safeResults).filter(([key, value]) => key && value !== null && value !== undefined).slice(0, 2).map(([key, value], index) => {
                // Handle case where value is an object with nested structure
                const displayValue = typeof value === 'object' && value?.value 
                  ? value.value 
                  : (typeof value === 'object' && value?.improvement 
                    ? value.improvement 
                    : (typeof value === 'string' || typeof value === 'number' ? value : 'N/A'));
                
                return (
                  <div key={`${_id || 'cs'}-result-${key}-${index}`} className="text-center p-2 bg-gray-100 dark:bg-gray-700/50 rounded">
                    <div className="text-green-400 font-bold">{displayValue}</div>
                    <div className="text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <CalendarIcon className="w-3 h-3" />
            {createdAt ? new Date(createdAt).toLocaleDateString() : 'No date'}
          </div>
          
          <div className="flex items-center gap-1 text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
            <span>View Case</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
  } catch (error) {
    console.error('Error rendering case study card:', error);
    return (
      <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">Error loading case study</p>
      </div>
    );
  }
};

export default CaseStudies; 