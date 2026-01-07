import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Logo = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#000', // Background in case image is transparent
                border: '2px solid var(--primary)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img
                    src={logoImg}
                    alt="Fit People Logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover' // Forces image to cover the circle
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Logo;
