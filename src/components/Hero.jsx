import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll'; // Or router link depending on design, using scroll for "Join Now" usually

const Hero = () => {
    return (
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Video Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-out-on-a-gym-machine-1616-large.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1.1', marginBottom: '20px' }}
                >
                    BEGIN YOUR <br />
                    <span className="text-gold">LEGACY</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto 40px' }}
                >
                    Join the most elite fitness community in Coimbatore. Premium equipment, expert training, and an atmosphere of greatness.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                    onClick={() => window.location.href = '/contact'}
                >
                    Start Your Journey
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
