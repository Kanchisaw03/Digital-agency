import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
          const isDarkSaved = savedTheme === 'dark';
          setIsDark(isDarkSaved);
          applyTheme(isDarkSaved);
        } else {
          // Check system preference if no saved theme
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          // Default to dark mode as requested, but respect system preference
          const shouldBeDark = prefersDark !== undefined ? prefersDark : true;
          setIsDark(shouldBeDark);
          applyTheme(shouldBeDark);
          localStorage.setItem('theme', shouldBeDark ? 'dark' : 'light');
        }
      } catch (error) {
        // Fallback to dark mode if localStorage is not available
        console.warn('LocalStorage not available, defaulting to dark mode');
        setIsDark(true);
        applyTheme(true);
      }
      
      setIsLoaded(true);
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  const applyTheme = (dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference to localStorage');
    }
  };

  // Set specific theme
  const setTheme = (theme) => {
    const isDarkTheme = theme === 'dark';
    setIsDark(isDarkTheme);
    applyTheme(isDarkTheme);
    
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Could not save theme preference to localStorage');
    }
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+J (or Cmd+J on Mac) to toggle theme
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDark]);

  const value = {
    isDark,
    theme: isDark ? 'dark' : 'light',
    toggleTheme,
    setTheme,
    isLoaded
  };

  // Don't render children until theme is loaded to prevent flash
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 