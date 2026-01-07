import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Key, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import BackgroundDecorations from '../components/BackgroundDecorations';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/api/admin/login`, {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                position: 'relative',
                overflow: 'hidden',
                padding: '20px'
            }}
        >
            <BackgroundDecorations />

            {/* Premium Multi-Layered Glow Effects */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                {/* Main Card */}
                <div style={{
                    backgroundColor: 'rgba(15, 15, 15, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: '24px',
                    padding: '50px 40px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1)',
                    textAlign: 'center'
                }}>
                    {/* Icon Header */}
                    <div style={{ marginBottom: '40px' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#D4AF37',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                margin: '0 auto 20px',
                                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                                position: 'relative'
                            }}
                        >
                            <Lock color="#000" size={36} style={{ margin: 'auto' }} />
                        </motion.div>

                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '-1px',
                            margin: '0 0 5px 0',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            Admin <span style={{ color: '#D4AF37' }}>Portal</span>
                        </h1>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            color: 'rgba(255, 255, 255, 0.4)'
                        }}>
                            <ShieldCheck size={14} />
                            <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Authorized Access Only
                            </span>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '12px',
                                padding: '15px',
                                marginBottom: '30px',
                                color: '#f87171',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ position: 'relative', textAlign: 'left' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                color: '#D4AF37',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginLeft: '5px'
                            }}>
                                Username
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '16px',
                                        padding: '18px 20px 18px 55px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                    placeholder="Admin login ID"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ position: 'relative', textAlign: 'left' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                color: '#D4AF37',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginLeft: '5px'
                            }}>
                                Security Pin
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Key size={18} style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '16px',
                                        padding: '18px 60px 18px 55px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                                    placeholder="Secret code"
                                    required
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s',
                                        zIndex: 10,
                                        padding: '10px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#D4AF37';
                                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: '#e5bc4a' }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                backgroundColor: '#D4AF37',
                                color: '#000',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '20px',
                                fontSize: '1rem',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                marginTop: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 15px 30px rgba(212, 175, 55, 0.2)'
                            }}
                        >
                            {isLoading ? (
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '3px solid #000',
                                    borderTopColor: 'transparent',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                            ) : (
                                <>Verify & Enter <Lock size={18} /></>
                            )}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '30px', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8rem' }}>
                        &copy; 2025 FIT PEOPLE GYM | PREMIUM ACCESS
                    </div>
                </div>
            </motion.div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
