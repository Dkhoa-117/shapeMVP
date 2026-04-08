import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  linkTo: string;
  footerSlot?: React.ReactNode;
  ratings?: {
    valeur: number;
    complexite: number;
    maturite: number;
  };
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  tags,
  linkTo,
  footerSlot,
  ratings,
}) => {
  const { t } = useTranslation();
  return (
    <div className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-gray-100'>
      {imageUrl && (
        <div className='relative h-56 overflow-hidden'>
          <img
            src={imageUrl}
            alt={title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

          {ratings && (
            <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
              <div className='flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20 shadow-sm'>
                <Star className='w-3 h-3 fill-primary text-primary' />
                <span className='text-[10px] font-bold text-dark'>
                  {(
                    (ratings.valeur + ratings.complexite + ratings.maturite) /
                    3
                  ).toFixed(1)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className='p-6 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-3'>
          {tags && tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='text-xs font-semibold px-2 py-1 bg-[#FFF4ED] text-primary rounded-full uppercase tracking-wider'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {ratings && !imageUrl && (
            <div className='flex gap-2'>
              <div className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100'>
                <Star className='w-3 h-3 fill-primary text-primary' />
                <span className='text-[10px] font-bold text-dark'>
                  {ratings.valeur}
                </span>
              </div>
            </div>
          )}
        </div>

        {subtitle && (
          <p className='text-sm text-gray-500 mb-1 font-medium'>{subtitle}</p>
        )}

        <h3 className='text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors'>
          {title}
        </h3>

        {description && (
          <p className='text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow'>
            {description}
          </p>
        )}

        {ratings && (
          <div className='grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-gray-50'>
            <div className='text-center'>
              <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
                {t('card.valeur')}
              </div>
              <div className='flex justify-center gap-0.5'>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-2.5 h-2.5 ${s <= ratings.valeur ? 'fill-primary text-primary' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <div className='text-center'>
              <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
                {t('card.comp')}
              </div>
              <div className='flex justify-center gap-0.5'>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-2.5 h-2.5 ${s <= ratings.complexite ? 'fill-primary text-primary' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <div className='text-center'>
              <div className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
                {t('card.mat')}
              </div>
              <div className='flex justify-center gap-0.5'>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-2.5 h-2.5 ${s <= ratings.maturite ? 'fill-primary text-primary' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className='mt-auto pt-4 border-t border-gray-100 flex items-center justify-between'>
          <Link
            to={linkTo}
            className='inline-flex items-center text-primary font-semibold text-sm hover:underline'
          >
            {t('card.viewDetails')} <ArrowRight className='ml-1 w-4 h-4' />
          </Link>
          {footerSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
