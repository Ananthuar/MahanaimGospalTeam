import React from 'react';
import { motion } from 'framer-motion';

const Programmes = () => {
    const programmes = [
        {
            title: 'Youth Ministry "Ignite"',
            desc: 'Empowering the next generation to be passionate followers of Christ through engaging sessions, music, and mentorship.',
            icon: 'ph-fire',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20'
        },
        {
            title: 'Women of Grace',
            desc: 'A fellowship dedicated to strengthening the faith of women, providing support, prayer circles, and biblical teachings.',
            icon: 'ph-flower-tulip',
            color: 'text-sky-400',
            bg: 'bg-sky-500/10',
            border: 'border-sky-500/20'
        },
        {
            title: 'Community Outreach',
            desc: 'Going beyond our walls to serve the local community. Food drives, educational support, and sharing hope where it is needed most.',
            icon: 'ph-hand-heart',
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20'
        },
        {
            title: 'Global Missions',
            desc: 'Supporting missionaries worldwide and conducting short-term trips to preach the gospel and establish new communities of believers.',
            icon: 'ph-globe-stand',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20'
        }
    ];

    return (
        <div className="w-full py-24 relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
                    >
                        Our <span className="text-gradient">Programmes</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Discover the various ministries and programmes we offer. There's a place for everyone to serve, grow, and connect.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {programmes.map((prog, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-panel p-10 flex gap-6"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex-shrink-0 ${prog.bg} ${prog.color} ${prog.border} border flex items-center justify-center text-3xl mb-4`}>
                                <i className={`ph-fill ${prog.icon}`}></i>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{prog.title}</h3>
                                <p className="text-slate-400 text-base leading-relaxed font-light">{prog.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Programmes;
