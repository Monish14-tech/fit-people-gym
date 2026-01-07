import React from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import RevealOnScroll from '../components/RevealOnScroll';

const MembershipPage = () => {
    const plans = [
        { duration: "Monthly", amount: "Rs. 1,200/-", features: ["Access to all gym equipment", "Locker facility", "Initial fitness assessment"] },
        { duration: "3 Months", amount: "Rs. 2,500/-", features: ["Access to all gym equipment", "Locker facility", "Initial fitness assessment", "Discounted personal training"] },
        { duration: "6 Months", amount: "Rs. 4,000/-", features: ["Access to all gym equipment", "Locker facility", "Initial fitness assessment", "Priority personal training scheduling"] },
        { duration: "1 Year", amount: "Rs. 5,000/-", features: ["Access to all gym equipment", "Locker facility", "Initial fitness assessment", "Best value", "Complimentary gym T-shirt"] }
    ];

    const handlePayment = async (plan) => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const amount = parseInt(plan.amount.replace(/[^0-9]/g, ''));

        try {
            // 1. Create Order on Backend
            const { data: order } = await axios.post(`${apiUrl}/api/payment/order`, {
                amount,
                planName: plan.duration,
                upiId: 'kumarfitpeople-1@okicici'
            });

            // 2. Open Razorpay Checkout Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
                amount: order.amount,
                currency: order.currency,
                name: "FIT PEOPLE GYM",
                description: `Payment for ${plan.duration} plan`,
                order_id: order.id,
                notes: {
                    merchant_upi: 'kumarfitpeople-1@okicici'
                },
                handler: async (response) => {
                    try {
                        // 3. Verify Payment on Backend
                        const { data: verification } = await axios.post(`${apiUrl}/api/payment/verify`, response);
                        if (verification.success) {
                            alert('Thank you! Your payment was successful. Welcome to the elite community.');
                            window.location.href = '/';
                        }
                    } catch (err) {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: "Member Name",
                    email: "member@example.com",
                    contact: "9999999999"
                },
                theme: { color: "#D4AF37" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error('Payment Error:', err);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div className="section-padding" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <RevealOnScroll width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem' }}>MEMBERSHIP <span className="text-gold">PLANS</span></h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Choose the plan that fits your goals and lifestyle.</p>
                    </div>
                </RevealOnScroll>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    {plans.map((plan, index) => (
                        <RevealOnScroll key={index} width="100%">
                            <motion.div
                                whileHover={{ y: -10, borderColor: 'var(--primary)' }}
                                style={{
                                    backgroundColor: 'var(--bg-card)',
                                    borderRadius: '20px',
                                    padding: '40px',
                                    textAlign: 'center',
                                    border: '1px solid #333',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{plan.duration}</h2>
                                <h3 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>{plan.amount}</h3>

                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', textAlign: 'left', flex: 1 }}>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} style={{ marginBottom: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: 'var(--primary)' }}>✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="btn-primary"
                                    style={{ width: '100%' }}
                                    onClick={() => handlePayment(plan)}
                                >
                                    JOIN NOW
                                </button>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>

                <RevealOnScroll width="100%">
                    <div style={{ marginTop: '80px', textAlign: 'center', padding: '40px', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: '20px', border: '1px dashed var(--primary)' }}>
                        <h3 className="text-gold">Special Student Offers Available!</h3>
                        <p style={{ marginTop: '10px' }}>Contact us with your ID card to learn more about our student discounts.</p>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default MembershipPage;
