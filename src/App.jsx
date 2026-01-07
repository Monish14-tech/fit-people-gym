import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition'; // Import new component

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import BackgroundDecorations from './components/BackgroundDecorations';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProgramsPage from './pages/ProgramsPage';
import VisitPage from './pages/VisitPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/programs" element={<PageTransition><ProgramsPage /></PageTransition>} />
                <Route path="/visit" element={<PageTransition><VisitPage /></PageTransition>} />
                <Route path="/membership" element={<PageTransition><MembershipPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const AppContent = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Simulate initial loading
        setTimeout(() => setLoading(false), 2000);
    }, []);

    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <div className="App">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <BackgroundDecorations />
                    {!isAdminPage && <Navbar />}
                    <AnimatedRoutes />
                    {!isAdminPage && <Footer />}
                    {!isAdminPage && <ChatBot />}
                    {!isAdminPage && <WhatsAppButton />}
                </>
            )}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <AppContent />
        </Router>
    );
};

export default App;
