import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { AdminProvider } from './contexts/AdminContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import ServiceDetailPage from './pages/ServiceDetailPage'
import BlogDetail from './pages/BlogDetail'
import About from './pages/About'

import Blogs from './pages/Blogs'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { useEffect } from 'react';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AdminProvider>
        <ScrollToTop />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <div className="min-h-screen bg-white dark:bg-dark font-sans text-gray-900 dark:text-gray-100 transition-colors duration-500">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            } />
            <Route path="/services/detail/:id" element={
              <>
                <Navbar />
                <ServiceDetailPage />
                <Footer />
              </>
            } />
            <Route path="/services/:slug" element={
              <>
                <Navbar />
                <ServiceDetail />
                <Footer />
              </>
            } />

            <Route path="/blogs" element={
              <>
                <Navbar />
                <Blogs />
                <Footer />
              </>
            } />
            <Route path="/blogs/:slug" element={
              <>
                <Navbar />
                <BlogDetail />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </AdminProvider>
    </Router>
    </ThemeProvider>
  )
}

export default App
