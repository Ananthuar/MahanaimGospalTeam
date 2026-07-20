import React from 'react';
import { motion } from 'framer-motion';

const WorshipCenter = () => {
    return (
        <div className="w-full py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
                    >
                        Mahanaim Gospel <span className="text-gradient">Worship Center</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 font-light leading-relaxed"
                    >
                        A place of revival, healing, and intimate worship. Join our community and experience the presence of God in every service.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-10"
                    >
                        <h3 className="text-3xl font-bold mb-8">Service Timings</h3>
                        <ul className="space-y-4 mb-4">
                            <li className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                                <span className="font-semibold text-lg text-white">Sunday Worship</span>
                                <span className="text-amber-400 font-bold bg-amber-500/10 px-4 py-1.5 rounded-full text-sm">08:30 AM</span>
                            </li>
                            <li className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                                <span className="font-semibold text-lg text-white flex items-center gap-2">Tuesday Special Prayer</span>
                                <span className="text-sky-400 font-bold bg-sky-500/10 px-4 py-1.5 rounded-full text-sm">10:30 AM</span>
                            </li>
                            <li className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                                <span className="font-semibold text-lg text-white">Friday Special Online Meetings</span>
                                <span className="text-amber-400 font-bold bg-amber-500/10 px-4 py-1.5 rounded-full text-sm">07:30 PM</span>
                            </li>
                            <li className="flex justify-between items-center bg-white/[0.03] p-5 rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                                <span className="font-semibold text-lg text-white">Saturday Night Prayer</span>
                                <span className="text-indigo-400 font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full text-sm">07:00 PM</span>
                            </li>
                        </ul>
                        <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:bg-white/[0.06] transition-colors flex items-center gap-3">
                            <i className="ph-light ph-info text-slate-400 text-xl"></i>
                            <span className="font-light text-sm text-slate-300">Other meetings as announced.</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-[#0a0f1d] flex flex-col items-center justify-center p-10 text-center">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-10"></div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-amber-500/10 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mb-6 mx-auto text-amber-400 border border-amber-500/20 shadow-[0_0_30px_rgba(245,166,35,0.2)]">
                                    <i className="ph-fill ph-map-pin"></i>
                                </div>
                                <h4 className="text-2xl font-bold mb-3 text-white">Visit Us Today</h4>
                                <p className="text-slate-400 text-base mb-8 max-w-sm font-light">Find us at our central location and become part of the family.</p>
                                <a href="https://maps.app.goo.gl/Bf3tqkgq58LdWEpx5" target="_blank" rel="noreferrer" className="btn-primary inline-flex text-sm">
                                    Open in Maps
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WorshipCenter;
