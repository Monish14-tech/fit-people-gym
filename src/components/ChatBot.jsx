import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Fit People AI Assistant. Ask me about training, nutrition, pricing, or gym info!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

    const getBotResponse = (text) => {
        const lower = text.toLowerCase();

        // --- NAVIGATION LOGIC ---
        if (lower.includes('plan') || lower.includes('price') || lower.includes('cost') || lower.includes('tariff') || lower.includes('membership')) {
            setTimeout(() => window.location.href = '/membership', 2000);
            return "Sure! Memberships start at Rs. 1,200/month. I'm taking you to our Membership Plans page right now...";
        }

        if (lower.includes('program') || lower.includes('train')) {
            setTimeout(() => window.location.href = '/programs', 2000);
            return "We offer Personal Training, Strength & Conditioning, and Cardio & HIIT. Redirecting you to our Programs page...";
        }

        if (lower.includes('about') || lower.includes('founder') || lower.includes('kumar')) {
            setTimeout(() => window.location.href = '/about', 2000);
            return "Mr. T. K. Kumar is our founder and Expert Head Trainer with 10+ years of experience. Taking you to the About page...";
        }

        if (lower.includes('contact') || lower.includes('call') || lower.includes('email')) {
            setTimeout(() => window.location.href = '/contact', 2000);
            return "You can reach us at +91 999 496 3940. Let me take you to the Contact page...";
        }

        if (lower.includes('visit') || lower.includes('location') || lower.includes('address') || lower.includes('map')) {
            setTimeout(() => window.location.href = '/visit', 2000);
            return "We are located at Kumaran Towers, Coimbatore. Redirecting you to our Visit page for the map...";
        }

        if (lower.includes('home')) {
            setTimeout(() => window.location.href = '/', 2000);
            return "Going back to the home page...";
        }

        // --- FITNESS QUERIES ---
        if (lower.includes('muscle') || lower.includes('bulk'))
            return "To build muscle, focus on compound lifts (squats, deadlifts, bench) and ensure you're in a slight calorie surplus with high protein intake (1.6g-2g per kg of body weight).";

        if (lower.includes('weight') || lower.includes('fat') || lower.includes('lose') || lower.includes('thin'))
            return "For weight loss, a calorie deficit is key. Combine strength training with HIIT and prioritize whole foods, high fiber, and lean protein.";

        if (lower.includes('protein'))
            return "Protein is essential for muscle repair. Good sources include eggs, paneer, chicken, lentils, and whey. Aim for 20-30g of protein per meal.";

        if (lower.includes('hello') || lower.includes('hi'))
            return "Hi there! How can I help you reach your fitness goals today?";

        return "That's a great question! For a more personalized answer, please talk to our Expert Trainer, Mr. T. K. Kumar, at the gym or contact us at +91 999 496 3940.";
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botText = getBotResponse(userMsg.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed', bottom: '90px', right: '20px',
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: 'var(--primary)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 1000, boxShadow: '0 8px 20px rgba(212, 175, 55, 0.4)',
                    color: '#000'
                }}
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={28} />}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        style={{
                            position: 'fixed', bottom: '160px', right: '20px',
                            width: '350px', height: '500px',
                            backgroundColor: 'rgba(15, 15, 15, 0.95)',
                            backdropFilter: 'blur(15px)',
                            borderRadius: '20px',
                            display: 'flex', flexDirection: 'column',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)', zIndex: 1001,
                            overflow: 'hidden', border: '1px solid var(--primary)'
                        }}
                    >
                        <div style={{ padding: '20px', background: 'linear-gradient(90deg, var(--primary), #FFD700)', color: 'black', fontWeight: '800', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>FIT PEOPLE AI</span>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000', boxShadow: '0 0 10px #000' }}></div>
                        </div>

                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map(m => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={m.id}
                                    style={{
                                        alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                                        backgroundColor: m.sender === 'user' ? 'var(--primary)' : '#222',
                                        color: m.sender === 'user' ? 'black' : 'white',
                                        padding: '12px 16px', borderRadius: m.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                                        maxWidth: '85%',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {m.text}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ alignSelf: 'flex-start', backgroundColor: '#222', color: 'var(--text-muted)', padding: '10px 15px', borderRadius: '15px', fontSize: '0.85rem' }}
                                >
                                    AI is thinking...
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} style={{ padding: '15px', borderTop: '1px solid #333', display: 'flex', gap: '10px', backgroundColor: '#0a0a0a' }}>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Type your query..."
                                style={{ flex: 1, padding: '12px 15px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '25px', color: 'white', outline: 'none', fontSize: '0.9rem' }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                style={{ backgroundColor: 'var(--primary)', border: 'none', color: 'black', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <FaPaperPlane size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
