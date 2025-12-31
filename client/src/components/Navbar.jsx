import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Programs', path: '/programs' },
        { title: 'Plans', path: '/membership' },
        { title: 'Visit', path: '/visit' },
        { title: 'Contact', path: '/contact' },
        { title: 'Admin', path: '/admin/login' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: '15px 0',
            transition: 'all 0.3s ease',
            backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}>
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Logo />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1, color: '#fff' }}>
                            <span className="text-gold">FIT PEOPLE</span> GYM
                        </h2>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Live Longer, Healthier & Happier
                        </span>
                    </div>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Desktop Menu - Glass Bar Style */}
                    <ul className="desktop-menu" style={{
                        display: 'flex',
                        gap: '40px',
                        listStyle: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        padding: '10px 40px',
                        borderRadius: '50px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                    }}>
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <Link
                                    to={link.path}
                                    style={{
                                        color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        transition: 'color 0.3s'
                                    }}
                                    className="nav-link"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Hamburger Menu - Always Visible */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>

            {/* Mobile/Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(5, 5, 5, 0.98)',
                            padding: '20px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 999
                        }}
                    >
                        <div
                            onClick={() => setIsOpen(false)}
                            style={{ position: 'absolute', top: '30px', right: '30px', fontSize: '2rem', cursor: 'pointer', color: 'var(--primary)' }}
                        >
                            <FaTimes />
                        </div>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'center' }}>
                            {navLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                                            textDecoration: 'none',
                                            fontSize: '3rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            fontFamily: 'Oswald, sans-serif'
                                        }}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 900px) {
                    .desktop-menu { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
