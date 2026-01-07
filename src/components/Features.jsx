import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaHeartbeat, FaUsers, FaMedal, FaTimes } from 'react-icons/fa';

const FeatureCard = ({ icon, title, desc, delay, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)', scale: 1.02 }}
            onClick={onClick}
            style={{
                backgroundColor: 'var(--bg-card)',
                padding: '40px 20px',
                borderRadius: '10px',
                textAlign: 'center',
                border: '1px solid #333',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '20px' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
            <motion.div
                style={{
                    marginTop: '20px',
                    fontSize: '0.9rem',
                    color: 'var(--primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 'bold'
                }}
            >
                Read More
            </motion.div>
        </motion.div>
    );
};

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);

    const features = [
        {
            icon: <FaDumbbell />,
            title: 'Premium Equipment',
            desc: 'State-of-the-art machinery from top global brands.',
            details: 'Our gym is equipped with the latest Hammer Strength and Life Fitness machines. Each piece is regularly maintained to ensure smooth biomechanics and safety. Whether you are powerlifting or bodybuilding, we have the specialized equipment you need.'
        },
        {
            icon: <FaMedal />,
            title: 'Expert Trainers',
            desc: 'Certified professionals to guide your every rep.',
            details: 'Our trainers are not just enthusiastic; they are certified professionals with years of experience. They provide personalized workout plans, nutritional guidance, and form correction to ensure you reach your goals safely and efficiently.'
        },
        {
            icon: <FaHeartbeat />,
            title: 'Holistic Wellness',
            desc: 'Programs designed for strength, endurance, and longevity.',
            details: 'We believe fitness is more than just big muscles. Our holistic approach includes mobility work, cardiovascular health, and stress management techniques. We offer yoga and recovery sessions to keep your body functioning at its peak.'
        },
        {
            icon: <FaUsers />,
            title: 'Elite Community',
            desc: 'Surround yourself with motivated individuals.',
            details: 'Join a community of like-minded individuals who push each other to be better. Our culture is one of respect, hard work, and mutual support. From group classes to social events, you will find your tribe here.'
        }
    ];

    return (
        <section className="section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '3rem' }}>WHY CHOOSE <span className="text-gold">US</span></h2>
                    <p style={{ color: 'var(--text-muted)' }}>Redefining fitness standards in Coimbatore</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} delay={i * 0.1} onClick={() => setSelectedFeature(f)} />
                    ))}
                </div>

                <AnimatePresence>
                    {selectedFeature && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                                display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
                            }}
                            onClick={() => setSelectedFeature(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    backgroundColor: '#1a1a10',
                                    padding: '40px',
                                    borderRadius: '15px',
                                    maxWidth: '600px',
                                    width: '100%',
                                    position: 'relative',
                                    border: '1px solid var(--primary)',
                                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    style={{
                                        position: 'absolute', top: '20px', right: '20px',
                                        background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
                                    }}
                                >
                                    <FaTimes />
                                </button>
                                <div style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '20px' }}>
                                    {selectedFeature.icon}
                                </div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{selectedFeature.title}</h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ddd' }}>
                                    {selectedFeature.details}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Features;
