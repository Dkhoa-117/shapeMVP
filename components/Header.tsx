import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Globe, Check, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface HeaderProps {
  isChatOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isChatOpen }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.nav.home'), path: '/' },
    { name: t('header.nav.preface'), path: '/preface' },
    { name: t('header.nav.solutions'), path: '/solutions' },
    { name: t('header.nav.glossaire'), path: '/glossaire' },
    { name: t('header.nav.about'), path: '/about' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const hasHero =
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname.startsWith('/projects') ||
    location.pathname.startsWith('/initiatives') ||
    location.pathname.startsWith('/solutions');

  return (
    <header
      className={`w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${isChatOpen ? 'lg:pl-8 lg:pr-12' : 'lg:px-8'}`}
      >
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-3 group'>
            <img
              src='/bouygues-logo.png'
              alt='Bouygues Logo'
              className='h-10 w-auto object-contain group-hover:scale-105 transition-transform'
            />
            <div className='flex items-baseline'>
              <span
                className={`font-serif italic font-bold text-2xl tracking-wide transition-colors duration-300 ${isScrolled || !hasHero ? 'text-primary' : 'text-white'}`}
              >
                Shape
              </span>
              <span
                className={`font-bold text-3xl leading-none ml-0.5 transition-colors duration-300 ${isScrolled || !hasHero ? 'text-dark' : 'text-white/80'}`}
              >
                .
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden lg:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : isScrolled || !hasHero
                      ? 'text-gray-600'
                      : 'text-white/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className='hidden lg:flex items-center gap-4'>
            {/* Admin Link (Hidden/Discreet) */}
            <Link
              to='/admin'
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isScrolled || !hasHero ? 'text-gray-400 hover:text-primary' : 'text-white/50 hover:text-white'}`}
              title={t('header.adminPanel')}
            >
              <Lock className='w-4 h-4' />
            </Link>

            <button
              className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isScrolled || !hasHero ? 'text-gray-600' : 'text-white'}`}
            >
              <Search className='w-5 h-5' />
            </button>

            {/* Language Switcher */}
            <div className='flex items-center bg-black/5 rounded-full p-1 border border-white/10'>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  currentLang === 'en'
                    ? 'bg-primary text-white shadow-sm scale-105'
                    : isScrolled || !hasHero
                      ? 'text-gray-500 hover:text-primary'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('fr')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  currentLang === 'fr'
                    ? 'bg-primary text-white shadow-sm scale-105'
                    : isScrolled || !hasHero
                      ? 'text-gray-500 hover:text-primary'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>

            <Link to='/contact'>
              <Button
                size='sm'
                variant={isScrolled || !hasHero ? 'primary' : 'secondary'}
              >
                {t('header.contactUs')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='lg:hidden flex items-center'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${isScrolled || !hasHero ? 'text-dark' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-white shadow-lg lg:hidden flex flex-col p-4 animate-fade-in border-t border-gray-100'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className='py-3 px-4 text-dark font-medium border-b border-gray-100 hover:bg-gray-50 last:border-0'
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className='mt-4 px-4 space-y-3'>
            <div className='flex gap-2 justify-center pb-4 border-b border-gray-100'>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-1 rounded text-sm ${currentLang === lang.code ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
            <Link
              to='/admin'
              className='block text-center text-sm text-gray-400 py-2'
            >
              {t('header.adminLogin')}
            </Link>
            <Button className='w-full'>{t('header.contactUs')}</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
