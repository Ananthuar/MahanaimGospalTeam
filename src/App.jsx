import React from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { List, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Home from './pages/Home'
import WorshipCenter from './pages/WorshipCenter'
import Programmes from './pages/Programmes'
import WorshipTeam from './pages/WorshipTeam'
import Pastor from './pages/Pastor'

const Navbar = () => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = React.useState(false)
    const location = useLocation()

    const links = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.worship_center'), path: '/worship-center' },
        { name: t('nav.programmes'), path: '/programmes' },
        { name: t('nav.worship_team'), path: '/worship-team' },
        { name: t('nav.pastor'), path: '/pastor' },
    ]

    const toggleLang = () => {
        const nextLang = i18n.language === 'en' ? 'ml' : 'en';
        i18n.changeLanguage(nextLang);
        localStorage.setItem('i18nextLng', nextLang);
    };

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    }

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-[#060913]/90 backdrop-blur-2xl border-b border-white/5">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 relative z-10 group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-amber-500/30 bg-amber-500/10 transition-transform group-hover:scale-105">
                        <img src="/assets/images/icon.png" alt="Mahanaim Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white flex flex-col leading-tight">
                        {t('brand.name')} <span className="font-light text-slate-300 text-sm">{t('brand.sub')}</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm tracking-wide font-medium transition-colors relative py-2 ${isActive(link.path) ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="nav_underline"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={toggleLang}
                        className="flex items-center gap-2 bg-white/[0.05] border border-white/10 hover:bg-white/10 rounded-full py-1.5 px-4 transition-all text-sm font-semibold tracking-wider text-amber-400 group"
                    >
                        <i className="ph-bold ph-translate text-lg"></i>
                        {i18n.language.toUpperCase()} <span className="text-white/30">|</span> <span className="text-slate-400 group-hover:text-white transition-colors">{i18n.language === 'en' ? 'ML' : 'EN'}</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative z-10 p-2 text-slate-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <List size={26} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-[#060913]/98 backdrop-blur-2xl border-b border-white/5 py-4 px-6 md:hidden flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center py-4 border-b border-white/5 mb-4">
                            <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Language</span>
                            <button
                                onClick={() => { toggleLang(); setIsOpen(false); }}
                                className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-full py-2 px-6 transition-all text-sm font-bold tracking-wider text-amber-400"
                            >
                                <i className="ph-bold ph-translate text-lg"></i>
                                {i18n.language === 'en' ? 'മലയാളം (ML)' : 'ENGLISH (EN)'}
                            </button>
                        </div>
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-xl font-bold py-4 border-b border-white/5 ${isActive(link.path) ? 'text-amber-400' : 'text-slate-300'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/10 mt-24 py-16 relative overflow-hidden bg-[#0a0f1d]">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 text-center md:text-left">
                <div>
                    <h3 className="text-xl md:text-2xl font-extrabold mb-2 tracking-tight text-white">{t('brand.name')} <br className="hidden md:block" /><span className="font-light text-slate-400">{t('footer.brand_sub')}</span></h3>
                    <p className="text-slate-400 text-base max-w-md mx-auto md:mx-0 font-light leading-relaxed">
                        {t('footer.desc')}
                    </p>
                </div>
                <div className="flex gap-4 justify-center md:justify-end">
                    <a href="https://www.youtube.com/@mahanaimgospelteam" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-white/5 transition-all"><i className="ph ph-youtube-logo text-2xl"></i></a>
                    <a href="https://www.instagram.com/mgmichelakkara/" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-white/5 transition-all"><i className="ph ph-instagram-logo text-2xl"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=61592226176827" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 border border-white/5 transition-all"><i className="ph ph-facebook-logo text-2xl"></i></a>
                </div>
            </div>
        </footer>
    );
}

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
        >
            {children}
        </motion.div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col relative w-full font-sans pt-24 text-slate-50">
                <div className="fx-bg-glow"></div>
                <Navbar />

                <main className="flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                            <Route path="/worship-center" element={<PageTransition><WorshipCenter /></PageTransition>} />
                            <Route path="/programmes" element={<PageTransition><Programmes /></PageTransition>} />
                            <Route path="/worship-team" element={<PageTransition><WorshipTeam /></PageTransition>} />
                            <Route path="/pastor" element={<PageTransition><Pastor /></PageTransition>} />
                        </Routes>
                    </AnimatePresence>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
