import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const useNavbarAnimation = () => {
  const navbarRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    gsap.fromTo(
      navbarRef.current,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, [hasAnimated]);

  return { navbarRef };
};

const Navbar = () => {
  const { messages, lang, changeLang, languages } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { navbarRef } = useNavbarAnimation();
  const scrollTimeoutRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setScrolled(window.scrollY > 50);
    }, 16);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'projects', href: '#projects' },
    { key: 'links', href: '#links' },
  ];

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-accent/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-8 py-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-text-secondary hover:text-accent transition-colors duration-300 text-sm uppercase tracking-widest"
              >
                {messages.nav[item.key]}
              </a>
            ))}

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-accent transition-all duration-300 text-xs uppercase tracking-wider hover:bg-accent/5 rounded-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{currentLang?.label}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-dark-card/95 backdrop-blur-xl border border-accent/20 rounded-lg shadow-2xl overflow-hidden z-50">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          changeLang(language.code);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs transition-all duration-200 flex items-center justify-between uppercase tracking-wider ${
                          lang === language.code
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-secondary hover:bg-accent/5 hover:text-text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-accent/70">{language.label}</span>
                          <span>{language.name}</span>
                        </div>
                        {lang === language.code && (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
