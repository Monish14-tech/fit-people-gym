import React from 'react';
import Contact from '../components/Contact';
import RevealOnScroll from '../components/RevealOnScroll';

const ContactPage = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px' }}>
                <RevealOnScroll width="100%">
                    <h1>CONTACT <span className="text-gold">US</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>We'd love to hear from you.</p>
                </RevealOnScroll>
            </div>

            <RevealOnScroll width="100%">
                <Contact />
            </RevealOnScroll>

            <div className="container" style={{ textAlign: 'center', paddingBottom: '80px' }}>
                <RevealOnScroll width="100%">
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
                        <div>
                            <h4 className="text-gold">CONTACT</h4>
                            <p>T. K. KUMAR</p>
                        </div>
                        <div>
                            <h4 className="text-gold">PHONE</h4>
                            <p>+91 999 496 3940</p>
                        </div>
                        <div>
                            <h4 className="text-gold">HOURS</h4>
                            <p>Timing: 5.30 am to 9.30 am<br />5.00 pm to 9.00 pm<br />Sunday: Holiday</p>
                        </div>
                        <div>
                            <h4 className="text-gold">PERSONAL TRAINING</h4>
                            <p>10.00 AM TO 1.00 PM</p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default ContactPage;
