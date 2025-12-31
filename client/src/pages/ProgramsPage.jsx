import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from '../components/RevealOnScroll';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

const ProgramsPage = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);

    const programs = [
        {
            title: "Personal Training",
            desc: "One-on-one coaching tailored to your specific goals.",
            img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format",
            details: "Our personal training program provides you with a dedicated coach who creates a customized workout plan based on your body type, goals, and schedule. Includes regular progress tracking, form correction, and nutritional advice.",
            benefits: ["Customized Workout Plans", "Nutritional Guidance", "Real-time Form Correction", "Flexible Scheduling"]
        },
        {
            title: "Strength & Conditioning",
            desc: "Build raw power and athletic performance.",
            img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format",
            details: "Focus on building pure strength and explosive power. Ideal for athletes or anyone looking to get stronger. Uses compound movements (squat, bench, deadlift) and functional training methods.",
            benefits: ["Increase Raw Power", "Improve Athleticism", "Injury Prevention", "Advanced Lifting Techniques"]
        },
        {
            title: "Cardio & HIIT",
            desc: "High intensity sessions to burn fat and boost endurance.",
            img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=500&auto=format",
            details: "High-Intensity Interval Training designed to torch calories and improve cardiovascular health. Short, intense bursts of exercise followed by rest periods. Perfect for fat loss and conditioning.",
            benefits: ["Maximum Calorie Burn", "Improved Heart Health", "Time Efficient", "Boost Metabolism"]
        },
        {
            title: "Transformation",
            desc: "Complete lifestyle overhaul for dramatic results.",
            img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format",
            details: "Our flagship 12-week transformation program. We control every variable: training, diet, sleep, and accountability. Designed for those who want serious, visible results in the shortest time possible.",
            benefits: ["Complete Lifestyle Audit", "24/7 Support", "Weekly Check-ins", "Guaranteed Results"]
        }
    ];

    return (
        <div className="section-padding" style={{ paddingTop: '120px' }}>
            <div className="container">
                <RevealOnScroll width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem' }}>OUR <span className="text-gold">PROGRAMS</span></h1>
                        <p style={{ color: 'var(--text-muted)' }}>Designed for every level of athlete.</p>
                    </div>
                </RevealOnScroll>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {programs.map((p, i) => (
                        <RevealOnScroll key={i} width="100%">
                            <motion.div
                                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}
                                onClick={() => setSelectedProgram(p)}
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    border: '1px solid #333',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ position: 'relative', height: '250px' }}>
                                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                                        display: 'flex', alignItems: 'flex-end', padding: '20px'
                                    }}>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>READ MORE</span>
                                    </div>
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{p.title}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
                                </div>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>

            </div>

            <AnimatePresence>
                {selectedProgram && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backdropFilter: 'blur(5px)'
                        }}
                        onClick={() => setSelectedProgram(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#111',
                                borderRadius: '20px',
                                maxWidth: '800px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                border: '1px solid var(--primary)',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedProgram(null)}
                                style={{
                                    position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                                    background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <FaTimes />
                            </button>

                            <div style={{ height: '300px', width: '100%', flexShrink: 0 }}>
                                <img src={selectedProgram.img} alt={selectedProgram.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ padding: '40px' }}>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--primary)' }}>{selectedProgram.title}</h2>
                                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '30px' }}>
                                    {selectedProgram.details}
                                </p>

                                <h3 style={{ marginBottom: '20px' }}>What You Get:</h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                    {selectedProgram.benefits.map((benefit, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                                            <FaCheckCircle color="var(--primary)" /> {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="btn-primary"
                                    style={{ marginTop: '40px', width: '100%', padding: '15px' }}
                                    onClick={() => window.location.href = '/contact'}
                                >
                                    JOIN THIS PROGRAM
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProgramsPage;
