import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, HelpCircle, Globe, Layers } from 'lucide-react';

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://zenovagroupsbackend-production.up.railway.app';

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/faqs`);
                if (response.data.success) {
                    setFaqs(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, [API_BASE_URL]);

    const categories = useMemo(() => ['All', ...new Set(faqs.map(f => f.category).filter(Boolean))], [faqs]);
    const countries = useMemo(() => ['All', 'General', 'Uzbekistan', 'Kyrgyzstan', 'Georgia', 'Russia', 'Kazakhstan', 'Philippines', 'Vietnam', 'Tajikistan'], []);

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
            const matchesCountry = selectedCountry === 'All' || 
                                 (selectedCountry === 'General' && (!faq.country || faq.country === 'General')) ||
                                 (faq.country?.toLowerCase() === selectedCountry.toLowerCase());
            
            return matchesSearch && matchesCategory && matchesCountry;
        });
    }, [faqs, searchTerm, selectedCategory, selectedCountry]);

    return (
        <div className="min-h-screen bg-[#020c1b] text-white pt-32 pb-20 px-6">
            <style>{`
                .faq-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .faq-gradient-text {
                    background: linear-gradient(135deg, #60a5fa, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
                    >
                        <HelpCircle size={14} className="text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Knowledge Base</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-black mb-6"
                    >
                        How can we <span className="faq-gradient-text">Help?</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-400 text-lg max-w-2xl mx-auto"
                    >
                        Everything you need to know about MBBS abroad, admissions, and student life.
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="mb-12 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative group"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                        <input 
                            type="text"
                            placeholder="Search your question here..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-lg outline-none focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
                        />
                    </motion.div>

                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <div className="flex items-center gap-3 mr-4">
                            <Globe size={16} className="text-neutral-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">By Country:</span>
                        </div>
                        {countries.map(country => (
                            <button
                                key={country}
                                onClick={() => setSelectedCountry(country)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                    selectedCountry === country 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <div className="flex items-center gap-3 mr-4">
                            <Layers size={16} className="text-neutral-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">By Category:</span>
                        </div>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                    selectedCategory === cat 
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Accessing Knowledge Base...</p>
                    </div>
                ) : filteredFaqs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <motion.div
                                    key={faq._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`rounded-3xl overflow-hidden transition-all duration-500 ${
                                        isOpen ? 'faq-glass ring-1 ring-blue-500/20' : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="w-full flex items-center justify-between gap-6 px-8 py-7 text-left"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                {faq.category && (
                                                    <span className="text-[9px] font-black uppercase tracking-wider text-blue-400/80 bg-blue-400/5 px-2 py-0.5 rounded border border-blue-400/10">
                                                        {faq.category}
                                                    </span>
                                                )}
                                                {faq.country && (
                                                    <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500">
                                                        {faq.country}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-white/90 leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                            isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-white/5 text-neutral-500'
                                        }`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="px-8 pb-8">
                                                    <div className="w-full h-px bg-white/5 mb-6" />
                                                    <div className="flex gap-4">
                                                        <MessageSquare size={18} className="text-blue-500 flex-shrink-0 mt-1" />
                                                        <p className="text-neutral-400 text-lg leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 faq-glass rounded-[3rem]">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-neutral-700" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No results found</h3>
                        <p className="text-neutral-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button 
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedCountry('All'); }}
                            className="mt-8 text-blue-400 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Footer CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-12 rounded-[3rem] faq-glass border-blue-500/10 text-center"
                >
                    <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
                    <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                        If you couldn't find the answer you were looking for, please don't hesitate to contact our expert counselors.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-10 py-4 bg-blue-600 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all">
                            Talk to an Expert
                        </button>
                        <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                            Contact Us
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;
