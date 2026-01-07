import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#050505', padding: '40px 0', borderTop: '1px solid #222', textAlign: 'center' }}>
            <div className="container">
                <div style={{ marginBottom: '20px' }}>
                    <h2 className="text-gold" style={{ margin: 0 }}>FIT PEOPLE GYM</h2>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                    <a
                        href="https://www.instagram.com/fitpeople_cbe?igsh=c2YzbnR4YWpsdzJo"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white', transition: 'color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#E1306C'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <FaInstagram size={30} />
                    </a>

                    <a
                        href="https://www.facebook.com/share/1EgSeSWAWf/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white', transition: 'color 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#1877F2'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                    >
                        <FaFacebook size={30} />
                    </a>
                </div>

                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} FIT PEOPLE GYM. All rights reserved. <br />
                    Powered by Premium Fitness.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
