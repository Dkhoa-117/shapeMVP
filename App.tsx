import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Button from './components/Button';
import Card from './components/Card';
import AIChat from './components/AIChat';
import PDFMockViewer from './components/PDFMockViewer';
import AdminDashboard from './components/AdminDashboard';
import {
  MOCK_SOLUTIONS,
  MOCK_PROJECTS,
  MOCK_BLOG,
  MOCK_INITIATIVES,
} from './constants';
import {
  ArrowRight,
  Check,
  Filter,
  Layers,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Info,
  Zap,
  Settings,
  Globe,
  RefreshCw,
  Play,
  DollarSign,
  Clock,
  User,
  Activity,
  BarChart3,
} from 'lucide-react';
import {
  SolutionStatus,
  InitiativeType,
  SolutionPhase,
  SolutionCost,
  SolutionCible,
  SolutionLevierValeur,
} from './types';
import { GLOSSARY_DATA_BILINGUAL } from './i18n/glossaryData';

// --- Page Components ---

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Hero */}
      <section className='relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://picsum.photos/id/122/1920/1080'
            alt='Infrastructure'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-dark/40 backdrop-blur-[1px]'></div>
        </div>
        <div className='relative z-10 max-w-5xl mx-auto px-4 text-center animate-slide-up'>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            {t('home.hero.title')} <br /> {t('home.hero.titleSub')}
          </h1>
          <p className='text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light'>
            {t('home.hero.description')}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link to='/solutions'>
              <Button size='lg' className='w-full sm:w-auto'>
                {t('home.hero.exploreSolutions')}
              </Button>
            </Link>
            <Link to='/projects'>
              <Button
                variant='outline'
                size='lg'
                className='w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20'
              >
                {t('home.hero.viewProjects')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-dark mb-4'>
              {t('home.initiatives.heading')}
            </h2>
            <p className='text-gray-500 max-w-2xl mx-auto'>
              {t('home.initiatives.subtitle')}
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {MOCK_INITIATIVES.map((item) => (
              <div
                key={item.id}
                className='bg-light-gray rounded-xl p-8 hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer border border-transparent hover:shadow-xl'
              >
                <div className='w-12 h-12 bg-white rounded-lg mb-6 flex items-center justify-center text-primary group-hover:text-primary font-bold text-xl shadow-sm'>
                  {item.name[0]}
                </div>
                <h3 className='text-xl font-bold mb-3'>{item.name}</h3>
                <p className='text-sm opacity-80 mb-6 group-hover:text-blue-100 line-clamp-2'>
                  {item.description}
                </p>
                <Link
                  to={`/initiatives/${item.slug}`}
                  className='inline-flex items-center text-sm font-semibold group-hover:text-white group-hover:underline'
                >
                  {t('home.initiatives.learnMore')}{' '}
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Solutions */}
      <section className='py-24 bg-light'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <h2 className='text-3xl font-bold text-dark mb-2'>
                {t('home.solutions.heading')}
              </h2>
              <p className='text-gray-500'>{t('home.solutions.subtitle')}</p>
            </div>
            <Link
              to='/solutions'
              className='hidden sm:block text-primary font-medium hover:underline'
            >
              {t('home.solutions.viewAll')}
            </Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {MOCK_SOLUTIONS.slice(0, 3).map((solution) => (
              <Card
                key={solution.id}
                title={solution.title}
                subtitle={solution.domain}
                description={solution.description}
                imageUrl={solution.imageUrl}
                tags={solution.labels}
                linkTo={`/solutions/${solution.slug}`}
                ratings={solution.ratings}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const PrefacePage = () => {
  const { t } = useTranslation();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const scrolled = Math.max(
        0,
        -wrapperRef.current.getBoundingClientRect().top,
      );
      setProgress(Math.min(scrolled / window.innerHeight, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section 1: fully visible at 0, gone by progress=0.5
  const s1Opacity = Math.max(0, 1 - progress * 2.5);
  const s1Y = -progress * 120;

  // Section 2: starts appearing at progress=0.3, fully visible by 0.75
  const s2Raw = (progress - 0.3) / 0.45;
  const s2Opacity = Math.max(0, Math.min(1, s2Raw));
  const s2Y = Math.max(0, 1 - s2Raw) * 80;

  return (
    <div ref={wrapperRef} className='bg-[#e8e8e8]' style={{ height: '200vh' }}>
      <div className='sticky top-0 h-screen overflow-hidden bg-[#e8e8e8]'>
        {/* Section 1 â€” title + intro text */}
        <div
          className='absolute inset-0 flex items-end'
          style={{ opacity: s1Opacity, transform: `translateY(${s1Y}px)` }}
        >
          <div className='max-w-7xl mx-auto px-8 pb-8 pt-32 w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-end'>
              <h1 className='text-[10rem] leading-none font-black tracking-tight text-dark select-none'>
                {t('preface.heading').slice(0, -4)}
                <span className='text-primary'>
                  {t('preface.heading').slice(-4)}
                </span>
              </h1>
              <div className='space-y-6 text-[15px] leading-relaxed text-gray-800 text-justify max-w-xl ml-auto'>
                <p>{t('preface.p1')}</p>
                <p>{t('preface.p2')}</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className='flex flex-col items-center gap-3 py-8 select-none'
              style={{ opacity: Math.max(0, 1 - progress * 5) }}
            >
              <span className='text-xs tracking-[0.25em] uppercase text-gray-400 font-medium'>
                {t('preface.scrollContinue')}
              </span>
              <div className='w-px h-12 bg-gray-300 relative overflow-hidden'>
                <div
                  className='absolute left-0 top-0 w-full bg-primary'
                  style={{
                    height: '40%',
                    animation: 'scrollLine 1.4s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 â€” portrait + second text */}
        <div
          className='absolute inset-0 flex items-center'
          style={{ opacity: s2Opacity, transform: `translateY(${s2Y}px)` }}
        >
          <div className='max-w-7xl mx-auto px-8 pt-24 w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              <div className='space-y-6 text-[15px] leading-relaxed text-gray-800 text-justify max-w-xl'>
                <p>{t('preface.p3')}</p>
                <p>{t('preface.p4')}</p>
                <p>{t('preface.p5')}</p>
              </div>
              <div className='relative flex justify-end'>
                <div className='relative w-full max-w-lg'>
                  <img
                    src='/image.png'
                    alt='Christophe Lienard'
                    className='w-full object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Hero */}
      <section className='relative pt-40 pb-24 bg-dark overflow-hidden'>
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]'></div>
        </div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            {t('about.heroTitle')}
          </h1>
          <p className='text-xl text-primary font-light tracking-widest uppercase'>
            {t('about.heroSubtitle')}
          </p>
        </div>
      </section>

      <div className='py-24 px-4 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start animate-slide-up'>
          <div className='space-y-8 text-lg text-gray-700 leading-relaxed text-justify'>
            <p>
              <strong className='font-bold text-dark'>
                {t('about.welcomeHeading')}
              </strong>
              , {t('about.p1')}
            </p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
            <p>{t('about.p4')}</p>
          </div>

          <div className='relative'>
            <div className='rounded-xl overflow-hidden shadow-2xl border border-gray-100 bg-white p-2'>
              <img
                src='https://images.unsplash.com/photo-1518005052357-e987154dd981?q=80&w=2670&auto=format&fit=crop'
                alt='Sustainable City Infrastructure'
                className='w-full h-auto object-cover rounded-lg hover:scale-[1.02] transition-transform duration-500'
              />
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2'>
                <div className='px-6 py-2 bg-primary text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-lg'>
                  Bouygues
                </div>
              </div>
            </div>
            <p className='text-center text-xs text-gray-400 mt-4 italic'>
              {t('about.imageCaption')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InitiativesPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Hero */}
      <section className='relative pt-40 pb-24 bg-dark overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <img
            src='https://picsum.photos/id/10/1920/800'
            alt='Background'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            {t('initiatives.heroTitle')}
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl font-light'>
            {t('initiatives.heroSubtitle')}
          </p>
        </div>
      </section>

      <div className='py-24 px-4 max-w-7xl mx-auto'>
        <div className='grid gap-16'>
          {MOCK_INITIATIVES.map((initiative, index) => (
            <div
              key={initiative.id}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className='lg:w-1/2'>
                <div className='relative rounded-2xl overflow-hidden shadow-xl aspect-video'>
                  <img
                    src={initiative.featuredImage}
                    alt={initiative.name}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                  />
                </div>
              </div>
              <div className='lg:w-1/2 space-y-6'>
                <div className='inline-block px-4 py-1.5 rounded-full bg-blue-50 text-primary font-semibold text-sm'>
                  {initiative.name}
                </div>
                <h2 className='text-3xl font-bold text-dark'>
                  {initiative.description}
                </h2>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  {initiative.overview}
                </p>

                <div className='grid grid-cols-2 gap-6 py-4'>
                  {initiative.keyFigures.map((kpi, idx) => (
                    <div key={idx}>
                      <div className='text-2xl font-bold text-primary'>
                        {kpi.value}{' '}
                        <span className='text-sm text-gray-500 font-normal'>
                          {kpi.unit}
                        </span>
                      </div>
                      <div className='text-sm text-gray-500'>{kpi.label}</div>
                    </div>
                  ))}
                </div>

                {initiative.ratings && (
                  <div className='flex gap-6 py-4 border-t border-gray-100'>
                    <div className='flex flex-col items-center gap-1'>
                      <StarRating
                        rating={initiative.ratings.valeur}
                        size='sm'
                      />
                      <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                        {t('initiatives.valeur')}
                      </span>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                      <StarRating
                        rating={initiative.ratings.complexite}
                        size='sm'
                      />
                      <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                        {t('initiatives.complexite')}
                      </span>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                      <StarRating
                        rating={initiative.ratings.maturite}
                        size='sm'
                      />
                      <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                        {t('initiatives.maturite')}
                      </span>
                    </div>
                  </div>
                )}

                <Link to={`/initiatives/${initiative.slug}`}>
                  <Button variant='primary'>
                    {t('initiatives.discoverInitiative')}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StarRating = ({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const starSize =
    size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3';
  const fontSize =
    size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : 'text-[10px]';

  return (
    <div className='flex items-center'>
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.floor(rating)
                ? 'fill-primary text-primary'
                : 'text-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SolutionDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const solution = MOCK_SOLUTIONS.find((s) => s.slug === slug);

  if (!solution)
    return (
      <div className='pt-40 text-center'>{t('solutionDetail.notFound')}</div>
    );

  return (
    <div className='pb-24 bg-light/50 min-h-screen'>
      {/* Header / Banner */}
      <div className='bg-dark text-white pt-32 pb-16 relative overflow-hidden'>
        <div className='absolute right-0 top-0 w-1/2 h-full opacity-30 mask-image-gradient-to-l'>
          <img
            src={solution.imageUrl}
            alt={solution.title}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-transparent'></div>

        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <Link
            to='/solutions'
            className='text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition-colors'
          >
            <ChevronLeft className='w-4 h-4' />{' '}
            {t('solutionDetail.backToCatalog')}
          </Link>

          <div className='flex flex-col lg:flex-row justify-between gap-12 items-start'>
            <div className='flex-1'>
              <div className='flex flex-wrap items-center gap-3 mb-6'>
                <span className='bg-white/10 text-gray-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10'>
                  {solution.domain}
                </span>
                <span className='bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20'>
                  {solution.status}
                </span>
                {solution.sidebarInfo?.filiale &&
                  solution.sidebarInfo.filiale.map((f, idx) => (
                    <span
                      key={idx}
                      className='bg-white/5 text-gray-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10'
                    >
                      {f}
                    </span>
                  ))}
                {solution.labels?.map((label, idx) => (
                  <span
                    key={idx}
                    className='bg-primary/10 text-primary/80 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/10'
                  >
                    {label}
                  </span>
                ))}
              </div>
              <h1 className='text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight'>
                {solution.title}
              </h1>
              <p className='text-xl text-gray-400 max-w-2xl font-light leading-relaxed mb-10'>
                {solution.subtitle}
              </p>
            </div>

            {solution.ratings && (
              <div className='w-full lg:w-[320px] shrink-0 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='text-center'>
                    <div className='text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1'>
                      {t('solutionDetail.globalNote')}
                    </div>
                    <div className='text-4xl font-black text-white flex items-center gap-2'>
                      {(
                        (solution.ratings.valeur +
                          solution.ratings.complexite +
                          solution.ratings.maturite) /
                        3
                      ).toFixed(1)}
                      <Star className='w-6 h-6 fill-primary text-primary' />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-3 gap-4 pt-6 border-t border-white/10'>
                  <div className='flex flex-col items-center gap-1.5'>
                    <StarRating rating={solution.ratings.valeur} size='sm' />
                    <span className='text-[8px] font-bold text-gray-500 uppercase tracking-widest'>
                      {t('solutionDetail.valeur')}
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1.5'>
                    <StarRating
                      rating={solution.ratings.complexite}
                      size='sm'
                    />
                    <span className='text-[8px] font-bold text-gray-500 uppercase tracking-widest'>
                      {t('solutionDetail.complexite')}
                    </span>
                  </div>
                  <div className='flex flex-col items-center gap-1.5'>
                    <StarRating rating={solution.ratings.maturite} size='sm' />
                    <span className='text-[8px] font-bold text-gray-500 uppercase tracking-widest'>
                      {t('solutionDetail.maturite')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Main Content */}
        <div className='lg:col-span-8 space-y-12'>
          {/* Overview */}
          <section className='bg-white p-10 rounded-3xl shadow-sm border border-gray-100'>
            <div className='flex items-center gap-3 mb-10'>
              <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
                <Info className='w-5 h-5' />
              </div>
              <h2 className='text-2xl font-bold text-dark'>
                {t('solutionDetail.overview')}
              </h2>
            </div>

            <p className='text-gray-600 leading-relaxed text-lg font-light mb-10'>
              {i18n.language?.startsWith('en') && solution.descriptionEn
                ? solution.descriptionEn
                : solution.description}
            </p>

            {solution.useCaseHtml && (
              <div className='mt-10 pt-10 border-t border-gray-100'>
                <h3 className='text-xl font-bold text-dark mb-6 flex items-center gap-2'>
                  <Target className='w-5 h-5 text-primary' />
                  {t('solutionDetail.casUsage')}
                </h3>
                <div
                  className='prose prose-gray max-w-none text-gray-600 leading-relaxed'
                  dangerouslySetInnerHTML={{
                    __html:
                      i18n.language?.startsWith('en') && solution.useCaseHtmlEn
                        ? solution.useCaseHtmlEn
                        : solution.useCaseHtml,
                  }}
                />
              </div>
            )}
          </section>

          {/* Value & Gains */}
          {solution.valuesGainsHtml && (
            <section className='bg-primary/5 p-10 rounded-3xl border border-primary/10'>
              <div className='flex items-center gap-3 mb-8'>
                <div className='w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center'>
                  <TrendingUp className='w-5 h-5' />
                </div>
                <h2 className='text-2xl font-bold text-dark'>
                  {t('solutionDetail.valeursGains')}
                </h2>
              </div>
              <div
                className='prose prose-gray max-w-none text-gray-700 leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.language?.startsWith('en') &&
                    solution.valuesGainsHtmlEn
                      ? solution.valuesGainsHtmlEn
                      : solution.valuesGainsHtml,
                }}
              />
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className='lg:col-span-4 space-y-8'>
          {/* Key Figures Card */}
          {solution.keyFigures.length > 0 && (
            <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100'>
              <h3 className='font-bold text-dark mb-6 uppercase tracking-wider text-xs text-gray-400 flex items-center gap-2'>
                <BarChart3 className='w-4 h-4 text-primary' />{' '}
                {t('solutionDetail.keyFigures')}
              </h3>
              <div className='space-y-6'>
                {solution.keyFigures.map((kpi, i) => (
                  <div
                    key={i}
                    className='bg-gray-50 p-5 rounded-2xl border border-gray-100'
                  >
                    <div className='text-3xl font-black text-primary'>
                      {kpi.value}{' '}
                      <span className='text-sm text-gray-500 font-medium uppercase tracking-widest'>
                        {kpi.unit}
                      </span>
                    </div>
                    <div className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1'>
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Info Card */}
          {solution.sidebarInfo && (
            <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8'>
              <div className='space-y-6 pt-0'>
                {solution.sidebarInfo.cible && (
                  <div>
                    <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2'>
                      <User className='w-3 h-3 text-primary' />{' '}
                      {t('solutionDetail.cible')}
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {Object.values(SolutionCible).map((c) => (
                        <span
                          key={c}
                          className={`text-[9px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${solution.sidebarInfo?.cible?.includes(c) ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {solution.sidebarInfo.levierValeur && (
                  <div>
                    <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2'>
                      <TrendingUp className='w-3 h-3 text-primary' />{' '}
                      {t('solutionDetail.levierValeur')}
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {Object.values(SolutionLevierValeur).map((l) => (
                        <span
                          key={l}
                          className={`text-[9px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${solution.sidebarInfo?.levierValeur?.includes(l) ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className='pt-6 border-t border-gray-100 space-y-6'>
                {(solution.sidebarInfo.plateforme ||
                  solution.sidebarInfo.algorithmes) && (
                  <div>
                    <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2'>
                      <Layers className='w-3 h-3 text-primary' />{' '}
                      {t('solutionDetail.techStack')}
                    </div>
                    <div className='text-sm text-dark font-semibold leading-tight'>
                      {solution.sidebarInfo.plateforme}{' '}
                      {solution.sidebarInfo.algorithmes &&
                        ` / ${solution.sidebarInfo.algorithmes}`}
                    </div>
                  </div>
                )}

                <div className='flex flex-wrap gap-x-10 gap-y-6'>
                  {solution.sidebarInfo.phase && (
                    <div className='flex-shrink-0'>
                      <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2'>
                        <Activity className='w-3 h-3 text-primary' />{' '}
                        {t('solutionDetail.phase')}
                      </div>
                      <div className='flex gap-1.5'>
                        {Object.values(SolutionPhase).map((p) => (
                          <span
                            key={p}
                            className={`text-[8px] px-2 py-0.5 rounded-md font-bold whitespace-nowrap ${solution.sidebarInfo?.phase === p ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {solution.sidebarInfo.cout && (
                    <div className='flex-shrink-0'>
                      <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2'>
                        <DollarSign className='w-3 h-3 text-primary' />{' '}
                        {t('solutionDetail.cout')}
                      </div>
                      <div className='flex gap-1.5'>
                        {Object.values(SolutionCost).map((c) => (
                          <span
                            key={c}
                            className={`text-[8px] px-2 py-0.5 rounded-md font-bold whitespace-nowrap ${solution.sidebarInfo?.cout === c ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          <div className='bg-dark text-white p-8 rounded-3xl shadow-xl'>
            <h3 className='font-bold mb-4 uppercase tracking-wider text-xs text-gray-400'>
              {t('solutionDetail.contact')}
            </h3>
            <p className='text-gray-400 text-sm mb-8 leading-relaxed'>
              {t('solutionDetail.contactDesc')}
            </p>
            <Link to='/contact'>
              <Button className='w-full bg-primary hover:bg-primary/90 text-white border-none h-12 rounded-xl'>
                {t('solutionDetail.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* Hero */}
      <section className='relative pt-40 pb-24 bg-dark overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <img
            src='https://picsum.photos/id/11/1920/800'
            alt='Background'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            {t('projects.heroTitle')}
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl font-light'>
            {t('projects.heroSubtitle')}
          </p>
        </div>
      </section>

      <div className='py-24 px-4 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {MOCK_PROJECTS.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              subtitle={project.location}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={[project.client]}
              linkTo={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter related solutions based on IDs in project.relatedSolutions
  const relatedSolutions = MOCK_SOLUTIONS.filter((s) =>
    project?.relatedSolutions.includes(s.id),
  );

  useEffect(() => {
    if (relatedSolutions.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % relatedSolutions.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [relatedSolutions.length]);

  if (!project)
    return (
      <div className='pt-40 text-center'>{t('projectDetail.notFound')}</div>
    );

  return (
    <div className='pb-24'>
      {/* Hero */}
      <div className='relative h-[60vh] min-h-[500px] w-full'>
        <div className='absolute inset-0'>
          <img
            src={project.imageUrl}
            alt={project.title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent'></div>
        </div>

        <div className='absolute bottom-0 left-0 w-full p-8 md:p-16'>
          <div className='max-w-7xl mx-auto'>
            <Link
              to='/projects'
              className='text-white/80 hover:text-white mb-6 inline-flex items-center text-sm font-medium transition-colors'
            >
              {t('projectDetail.back')}
            </Link>
            <div className='flex flex-wrap items-center gap-4 mb-6'>
              <span className='bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg'>
                {project.location}
              </span>
              <span className='bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium'>
                {t('projectDetail.client', { client: project.client })}
              </span>
            </div>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight'>
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Main Content */}
        <div className='lg:col-span-8 space-y-12'>
          <section>
            <h2 className='text-3xl font-bold text-dark mb-6'>
              {t('projectDetail.aboutProject')}
            </h2>
            <p className='text-lg text-gray-600 leading-relaxed font-light'>
              {project.description}
            </p>
            <p className='mt-4 text-gray-600 leading-relaxed'>
              {t('projectDetail.projectBody')}
            </p>
          </section>

          {/* Challenges & Impact (Mocked for Demo) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-orange-50 p-8 rounded-2xl border border-orange-100'>
              <div className='w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6'>
                <Target className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-bold text-dark mb-3'>
                {t('projectDetail.chiffresCles')}
              </h3>
              <ul className='space-y-3'>
                <li className='flex items-start gap-2 text-gray-700 text-sm'>
                  <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0'></span>
                  <span>{t('projectDetail.challenge1')}</span>
                </li>
                <li className='flex items-start gap-2 text-gray-700 text-sm'>
                  <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0'></span>
                  <span>{t('projectDetail.challenge2')}</span>
                </li>
              </ul>
            </div>

            <div className='bg-blue-50 p-8 rounded-2xl border border-blue-100'>
              <div className='w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-secondary mb-6'>
                <TrendingUp className='w-6 h-6' />
              </div>
              <h3 className='text-xl font-bold text-dark mb-3'>
                {t('projectDetail.benefits')}
              </h3>
              <ul className='space-y-3'>
                <li className='flex items-start gap-2 text-gray-700 text-sm'>
                  <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0'></span>
                  <span>{t('projectDetail.benefit1')}</span>
                </li>
                <li className='flex items-start gap-2 text-gray-700 text-sm'>
                  <span className='mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0'></span>
                  <span>{t('projectDetail.benefit2')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='lg:col-span-4 space-y-8'>
          <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-32'>
            <h3 className='font-bold text-dark mb-6 flex items-center gap-2'>
              <Layers className='w-5 h-5 text-primary' />
              {t('projectDetail.solutionsDeployed')}
            </h3>

            {relatedSolutions.length > 0 ? (
              <div className='relative overflow-hidden rounded-lg group/carousel'>
                <div
                  className='flex transition-transform duration-500 ease-in-out'
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {relatedSolutions.map((sol) => (
                    <div key={sol.id} className='w-full flex-shrink-0'>
                      <Link
                        to={`/solutions/${sol.slug}`}
                        className='group block'
                      >
                        <div className='relative aspect-video rounded-lg overflow-hidden mb-3'>
                          <img
                            src={sol.imageUrl}
                            alt={sol.title}
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                          />
                          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors'></div>
                        </div>
                        <h4 className='font-bold text-dark group-hover:text-primary transition-colors'>
                          {sol.title}
                        </h4>
                        <p className='text-xs text-gray-500 mt-1'>
                          {sol.domain}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                {relatedSolutions.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentSlide(
                          (prev) =>
                            (prev - 1 + relatedSolutions.length) %
                            relatedSolutions.length,
                        )
                      }
                      className='absolute left-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-dark hover:bg-white hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100'
                      aria-label='Previous slide'
                    >
                      <ChevronLeft className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlide(
                          (prev) => (prev + 1) % relatedSolutions.length,
                        )
                      }
                      className='absolute right-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-dark hover:bg-white hover:text-primary transition-all opacity-0 group-hover/carousel:opacity-100'
                      aria-label='Next slide'
                    >
                      <ChevronRight className='w-5 h-5' />
                    </button>
                  </>
                )}

                {/* Carousel Indicators */}
                {relatedSolutions.length > 1 && (
                  <div className='flex justify-center gap-2 mt-4'>
                    {relatedSolutions.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          currentSlide === idx ? 'bg-primary' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500 bg-gray-50 rounded-lg text-sm'>
                {t('projectDetail.noSolutions')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PDFPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  return (
    <div className='pt-24 pb-12 px-4 max-w-7xl mx-auto h-screen flex flex-col'>
      <div className='mb-6'>
        <Link to='/solutions' className='text-sm text-gray-500 hover:text-dark'>
          {t('pdf.exitReader')}
        </Link>
      </div>
      <div className='flex-1'>
        <PDFMockViewer title={slug || 'Document'} />
      </div>
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className='bg-dark text-white py-16 border-t border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12'>
        <div className='col-span-1 md:col-span-1'>
          <div className='mb-6'>
            <span className='text-primary font-serif italic text-lg block mb-[-8px] ml-1'>
              {t('footer.shapeBy')}
            </span>
            <div className='text-3xl font-bold'>Bouygues</div>
          </div>
          <p className='text-gray-400 text-sm leading-relaxed'>
            {t('footer.tagline')}
          </p>
        </div>
        <div>
          <h4 className='font-bold mb-4 text-sm uppercase tracking-wider text-gray-500'>
            {t('footer.explore')}
          </h4>
          <ul className='space-y-3 text-gray-300 text-sm'>
            <li>
              <Link to='/initiatives' className='hover:text-primary'>
                {t('footer.links.initiatives')}
              </Link>
            </li>
            <li>
              <Link to='/solutions' className='hover:text-primary'>
                {t('footer.links.solutions')}
              </Link>
            </li>
            <li>
              <Link to='/projects' className='hover:text-primary'>
                {t('footer.links.projects')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold mb-4 text-sm uppercase tracking-wider text-gray-500'>
            {t('footer.stayConnected')}
          </h4>
          <ul className='space-y-3 text-gray-300 text-sm'>
            <li>
              <Link to='/about' className='hover:text-primary'>
                {t('footer.links.about')}
              </Link>
            </li>
            <li>
              <Link to='/contact' className='hover:text-primary'>
                {t('footer.links.demoDay')}
              </Link>
            </li>
            <li>
              <Link to='/contact?type=Solution' className='hover:text-primary'>
                {t('footer.links.addSolution')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='font-bold mb-4 text-sm uppercase tracking-wider text-gray-500'>
            {t('footer.more')}
          </h4>
          <ul className='space-y-3 text-gray-300 text-sm'>
            <li>
              <a href='#' className='hover:text-primary'>
                {t('footer.links.blog')}
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary'>
                {t('footer.links.linkedin')}
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-primary'>
                {t('footer.links.instagram')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs'>
        {t('footer.copyright')}
      </div>
    </footer>
  );
};

// --- New Components ---

const ContactPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type');

  const [suggestionType, setSuggestionType] = useState<
    'General' | 'Solution' | 'Project' | 'Initiative'
  >((typeParam as any) || 'General');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Update state if URL changes
  useEffect(() => {
    if (
      typeParam &&
      ['General', 'Solution', 'Project', 'Initiative'].includes(typeParam)
    ) {
      setSuggestionType(typeParam as any);
    }
  }, [typeParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log('Form Submitted:', { type: suggestionType, data: formData });
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className='pt-32 pb-24 px-4 max-w-3xl mx-auto text-center animate-fade-in'>
        <div className='w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6'>
          <CheckCircle className='w-10 h-10' />
        </div>
        <h1 className='text-4xl font-bold text-dark mb-4'>
          {t('contact.thankYouTitle')}
        </h1>
        <p className='text-xl text-gray-500 mb-8'>
          {t('contact.thankYouMessage')}
        </p>
        <Link to='/'>
          <Button>{t('contact.returnHome')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='pt-32 pb-24 px-4 max-w-5xl mx-auto'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-dark mb-4'>
          {suggestionType === 'Solution'
            ? t('contact.demoDay.title')
            : t('contact.heroTitle')}
        </h1>
        <p className='text-gray-500 max-w-2xl mx-auto'>
          {suggestionType === 'Solution'
            ? t('contact.demoDay.subtitle')
            : t('contact.heroSubtitle')}
        </p>
      </div>

      <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
        {/* Type Selector */}
        <div className='bg-gray-50 border-b border-gray-100 p-2 flex overflow-x-auto gap-2'>
          {['General', 'Solution', 'Project', 'Initiative'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSuggestionType(tab as any);
                setFormData({});
              }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                suggestionType === tab
                  ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab === 'General'
                ? t('contact.tabs.general')
                : tab === 'Solution'
                  ? t('contact.tabs.demoDay')
                  : tab === 'Project'
                    ? t('contact.tabs.suggestProject')
                    : t('contact.tabs.suggestInitiative')}
            </button>
          ))}
        </div>

        {suggestionType === 'Solution' ? (
          <div className='p-8 md:p-12 space-y-8 animate-fade-in'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Left Column */}
              <div className='space-y-8'>
                {/* Text Block */}
                <div className='bg-orange-50 p-8 rounded-2xl border border-orange-100 flex flex-col justify-center min-h-[250px]'>
                  <h3 className='text-xl font-bold text-dark mb-4'>
                    {t('contact.demoDay.discoverTitle')}
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {t('contact.demoDay.discoverBody')}
                  </p>
                </div>
                {/* Photos Block */}
                <div className='bg-gray-100 rounded-2xl overflow-hidden aspect-square relative group shadow-sm'>
                  <img
                    src='https://picsum.photos/seed/demoday-photos/800/800'
                    alt={t('contact.demoDay.photosAlt')}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
                    <span className='text-white font-bold tracking-widest text-3xl uppercase drop-shadow-lg'>
                      {t('contact.demoDay.photosLabel')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-8'>
                {/* Video Block */}
                <div className='bg-gray-900 rounded-2xl overflow-hidden aspect-[3/4] relative group cursor-pointer shadow-lg'>
                  <img
                    src='https://picsum.photos/seed/demoday-video/800/1066'
                    alt='Demo Day Video'
                    className='w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity'
                  />
                  <div className='absolute inset-0 flex items-center justify-center flex-col'>
                    <div className='w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30 mb-4'>
                      <div className='w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-2'></div>
                    </div>
                    <span className='text-white font-bold tracking-widest text-3xl uppercase drop-shadow-lg'>
                      {t('contact.demoDay.videoLabel')}
                    </span>
                  </div>
                </div>
                {/* Agenda Block */}
                <div className='bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col min-h-[300px]'>
                  <h3 className='text-xl font-bold text-dark mb-6 uppercase tracking-widest text-center'>
                    {t('contact.demoDay.agendaTitle')}
                  </h3>
                  <div className='space-y-6 flex-1 overflow-y-auto pr-2'>
                    <div className='border-l-2 border-primary pl-4'>
                      <div className='text-sm text-primary font-bold mb-1'>
                        09:00 AM
                      </div>
                      <div className='font-medium text-dark'>
                        {t('contact.demoDay.agenda.item1')}
                      </div>
                    </div>
                    <div className='border-l-2 border-gray-300 pl-4'>
                      <div className='text-sm text-gray-500 font-bold mb-1'>
                        10:30 AM
                      </div>
                      <div className='font-medium text-dark'>
                        {t('contact.demoDay.agenda.item2')}
                      </div>
                    </div>
                    <div className='border-l-2 border-gray-300 pl-4'>
                      <div className='text-sm text-gray-500 font-bold mb-1'>
                        12:30 PM
                      </div>
                      <div className='font-medium text-dark'>
                        {t('contact.demoDay.agenda.item3')}
                      </div>
                    </div>
                    <div className='border-l-2 border-gray-300 pl-4'>
                      <div className='text-sm text-gray-500 font-bold mb-1'>
                        02:00 PM
                      </div>
                      <div className='font-medium text-dark'>
                        {t('contact.demoDay.agenda.item4')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className='pt-8 text-center'>
              <Button
                onClick={() => setIsSubmitted(true)}
                size='lg'
                className='w-full md:w-auto px-16 py-6 text-xl uppercase tracking-wider font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all bg-primary hover:bg-primary/90'
              >
                {t('contact.demoDay.askButton')}
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='p-8 space-y-6 animate-fade-in'
          >
            {/* Common Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {t('contact.form.yourName')}
                </label>
                <input
                  required
                  name='userName'
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                  placeholder={t('contact.form.yourNamePlaceholder')}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {t('contact.form.yourEmail')}
                </label>
                <input
                  required
                  type='email'
                  name='userEmail'
                  className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                  placeholder={t('contact.form.yourEmailPlaceholder')}
                  onChange={(e) =>
                    setFormData({ ...formData, userEmail: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='border-t border-gray-100 my-6'></div>

            {/* Dynamic Fields */}
            <div className='animate-fade-in space-y-6'>
              {suggestionType === 'General' && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    name='message'
                    className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none'
                    placeholder={t('contact.form.messagePlaceholder')}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
              )}

              {suggestionType === 'Project' && (
                <>
                  <div className='bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6'>
                    {t('contact.form.projectHint')}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.projectTitle')}
                      </label>
                      <input
                        required
                        name='title'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        placeholder={t('contact.form.projectTitlePlaceholder')}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.location')}
                      </label>
                      <input
                        required
                        name='location'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        placeholder={t('contact.form.locationPlaceholder')}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.client')}
                      </label>
                      <input
                        required
                        name='client'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        placeholder={t('contact.form.clientPlaceholder')}
                        onChange={(e) =>
                          setFormData({ ...formData, client: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.imageUrl')}
                      </label>
                      <input
                        name='imageUrl'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        placeholder='https://...'
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('contact.form.projectDescription')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      name='description'
                      className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                      placeholder={t('contact.form.projectDescPlaceholder')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {suggestionType === 'Initiative' && (
                <>
                  <div className='bg-purple-50 p-4 rounded-lg text-sm text-purple-800 mb-6'>
                    {t('contact.form.initiativeHint')}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.initiativeName')}
                      </label>
                      <input
                        required
                        name='name'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        placeholder={t(
                          'contact.form.initiativeNamePlaceholder',
                        )}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        {t('contact.form.type')}
                      </label>
                      <select
                        required
                        name='type'
                        className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                      >
                        <option value=''>{t('contact.form.typeSelect')}</option>
                        <option value='Living Avenues'>Living Avenues</option>
                        <option value='RÃ©silieuce du trait et de cÃ´te'>
                          RÃ©silieuce du trait et de cÃ´te
                        </option>
                        <option value='AÃ©roports'>AÃ©roports</option>
                        <option value='Transverse'>Transverse</option>
                        <option value='Other'>
                          {t('contact.form.typeOther')}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('contact.form.theProblem')}
                    </label>
                    <textarea
                      required
                      rows={2}
                      name='problem'
                      className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                      placeholder={t('contact.form.theProblemPlaceholder')}
                      onChange={(e) =>
                        setFormData({ ...formData, problem: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('contact.form.ourSolution')}
                    </label>
                    <textarea
                      required
                      rows={2}
                      name='solution'
                      className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                      placeholder={t('contact.form.ourSolutionPlaceholder')}
                      onChange={(e) =>
                        setFormData({ ...formData, solution: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {t('contact.form.featuredImage')}
                    </label>
                    <input
                      name='featuredImage'
                      className='w-full px-4 py-2 border border-gray-200 rounded-lg'
                      placeholder='https://...'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredImage: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className='pt-4'>
              <Button type='submit' size='lg' className='w-full'>
                {t('contact.form.sendButton')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const SolutionsPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedInitiative, setSelectedInitiative] = useState('All');
  const [selectedLabel, setSelectedLabel] = useState('All');

  const domains = [
    'All',
    ...Array.from(new Set(MOCK_SOLUTIONS.map((s) => s.domain))),
  ];
  const initiatives = ['All', ...Object.values(InitiativeType)];
  const labels = [
    'All',
    ...Array.from(new Set(MOCK_SOLUTIONS.flatMap((s) => s.labels))),
  ];

  const filteredSolutions = MOCK_SOLUTIONS.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain =
      selectedDomain === 'All' || s.domain === selectedDomain;
    const matchesInitiative =
      selectedInitiative === 'All' ||
      s.initiative.some((i) => i === selectedInitiative);
    const matchesLabel =
      selectedLabel === 'All' || s.labels.includes(selectedLabel);

    return matchesSearch && matchesDomain && matchesInitiative && matchesLabel;
  });

  return (
    <div>
      {/* Hero */}
      <section className='relative pt-40 pb-24 bg-dark overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <img
            src='https://picsum.photos/id/12/1920/800'
            alt='Background'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='relative z-10 max-w-7xl mx-auto px-4'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            {t('solutions.heroTitle')}
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl font-light'>
            {t('solutions.heroSubtitle')}
          </p>
        </div>
      </section>

      <div className='py-24 px-4 max-w-7xl mx-auto'>
        <div className='mb-12 flex flex-col lg:flex-row gap-8 items-start'>
          {/* Search Bar */}
          <div className='relative w-full lg:w-1/3 flex-shrink-0'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder={t('solutions.searchPlaceholder')}
              className='block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters Section */}
          <div className='flex-1 space-y-4'>
            {/* Initiatives */}
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-sm font-medium text-gray-600 min-w-[100px]'>
                {t('solutions.filterInitiatives')}
              </span>
              <div className='flex flex-wrap gap-2'>
                {initiatives.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedInitiative(item)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedInitiative === item
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* MÃ©tiers (Domains) */}
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-sm font-medium text-gray-600 min-w-[100px]'>
                {t('solutions.filterMetiers')}
              </span>
              <div className='flex flex-wrap gap-2'>
                {domains.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedDomain(item)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedDomain === item
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CatÃ©gories (Labels) */}
            <div className='flex flex-wrap items-center gap-3'>
              <span className='text-sm font-medium text-gray-600 min-w-[100px]'>
                {t('solutions.filterCategorie')}
              </span>
              <div className='flex flex-wrap gap-2'>
                {labels.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedLabel(item)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedLabel === item
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredSolutions.map((solution) => (
            <Card
              key={solution.id}
              title={solution.title}
              subtitle={solution.domain}
              description={solution.description}
              imageUrl={solution.imageUrl}
              tags={solution.labels}
              linkTo={`/solutions/${solution.slug}`}
              ratings={solution.ratings}
            />
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className='text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300'>
            <p className='text-gray-500'>{t('solutions.noResults')}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All');
                setSelectedInitiative('All');
                setSelectedLabel('All');
              }}
              className='text-primary font-medium mt-2 hover:underline'
            >
              {t('solutions.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const InitiativeDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const initiative = MOCK_INITIATIVES.find((i) => i.slug === slug);

  if (!initiative)
    return (
      <div className='pt-40 text-center text-xl'>
        {t('initiativeDetail.notFound')}
      </div>
    );

  const relatedSolutions = MOCK_SOLUTIONS.filter((s) =>
    s.initiative.includes(initiative.type),
  );

  return (
    <div className='pb-24'>
      {/* Hero */}
      <div className='relative h-[500px] flex items-center justify-center text-center text-white'>
        <div className='absolute inset-0'>
          <img
            src={initiative.featuredImage}
            alt={initiative.name}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/60'></div>
        </div>
        <div className='relative z-10 max-w-4xl px-4'>
          <span className='inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4 border border-white/30'>
            {t('initiativeDetail.badge')}
          </span>
          <h1 className='text-5xl font-bold mb-6'>{initiative.name}</h1>
          <p className='text-xl text-gray-200 mb-8'>{initiative.description}</p>

          {initiative.ratings && (
            <div className='flex justify-center gap-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-md mx-auto'>
              <div className='flex flex-col items-center gap-1'>
                <StarRating rating={initiative.ratings.valeur} size='md' />
                <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                  {t('initiativeDetail.valeur')}
                </span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <StarRating rating={initiative.ratings.complexite} size='md' />
                <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                  {t('initiativeDetail.complexite')}
                </span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <StarRating rating={initiative.ratings.maturite} size='md' />
                <span className='text-[10px] uppercase font-bold text-gray-400 tracking-widest text-center'>
                  {t('initiativeDetail.maturite')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-16 space-y-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* Left Column */}
          <div className='lg:col-span-7 space-y-12'>
            <section>
              <h2 className='text-2xl font-bold text-dark mb-4'>
                {t('initiativeDetail.theChallenge')}
              </h2>
              <p className='text-gray-600 text-lg leading-relaxed'>
                {initiative.problem}
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-dark mb-4'>
                {t('initiativeDetail.ourApproach')}
              </h2>
              <p className='text-gray-600 text-lg leading-relaxed'>
                {initiative.solution}
              </p>
            </section>

            {/* Image Block */}
            <div className='aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-sm'>
              <img
                src={
                  initiative.featuredImage ||
                  `https://picsum.photos/seed/${initiative.id}-img/800/450`
                }
                alt='Initiative Details'
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Right Column */}
          <div className='lg:col-span-5 space-y-12'>
            {/* Related Solutions Button */}
            <div className='flex justify-end'>
              <Link
                to={`/solutions?initiative=${initiative.type}`}
                className='inline-flex items-center gap-4 text-dark font-bold hover:text-primary transition-colors group'
              >
                <span className='text-xl uppercase tracking-wider'>
                  {t('initiativeDetail.relatedSolutions')}
                </span>
                <div className='w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md'>
                  <ArrowRight className='w-6 h-6' />
                </div>
              </Link>
            </div>

            {/* Video Block */}
            <div className='aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center relative group cursor-pointer shadow-lg'>
              <img
                src={`https://picsum.photos/seed/${initiative.id}-video/800/600`}
                alt='Video Thumbnail'
                className='w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity'
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30'>
                  <div className='w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-2'></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Flipbook Placeholder */}
        <div className='w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px]'>
          <div className='w-full max-w-4xl aspect-[16/10] bg-gray-100 rounded-xl border border-gray-300 flex flex-col items-center justify-center relative overflow-hidden'>
            {/* Decorative flipbook elements */}
            <div className='absolute inset-y-0 left-1/2 w-px bg-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]'></div>
            <Layers className='w-16 h-16 text-gray-400 mb-6' />
            <h3 className='text-2xl font-bold text-dark mb-2'>
              {t('initiativeDetail.strategyFlipbook')}
            </h3>
            <p className='text-gray-500 text-center max-w-md mb-8'>
              {t('initiativeDetail.flipbookDesc')}
            </p>
            <Link to={`/books/${initiative.slug}-strategy`}>
              <Button variant='outline' className='bg-white'>
                {t('initiativeDetail.openReader')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Layout Wrapper ---

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className='min-h-screen flex font-sans text-dark bg-light selection:bg-primary/20'>
      <div className='flex-1 flex flex-col min-w-0 relative w-0'>
        {!isAdmin && (
          <div className='sticky top-0 z-40 h-0 w-full overflow-visible'>
            <Header isChatOpen={isChatOpen} />
          </div>
        )}
        <main className='flex-grow'>{children}</main>
        {!isAdmin && <Footer />}
      </div>
      {!isAdmin && <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />}
    </div>
  );
};

// --- Glossaire Page ---

const GlossairePage = () => {
  const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();

  const totalTerms = GLOSSARY_DATA_BILINGUAL.reduce(
    (acc, g) => acc + g.terms.length,
    0,
  );

  const filteredData = GLOSSARY_DATA_BILINGUAL.map((group) => ({
    ...group,
    terms: group.terms.filter((item) => {
      const q = search.toLowerCase();
      const termText = i18n.language?.startsWith('en')
        ? item.term.en
        : item.term.fr;
      const defText = i18n.language?.startsWith('en')
        ? item.definition.en
        : item.definition.fr;
      return (
        termText.toLowerCase().includes(q) ||
        (item.acronym ?? '').toLowerCase().includes(q) ||
        defText.toLowerCase().includes(q)
      );
    }),
  })).filter((group) => group.terms.length > 0);

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero */}
      <section className='relative pt-40 pb-28 bg-dark overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-[radial-gradient(#E75113_1px,transparent_1px)] [background-size:32px_32px] opacity-10'></div>
          <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent'></div>
        </div>
        <div className='relative z-10 max-w-5xl mx-auto px-4 text-center'>
          <p className='text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-5'>
            {t('glossaire.eyebrow')}
          </p>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            {t('glossaire.title')}
          </h1>
          <p className='text-lg text-gray-400 font-light mb-10'>
            {t('glossaire.subtitle', { count: totalTerms })}
          </p>
          {/* Search */}
          <div className='relative max-w-lg mx-auto'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none z-10' />
            <input
              type='text'
              placeholder={t('glossaire.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:bg-white/15 transition'
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 py-20'>
        {filteredData.length === 0 ? (
          <div className='text-center py-32 text-gray-400'>
            <p className='text-6xl mb-6'>ðŸ”</p>
            <p className='text-2xl font-light text-dark mb-2'>
              {t('glossaire.noResultsHeading')}
            </p>
            <p className='text-gray-400'>
              {t('glossaire.noResultsMessage', { search })}
            </p>
          </div>
        ) : (
          <div>
            {filteredData.map((group, groupIdx) => (
              <div key={group.letter}>
                {/* Section row: big letter + terms side by side */}
                <div className='flex gap-0 items-stretch min-h-0'>
                  {/* Letter column */}
                  <div className='w-24 md:w-36 shrink-0 flex flex-col items-center pt-2'>
                    <span
                      className='font-black leading-none select-none'
                      style={{
                        color: '#E75113',
                        fontSize: 'clamp(5rem, 10vw, 8rem)',
                        lineHeight: 1,
                      }}
                    >
                      {group.letter}
                    </span>
                  </div>

                  {/* Vertical divider */}
                  <div className='w-px bg-light-gray mx-4 md:mx-8 self-stretch'></div>

                  {/* Terms */}
                  <div className='flex-1 py-4 pb-12'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8'>
                      {group.terms.map((item) => {
                        const termText = i18n.language?.startsWith('en')
                          ? item.term.en
                          : item.term.fr;
                        const defText = i18n.language?.startsWith('en')
                          ? item.definition.en
                          : item.definition.fr;
                        return (
                          <div key={item.term.fr} className='group'>
                            <h3 className='text-sm font-bold text-dark uppercase tracking-widest mb-1 flex flex-wrap items-baseline gap-1.5'>
                              {termText}
                              {item.acronym && (
                                <span className='text-primary font-semibold normal-case tracking-normal text-xs'>
                                  ({item.acronym})
                                </span>
                              )}
                            </h3>
                            <div className='h-px bg-primary/30 w-10 mb-3 group-hover:w-full transition-all duration-500'></div>
                            <p className='text-gray-500 text-sm leading-relaxed'>
                              {defText}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section divider */}
                {groupIdx < filteredData.length - 1 && (
                  <div className='border-t border-light-gray mb-4'></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <section className='bg-dark py-20'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            {t('glossaire.ctaHeading')}
          </h2>
          <p className='text-gray-400 mb-8 font-light text-lg'>
            {t('glossaire.ctaDesc')}
          </p>
          <Link to='/contact?type=General'>
            <Button>{t('glossaire.proposeTerm')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className='pt-40 text-center text-2xl font-bold'>{t('notFound')}</div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/initiatives' element={<InitiativesPage />} />
          <Route path='/initiatives/:slug' element={<InitiativeDetail />} />
          <Route path='/solutions' element={<SolutionsPage />} />
          <Route path='/solutions/:slug' element={<SolutionDetail />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:slug' element={<ProjectDetail />} />
          <Route path='/books/:slug' element={<PDFPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/preface' element={<PrefacePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/glossaire' element={<GlossairePage />} />

          {/* Admin Route */}
          <Route path='/admin/*' element={<AdminDashboard />} />

          {/* Placeholders for other routes */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
