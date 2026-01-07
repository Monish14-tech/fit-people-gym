import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Stats from '../components/Stats';
import RevealOnScroll from '../components/RevealOnScroll';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />

            <RevealOnScroll width="100%">
                <Stats />
            </RevealOnScroll>

            <RevealOnScroll width="100%">
                <Features />
            </RevealOnScroll>

            <RevealOnScroll width="100%">
                <Testimonials />
            </RevealOnScroll>

            <RevealOnScroll width="100%">
                <Contact />
            </RevealOnScroll>
        </div>
    );
};

export default Home;
