import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const [showMessage, setShowMessage] = useState(false);

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="min-h-[80vh] flex items-center justify-center pt-10 relative">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="text-sm text-slate-300 font-medium truncate max-w-full">{t('home.welcome')}</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
                            {t('home.hero_h1_1')} <br /> {t('home.hero_h1_2')} <span className="text-gradient">{t('home.hero_h1_3')} <br /> {t('home.hero_h1_4')}</span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-light">
                            {t('home.hero_desc')}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <a href="#contact" className="btn-primary">
                                {t('home.btn_join')} <i className="ph-bold ph-arrow-right"></i>
                            </a>
                            <a href="#about" className="btn-secondary flex items-center gap-2">
                                {t('home.btn_learn')} <i className="ph-bold ph-arrow-down"></i>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative lg:h-[600px] flex items-center justify-center p-8 lg:p-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-sky-500/10 blur-3xl rounded-full"></div>

                        <div className="relative glass-panel p-8 w-full max-w-sm mx-auto grid gap-6">
                            <div className="flex bg-white/[0.03] p-5 rounded-2xl border border-white/5 items-center gap-5 hover:bg-white/[0.06] transition-colors">
                                <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl border border-amber-500/20">
                                    <i className="ph-fill ph-calendar-star"></i>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-white tracking-tight">20+</h4>
                                    <p className="text-slate-400 text-sm font-medium">{t('home.stats.years')}</p>
                                </div>
                            </div>

                            <div className="flex bg-white/[0.03] p-5 rounded-2xl border border-white/5 items-center gap-5 hover:bg-white/[0.06] transition-colors">
                                <div className="w-14 h-14 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 text-2xl border border-sky-500/20">
                                    <i className="ph-fill ph-users-three"></i>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-white tracking-tight">250+</h4>
                                    <p className="text-slate-400 text-sm font-medium">{t('home.stats.events')}</p>
                                </div>
                            </div>

                            <a href="https://maps.app.goo.gl/Bf3tqkgq58LdWEpx5" target="_blank" rel="noreferrer" className="w-full py-4 rounded-xl bg-white/[0.05] border border-white/10 text-center font-semibold text-slate-300 hover:bg-white/[0.1] hover:text-white transition-all flex justify-center items-center gap-2 mt-2">
                                <i className="ph-bold ph-map-pin"></i> {t('home.btn_directions')}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="py-32 relative text-center flex flex-col items-center">
                <div className="container mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t('home.who_we_are')} <span className="text-gradient">{t('home.who_we_are_highlight')}</span></h2>
                        <div className="w-20 h-1 bg-amber-500/50 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            {
                                image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80',
                                fallback: 'https://placehold.co/600x400/060913/f5a623?text=Worship+Music',
                                title: t('home.features.music_title'),
                                desc: t('home.features.music_desc')
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1529070538774-1843cb161bfe?auto=format&fit=crop&w=600&q=80',
                                fallback: 'https://placehold.co/600x400/060913/f5a623?text=Global+Outreach',
                                title: t('home.features.outreach_title'),
                                desc: t('home.features.outreach_desc')
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=600&q=80',
                                fallback: 'https://placehold.co/600x400/060913/f5a623?text=Training',
                                title: t('home.features.training_title'),
                                desc: t('home.features.training_desc')
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="glass-panel p-6 group relative"
                            >
                                <div className="w-full h-56 rounded-xl overflow-hidden mb-6 relative border border-white/5">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.target.onerror = null; e.target.src = feature.fallback; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/90 via-[#060913]/20 to-transparent"></div>
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-slate-400 text-base leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-32 relative overflow-hidden bg-slate-900/20">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="glass-panel p-10 md:p-16 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t('home.contact_title')} <span className="text-gradient">{t('home.contact_title_highlight')}</span></h2>
                            <p className="text-slate-400 mb-10 max-w-md text-lg font-light leading-relaxed">
                                {t('home.contact_desc')}
                            </p>

                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl text-amber-400">
                                        <i className="ph-light ph-envelope-simple"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{t('home.email_us')}</h4>
                                        <a href="mailto:mahanaimgospelteam@gmail.com" className="text-slate-400 hover:text-amber-400 transition-colors">mahanaimgospelteam@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-2xl text-amber-400">
                                        <i className="ph-light ph-phone"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{t('home.call_us')}</h4>
                                        <a href="tel:9496419741" className="text-slate-400 hover:text-amber-400 transition-colors">+91 94964 19741</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full bg-black/20 p-8 rounded-3xl border border-white/5">
                            <form className="flex flex-col gap-5" onSubmit={(e) => {
                                e.preventDefault();
                                setShowMessage(true);
                                setTimeout(() => setShowMessage(false), 7000);
                            }}>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">{t('home.form_name')}</label>
                                    <input type="text" className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600 text-lg" placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 mt-2 uppercase tracking-wide">{t('home.form_email')}</label>
                                    <input type="email" className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600 text-lg" placeholder="hello@example.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2 mt-2 uppercase tracking-wide">{t('home.form_message')}</label>
                                    <textarea rows="3" className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors placeholder-slate-600 text-lg resize-none" placeholder="How can we help you?" required></textarea>
                                </div>

                                <AnimatePresence>
                                    {showMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-4 rounded-xl text-sm font-medium flex items-start gap-3 mt-2"
                                        >
                                            <i className="ph-fill ph-info text-xl translate-y-0.5"></i>
                                            <p>{t('home.form_alert')}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-[#060913] font-bold py-4 rounded-xl mt-4 flex justify-center items-center gap-3 transition-colors text-lg shadow-lg shadow-amber-500/20">
                                    {t('home.form_send')} <i className="ph-bold ph-paper-plane-right"></i>
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
