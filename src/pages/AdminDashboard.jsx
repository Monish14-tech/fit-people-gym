import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LogOut,
    Trash2,
    Mail,
    Users,
    RefreshCcw,
    Database,
    MessageSquare,
    Calendar,
    User,
    ChevronRight,
    Search,
    BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BackgroundDecorations from '../components/BackgroundDecorations';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState({ contactCount: 0, testimonialCount: 0 });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('submissions');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            const [submissionsRes, testimonialsRes, statsRes] = await Promise.all([
                axios.get(`${apiUrl}/api/admin/submissions`, config),
                axios.get(`${apiUrl}/api/testimonials`),
                axios.get(`${apiUrl}/api/admin/stats`, config)
            ]);

            setSubmissions(submissionsRes.data);
            setTestimonials(testimonialsRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

        const token = localStorage.getItem('adminToken');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        try {
            await axios.delete(`${apiUrl}/api/admin/testimonials/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            color: '#fff',
            paddingTop: '100px',
            paddingBottom: '50px',
            position: 'relative',
            overflowX: 'hidden',
            fontFamily: 'var(--font-body)'
        }}>
            <BackgroundDecorations />

            {/* Premium Gold Accent Glows */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px' }}>
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '40px',
                        backgroundColor: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(20px)',
                        padding: '30px 40px',
                        borderRadius: '24px',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#D4AF37',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
                        }}>
                            <Database color="#000" size={30} />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                margin: 0,
                                textTransform: 'uppercase',
                                letterSpacing: '-1px',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                Admin <span style={{ color: '#D4AF37' }}>Management</span>
                            </h1>
                            <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0, textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px' }}>
                                Premium Data Control Center
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <motion.button
                            whileHover={{ rotate: 180 }}
                            onClick={fetchData}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#D4AF37',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s'
                            }}
                        >
                            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                padding: '0 25px',
                                borderRadius: '12px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <LogOut size={16} /> Sign Out
                        </motion.button>
                    </div>
                </motion.header>

                {/* Statistics Overview */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '25px',
                    marginBottom: '40px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            backgroundColor: 'rgba(15, 15, 15, 0.8)',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                            borderRadius: '24px',
                            padding: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '25px',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <MessageSquare color="#D4AF37" size={32} />
                        </div>
                        <div>
                            <p style={{ color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1.5px', margin: '0 0 5px 0' }}>
                                Total Inquiries
                            </p>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>
                                {stats.contactCount}
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            backgroundColor: 'rgba(15, 15, 15, 0.8)',
                            border: '1px solid rgba(212, 175, 55, 0.1)',
                            borderRadius: '24px',
                            padding: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '25px',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Users color="#D4AF37" size={32} />
                        </div>
                        <div>
                            <p style={{ color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1.5px', margin: '0 0 5px 0' }}>
                                Published Testimonials
                            </p>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>
                                {stats.testimonialCount}
                            </h2>
                        </div>
                    </motion.div>
                </div>

                {/* Sub-Header / Navigation */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '30px'
                }}>
                    <button
                        onClick={() => setActiveTab('submissions')}
                        style={{
                            padding: '15px 35px',
                            borderRadius: '16px',
                            border: 'none',
                            backgroundColor: activeTab === 'submissions' ? '#D4AF37' : 'rgba(255, 255, 255, 0.05)',
                            color: activeTab === 'submissions' ? '#000' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: activeTab === 'submissions' ? '0 10px 20px rgba(212,175,55,0.2)' : 'none'
                        }}
                    >
                        <Mail size={18} /> User Queries
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        style={{
                            padding: '15px 35px',
                            borderRadius: '16px',
                            border: 'none',
                            backgroundColor: activeTab === 'testimonials' ? '#D4AF37' : 'rgba(255, 255, 255, 0.05)',
                            color: activeTab === 'testimonials' ? '#000' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: '900',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: activeTab === 'testimonials' ? '0 10px 20px rgba(212,175,55,0.2)' : 'none'
                        }}
                    >
                        <Users size={18} /> Reviews Hub
                    </button>

                    <div style={{ flex: 1 }} />

                    <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Search size={16} color="rgba(255, 255, 255, 0.3)" />
                        <input
                            placeholder="SEARCH DATABASE..."
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                outline: 'none',
                                fontSize: '0.7rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                width: '200px'
                            }}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                height: '500px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                backgroundColor: 'rgba(15, 15, 15, 0.5)',
                                borderRadius: '32px',
                                border: '1px solid rgba(212, 175, 55, 0.1)',
                                marginTop: '20px'
                            }}
                        >
                            <div className="premium-spinner" />
                            <p style={{ marginTop: '20px', color: '#D4AF37', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem' }}>
                                Syncing Secure Database...
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            style={{
                                backgroundColor: 'rgba(15, 15, 15, 0.4)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '32px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                overflow: 'hidden',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
                            }}
                        >
                            {activeTab === 'submissions' && (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                                                <th style={tableHeaderStyle}>Source Detail</th>
                                                <th style={tableHeaderStyle}>Contact Information</th>
                                                <th style={tableHeaderStyle}>Message Content</th>
                                                <th style={tableHeaderStyle}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions.length === 0 ? (
                                                <tr><td colSpan="4" style={{ padding: '100px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.2)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Empty Secure Repository</td></tr>
                                            ) : (
                                                submissions.map((sub, idx) => (
                                                    <motion.tr
                                                        key={sub.id || idx}
                                                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                                                        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'all 0.2s' }}
                                                    >
                                                        <td style={tableCellStyle}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Calendar size={14} color="#D4AF37" />
                                                                </div>
                                                                <div>
                                                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700' }}>{new Date(sub.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                                    <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Entry ID: #{sub.id?.toString().slice(-4) || '---'}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={tableCellStyle}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                                                    <User size={14} color="#D4AF37" />
                                                                </div>
                                                                <div>
                                                                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: '#fff' }}>{sub.name}</p>
                                                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#D4AF37', fontWeight: '600' }}>{sub.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={tableCellStyle}>
                                                            <div style={{
                                                                maxWidth: '400px',
                                                                color: 'rgba(255, 255, 255, 0.7)',
                                                                fontSize: '0.9rem',
                                                                lineHeight: '1.6',
                                                                padding: '10px 15px',
                                                                backgroundColor: 'rgba(255,255,255,0.02)',
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.05)'
                                                            }}>
                                                                "{sub.message}"
                                                            </div>
                                                        </td>
                                                        <td style={tableCellStyle}>
                                                            <span style={{
                                                                padding: '6px 15px',
                                                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                                color: '#10b981',
                                                                borderRadius: '20px',
                                                                fontSize: '0.65rem',
                                                                fontWeight: '900',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '1px',
                                                                border: '1px solid rgba(16, 185, 129, 0.2)'
                                                            }}>
                                                                Verified
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'testimonials' && (
                                <div style={{ padding: '40px' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                                        gap: '25px'
                                    }}>
                                        {testimonials.length === 0 ? (
                                            <div style={{ gridColumn: '1/-1', padding: '100px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.2)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Zero Client Endorsements</div>
                                        ) : (
                                            testimonials.map((t) => (
                                                <motion.div
                                                    key={t.id}
                                                    whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                                                    style={{
                                                        backgroundColor: 'rgba(5, 5, 5, 0.6)',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        borderRadius: '24px',
                                                        padding: '30px',
                                                        position: 'relative',
                                                        transition: 'all 0.3s'
                                                    }}
                                                >
                                                    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                                        <button
                                                            onClick={() => handleDeleteTestimonial(t.id)}
                                                            style={{
                                                                width: '35px',
                                                                height: '35px',
                                                                borderRadius: '10px',
                                                                border: 'none',
                                                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                color: '#ef4444',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'all 0.2s'
                                                            }}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                                                        <div style={{ position: 'relative' }}>
                                                            <img
                                                                src={t.image}
                                                                alt={t.name}
                                                                style={{
                                                                    width: '65px',
                                                                    height: '65px',
                                                                    borderRadius: '20px',
                                                                    objectCover: 'cover',
                                                                    border: '2px solid #D4AF37'
                                                                }}
                                                            />
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '-5px',
                                                                right: '-5px',
                                                                backgroundColor: '#10b981',
                                                                width: '18px',
                                                                height: '18px',
                                                                borderRadius: '50%',
                                                                border: '2px solid #000'
                                                            }} />
                                                        </div>
                                                        <div>
                                                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', color: '#fff' }}>{t.name}</h3>
                                                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#D4AF37', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.role}</p>
                                                        </div>
                                                    </div>

                                                    <div style={{
                                                        position: 'relative',
                                                        padding: '20px',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                                        borderRadius: '16px',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                                    }}>
                                                        <MessageSquare
                                                            size={40}
                                                            color="rgba(212, 175, 55, 0.05)"
                                                            style={{ position: 'absolute', top: '10px', left: '10px' }}
                                                        />
                                                        <p style={{
                                                            margin: 0,
                                                            fontSize: '0.95rem',
                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                            lineHeight: '1.7',
                                                            fontStyle: 'italic',
                                                            position: 'relative',
                                                            zIndex: 1
                                                        }}>
                                                            "{t.text}"
                                                        </p>
                                                    </div>

                                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                                        <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.2)', fontWeight: '700' }}>
                                                            Sync Status: Publicly Visible
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Legend / Footer Information */}
                <div style={{
                    marginTop: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px',
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                            Live SQL Server
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
                            Encrypted JWT Auth
                        </div>
                    </div>
                    <div>
                        &copy; 2025 FIT PEOPLE GYM CRM v2.4.0
                    </div>
                </div>
            </div>

            <style>{`
                .premium-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(212, 175, 55, 0.1);
                    border-top: 4px solid #D4AF37;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input::placeholder {
                    color: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

const tableHeaderStyle = {
    padding: '25px 30px',
    fontSize: '0.7rem',
    fontWeight: '900',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: '2px'
};

const tableCellStyle = {
    padding: '30px',
    verticalAlign: 'middle'
};

export default AdminDashboard;
