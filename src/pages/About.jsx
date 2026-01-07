import React from 'react';
import RevealOnScroll from '../components/RevealOnScroll';
import founderImg from '../assets/images/founder.jpg';

const About = () => {
    return (
        <div className="section-padding" style={{ paddingTop: '120px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <RevealOnScroll width="100%">
                    <h1 style={{ fontSize: '4rem', marginBottom: '40px' }}>ABOUT <span className="text-gold">US</span></h1>

                    <p style={{ maxWidth: '800px', margin: '0 auto 60px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        FIT PEOPLE GYM is the premier destination for serious fitness enthusiasts in Coimbatore.
                        We combine old-school hardcore training with modern luxury amenities.
                    </p>
                </RevealOnScroll>

                {/* Founder Section */}
                <RevealOnScroll width="100%">
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '40px',
                        borderRadius: '20px',
                        border: '1px solid #333',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{ marginBottom: '30px' }}>MEET THE <span className="text-gold">FOUNDER</span></h2>

                        <div style={{
                            width: '300px',
                            height: '400px',
                            borderRadius: '15px',
                            backgroundColor: '#333',
                            margin: '0 auto 30px',
                            border: '2px solid var(--primary)',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                        }}>
                            <img
                                src={founderImg}
                                alt="Mr. T. K. Kumar"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center 0%'
                                }}
                            />
                        </div>

                        <h3 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginBottom: '5px' }}>MR. T. K. KUMAR</h3>
                        <h4 style={{ color: 'var(--text-muted)' }}>Owner & Expert Head Trainer</h4>

                        <p style={{ marginTop: '20px', lineHeight: '1.6' }}>
                            With years of dedicated experience, Mr. T. K. Kumar founded this gym to provide elite-level training.
                            Specializing in body transformation and functional fitness, he has guided over 500 clients to success.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </div>
    );
};

export default About;
