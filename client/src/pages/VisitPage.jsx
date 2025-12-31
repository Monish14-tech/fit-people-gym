import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';

const VisitPage = () => {
    return (
        <div className="section-padding" style={{ paddingTop: '120px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <RevealOnScroll width="100%">
                    <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>VISIT <span className="text-gold">US</span></h1>

                    <p style={{ marginBottom: '40px', fontSize: '1.2rem' }}>
                        Come experience the vibe in person. First workout is on us.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll width="100%">
                    <div style={{ width: '100%', height: '500px', border: '2px solid var(--primary)', borderRadius: '10px', overflow: 'hidden' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4237.844842734628!2d76.847177!3d10.9962313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85e38475852b5%3A0x2e738076e98e26b2!2sFit%20People%20Gym!5e1!3m2!1sen!2sin!4v1767121411391!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Fit People Gym Location"
                        ></iframe>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll width="100%">
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', marginTop: '60px' }}>
                        <div>
                            <h3 className="text-gold">ADDRESS</h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                11/1-2, KUMARAN TOWERS, <br />
                                THONDAMUTHUR ROAD, KULATHUPALAYAM, <br />
                                COIMBATORE - 641109.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-gold">VISITING HOURS</h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                5.30 am to 9.30 am <br />
                                5.00 pm to 9.00 pm <br />
                                <strong>Sunday Holiday</strong>
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default VisitPage;
