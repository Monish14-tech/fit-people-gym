import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const Stats = () => {
    const stats = [
        { num: 250, label: "Active Members", suffix: "+" },
        { num: 10, label: "Expert Trainers", suffix: "+" },
        { num: 10, label: "Years Experience", suffix: "+" },
        { num: 100, label: "Transformations", suffix: "%" }
    ];

    return (
        <section style={{ backgroundColor: '#000', padding: '60px 0', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: '40px' }}>
                {stats.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ textAlign: 'center' }}
                    >
                        <h2 style={{ fontSize: '3.5rem', color: 'var(--primary)', margin: 0, lineHeight: 1 }}>
                            <CountUp end={item.num} duration={2.5} enableScrollSpy />
                            {item.suffix}
                        </h2>
                        <p style={{ color: '#fff', fontSize: '1.1rem', marginTop: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
