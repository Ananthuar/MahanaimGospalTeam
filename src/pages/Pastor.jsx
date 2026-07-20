import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Pastor = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
                    >
                        {t('pastor.title_1')} <span className="text-gradient">{t('pastor.title_2')}</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-1 bg-amber-400 mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-tr from-amber-200 to-amber-600 rounded-3xl blur-xl opacity-30"></div>
                        <div className="relative glass-panel rounded-3xl aspect-[3/4] flex items-center justify-center overflow-hidden group">
                            <img
                                src="/assets/images/pastor.jpg"
                                alt="Pastor Jimshu Varghese"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"; }}
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#060913] via-[#060913]/80 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-1">{t('pastor.bio_title')}</h2>
                            <p className="text-amber-400 uppercase tracking-widest text-sm font-semibold mb-6">{t('pastor.badge')}</p>
                            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                                <p>
                                    {t('pastor.bio_1')}
                                </p>
                                <p>
                                    {t('pastor.bio_2')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <a href="#message" className="btn-primary py-3 px-8 text-sm">Read Latest Message</a>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="glass-panel p-6 text-center">
                                <h4 className="text-3xl font-bold text-gradient mb-1">20+</h4>
                                <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">Years Served</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <h4 className="text-3xl font-bold text-gradient-alt mb-1">50+</h4>
                                <p className="text-xs text-slate-400 uppercase font-medium tracking-wider">Global Missions</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Pastor;
