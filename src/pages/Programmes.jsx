import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Programmes = () => {
    const { t } = useTranslation();
    const programmes = [
        {
            title: t('programmes.list.1_title'),
            desc: t('programmes.list.1_desc'),
            icon: 'ph-fire',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20'
        },
        {
            title: t('programmes.list.2_title'),
            desc: t('programmes.list.2_desc'),
            icon: 'ph-flower-tulip',
            color: 'text-sky-400',
            bg: 'bg-sky-500/10',
            border: 'border-sky-500/20'
        },
        {
            title: t('programmes.list.3_title'),
            desc: t('programmes.list.3_desc'),
            icon: 'ph-hand-heart',
            color: 'text-rose-400',
            bg: 'bg-rose-500/10',
            border: 'border-rose-500/20'
        },
        {
            title: t('programmes.list.4_title'),
            desc: t('programmes.list.4_desc'),
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
                        {t('programmes.title_1')} <span className="text-gradient">{t('programmes.title_2')}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {t('programmes.desc')}
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
