import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use environment variable or fallback to localhost
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        axios.get(`${apiUrl}/api/testimonials`)
            .then(res => {
                setTestimonials(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch testimonials", err);
                // Fallback data if API fails
                setTestimonials([
                    { id: 1, name: "MONISH", role: "Athlete", text: "Training here changed my life. The vibe is unmatched!" },
                    { id: 2, name: "ARUN KUMAR", role: "Member", text: "Best equipment in the city. Highly recommend for serious lifters." }
                ]);
                setLoading(false);
            });
    }, []);

    return (
        <section className="section-padding" style={{ backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <span style={{
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        display: 'block',
                        marginBottom: '15px'
                    }}>
                        Testimonials
                    </span>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-2px', margin: 0 }}>
                        CLIENT <span className="text-gold">STORIES</span>
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '4px',
                        backgroundColor: 'var(--primary)',
                        margin: '25px auto',
                        borderRadius: '2px'
                    }} />
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                    position: 'relative',
                    zIndex: 2
                }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id || i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                                backdropFilter: 'blur(10px)',
                                padding: '45px 35px',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <FaQuoteLeft size={30} style={{ color: 'var(--primary)', opacity: '0.2', marginBottom: '25px' }} />

                            <p style={{
                                fontStyle: 'italic',
                                marginBottom: '40px',
                                lineHeight: '1.8',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '1.05rem',
                                flex: 1
                            }}>
                                "{t.text}"
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '25px' }}>
                                {t.image && (
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '15px',
                                            objectFit: 'cover',
                                            border: '2px solid rgba(212, 175, 55, 0.2)'
                                        }}
                                    />
                                )}
                                <div>
                                    <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase' }}>{t.name}</h4>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
