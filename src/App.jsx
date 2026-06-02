import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { ServicesProvider } from './context/ServicesContext';
import { HeroProvider } from './context/HeroContext';
import { SocialProvider } from './context/SocialContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Global Components
import Loader from './components/Loader';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Holdings from './pages/Holdings';


// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminBlog from './pages/admin/AdminBlog';
import AdminServices from './pages/admin/AdminServices';
import AdminHero from './pages/admin/AdminHero';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminSocials from './pages/admin/AdminSocials';


// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <AuthProvider>
      <SocialProvider>
        <ServicesProvider>
          <BlogProvider>
            <HeroProvider>
              <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
              <Router>
                <ScrollToTop />
                {loading && (
                  <Loader fadeOut={fadeOut} />
                )}
                
                <Routes>
                  {/* Public Routes with Navbar/Footer */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:companyId/:serviceId" element={<ServiceDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/holdings" element={<Holdings />} />
                  </Route>

                  {/* Admin Routes with distinct Layout */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="hero" element={<AdminHero />} />
                    <Route path="transactions" element={<AdminTransactions />} />
                    <Route path="settings" element={<AdminSocials />} />
                  </Route>
                </Routes>
              </Router>
            </ReactLenis>
          </HeroProvider>
        </BlogProvider>
      </ServicesProvider>
      </SocialProvider>
    </AuthProvider>
  );
}

export default App;
