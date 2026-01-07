import React from 'react';
import { motion } from 'framer-motion';
import { FaDumbbell, FaWeightHanging, FaRunning, FaFistRaised, FaHeartbeat, FaStopwatch, FaTrophy, FaMedal } from 'react-icons/fa';
import { GiBiceps, GiGymBag, GiWaterBottle } from 'react-icons/gi';

const BackgroundDecorations = () => {
    // Increased opacity and size for better visibility as requested
    const iconStyle = {
        position: 'absolute',
        color: 'var(--primary)',
        opacity: 0.15, // Increased from ~0.1
        filter: 'blur(1px)', // Reduced blur slightly for visibility
        zIndex: -1
    };

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>

            {/* Top Left - Dumbbell */}
            <motion.div
                animate={{ y: [0, -40, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, top: '10%', left: '5%', fontSize: '14rem' }}
            >
                <FaDumbbell />
            </motion.div>

            {/* Bottom Right - Weight */}
            <motion.div
                animate={{ y: [0, 50, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, bottom: '5%', right: '5%', fontSize: '16rem', opacity: 0.12 }}
            >
                <FaWeightHanging />
            </motion.div>

            {/* Mid Right - Running */}
            <motion.div
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ ...iconStyle, top: '45%', right: '10%', fontSize: '10rem', color: '#444', opacity: 0.1 }}
            >
                <FaRunning />
            </motion.div>

            {/* Bottom Left - Fist */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, bottom: '25%', left: '8%', fontSize: '11rem', color: 'var(--primary)' }}
            >
                <FaFistRaised />
            </motion.div>

            {/* Top Center - Stopwatch */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ ...iconStyle, top: '5%', left: '45%', fontSize: '8rem', opacity: 0.08 }}
            >
                <FaStopwatch />
            </motion.div>

            {/* Mid Left - Heartbeat */}
            <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, top: '60%', left: '-5%', fontSize: '18rem', opacity: 0.05, color: '#333' }}
            >
                <FaHeartbeat />
            </motion.div>

            {/* Top Right - Trophy */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, top: '20%', right: '30%', fontSize: '9rem', opacity: 0.1 }}
            >
                <FaTrophy />
            </motion.div>

            {/* Bottom Center - Biceps */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ ...iconStyle, bottom: '-5%', left: '50%', fontSize: '15rem', opacity: 0.08, color: '#222', transform: 'translateX(-50%)' }}
            >
                <GiBiceps />
            </motion.div>

        </div>
    );
};

export default BackgroundDecorations;
