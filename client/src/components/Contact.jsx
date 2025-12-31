import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        try {
            await axios.post(`${apiUrl}/api/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Submission failed", error);
            setStatus('error');
        }
    };

    return (
        <section className="section-padding">
            <div className="container" style={{ maxWidth: '600px' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <h2 style={{ fontSize: '3rem' }}>GET IN <span className="text-gold">TOUCH</span></h2>
                </motion.div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '15px', backgroundColor: '#151515', border: '1px solid #333', color: 'white', outline: 'none' }}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ padding: '15px', backgroundColor: '#151515', border: '1px solid #333', color: 'white', outline: 'none' }}
                    />
                    <textarea
                        rows="5"
                        placeholder="Message"
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        style={{ padding: '15px', backgroundColor: '#151515', border: '1px solid #333', color: 'white', outline: 'none' }}
                    ></textarea>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>SEND MESSAGE</button>

                    {status === 'success' && <p style={{ color: 'var(--primary)', textAlign: 'center' }}>Message sent successfully!</p>}
                    {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Failed to send. Please try again.</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
