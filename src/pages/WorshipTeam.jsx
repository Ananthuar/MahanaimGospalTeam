import React from 'react';
import { motion } from 'framer-motion';

const WorshipTeam = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
                    >
                        Mahanaim Gospel <br /><span className="text-gradient">Worship Team</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 font-light leading-relaxed"
                    >
                        We produce musics, conduct worship leading services, and aim to bring transformative encounters with the Holy Spirit through anointed melodies.
                        Join us in lifting up His name with everything we have.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-sky-500 rounded-[2rem] blur-2xl opacity-20 animate-pulse pointer-events-none"></div>
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-square bg-[#0a0f1d]">
                            <img
                                src="/assets/images/_Prashanth_Gopinath_.jpeg"
                                alt="Prashanth Gopinath"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1516280440502-6cfa874ebf71?auto=format&fit=crop&w=800&q=80"; }}
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#060913] via-[#060913]/80 to-transparent p-10 flex flex-col justify-end">
                                <h3 className="text-3xl font-bold text-white mb-2">Prashanth Gopinath</h3>
                                <p className="text-amber-400 font-semibold tracking-wide uppercase text-sm">Worship Leader</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="glass-panel p-10">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-2xl mb-6">
                                <i className="ph-fill ph-music-notes"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">Original Productions</h4>
                            <p className="text-slate-400 text-base leading-relaxed font-light">
                                We write, compose, and produce original gospel music aiming to resource the global church. Our songs are birthed from our own times of prayer and intimate worship.
                            </p>
                        </div>

                        <div className="glass-panel p-10">
                            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-2xl mb-6">
                                <i className="ph-fill ph-microphone-stage"></i>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3">Worship Services</h4>
                            <p className="text-slate-400 text-base leading-relaxed font-light">
                                Hosting energetic and spiritually rich worship services to lead congregations into God's presence, focusing on authenticity, surrender, and prophetic flows.
                            </p>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <a href="https://www.youtube.com/@mahanaimgospelteam" target="_blank" rel="noreferrer" className="btn-primary">
                                <i className="ph-bold ph-youtube-logo text-xl"></i> Listen on YouTube
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default WorshipTeam;
