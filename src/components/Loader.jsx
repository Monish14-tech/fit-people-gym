import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999
        }}>
            <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Outer Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '3px solid transparent',
                        borderTopColor: 'var(--primary)',
                        borderRightColor: 'rgba(212, 175, 55, 0.5)',
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                    }}
                />

                {/* Inner Spinning Ring (Reverse) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: '85%',
                        height: '85%',
                        borderRadius: '50%',
                        border: '2px solid transparent',
                        borderBottomColor: 'var(--primary)',
                        opacity: 0.7
                    }}
                />

                {/* Central Pulsing Logo Image */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden', // STRICTLY ENFORCE CIRCLE
                        backgroundColor: '#000',
                        border: '2px solid var(--primary)',
                        boxShadow: '0 0 20px rgba(0,0,0,0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={logoImg}
                        alt="Loading..."
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover' // Ensure it fills the circle
                        }}
                    />
                </motion.div>
            </div>

            <motion.div
                style={{ marginTop: '30px', textAlign: 'center' }}
            >
                <motion.h2
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        color: 'var(--primary)',
                        letterSpacing: '8px',
                        fontSize: '1.5rem',
                        textShadow: '0 0 10px var(--primary)',
                        fontFamily: 'Oswald, sans-serif'
                    }}
                >
                    LOADING
                </motion.h2>
            </motion.div>
        </div>
    );
};

export default Loader;
