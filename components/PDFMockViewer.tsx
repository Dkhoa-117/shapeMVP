import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PDFMockViewerProps {
  title: string;
}

const PDFMockViewer: React.FC<PDFMockViewerProps> = ({ title }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const totalPages = 12;
  const [scale, setScale] = useState(100);

  return (
    <div className='bg-gray-800 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[800px]'>
      {/* Toolbar */}
      <div className='bg-gray-900 text-white p-4 flex items-center justify-between border-b border-gray-700'>
        <h4 className='font-medium truncate max-w-xs'>{title}.pdf</h4>

        <div className='flex items-center gap-4'>
          <div className='flex items-center bg-gray-800 rounded px-2 py-1'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className='p-1 hover:bg-gray-700 rounded disabled:opacity-50'
              disabled={page === 1}
            >
              <ChevronLeft className='w-4 h-4' />
            </button>
            <span className='text-sm px-3 min-w-[80px] text-center'>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className='p-1 hover:bg-gray-700 rounded disabled:opacity-50'
              disabled={page === totalPages}
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>

          <div className='h-6 w-px bg-gray-700'></div>

          <div className='flex items-center gap-2'>
            <button
              onClick={() => setScale((s) => Math.max(50, s - 10))}
              className='p-1 hover:bg-gray-700 rounded'
            >
              <ZoomOut className='w-4 h-4' />
            </button>
            <span className='text-xs w-12 text-center'>{scale}%</span>
            <button
              onClick={() => setScale((s) => Math.min(150, s + 10))}
              className='p-1 hover:bg-gray-700 rounded'
            >
              <ZoomIn className='w-4 h-4' />
            </button>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button className='p-2 hover:bg-gray-700 rounded'>
            <Download className='w-4 h-4' />
          </button>
          <button className='p-2 hover:bg-gray-700 rounded'>
            <Maximize className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Viewer Canvas (Mock) */}
      <div className='flex-1 bg-gray-600 overflow-auto flex items-center justify-center p-8'>
        <div
          className='bg-white shadow-lg transition-transform duration-200 origin-center'
          style={{
            width: `${595 * (scale / 100)}px`,
            height: `${842 * (scale / 100)}px`,
            minWidth: `${595 * (scale / 100)}px`,
            minHeight: `${842 * (scale / 100)}px`,
          }}
        >
          {/* Mock Content */}
          <div
            className='p-12 h-full flex flex-col'
            style={{
              transform: `scale(${scale / 100})`,
              transformOrigin: 'top left',
              width: '595px',
              height: '842px',
            }}
          >
            <div className='border-b-4 border-primary pb-4 mb-8'>
              <h1 className='text-4xl font-bold text-dark'>{title}</h1>
              <p className='text-gray-500 mt-2'>{t('pdf.report')}</p>
            </div>

            <div className='prose max-w-none flex-1'>
              <div className='grid grid-cols-2 gap-8 mb-8'>
                <div className='bg-gray-100 h-40 rounded'></div>
                <div className='space-y-4'>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                  <div className='h-4 bg-gray-200 rounded w-full'></div>
                  <div className='h-4 bg-gray-200 rounded w-4/6'></div>
                </div>
              </div>

              <h3 className='text-2xl font-bold text-primary mb-4'>
                {t('pdf.chapter', { page })}
              </h3>
              <p className='text-gray-600 mb-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <div className='p-6 bg-blue-50 rounded-lg border-l-4 border-secondary my-8'>
                <p className='italic text-gray-700'>{t('pdf.quote')}</p>
              </div>

              <div className='grid grid-cols-3 gap-4 mt-auto'>
                <div className='h-24 bg-gray-100 rounded'></div>
                <div className='h-24 bg-gray-100 rounded'></div>
                <div className='h-24 bg-gray-100 rounded'></div>
              </div>
            </div>

            <div className='mt-auto pt-8 border-t border-gray-200 flex justify-between text-xs text-gray-400'>
              <span>Bouygues Shape the Future</span>
              <span>{t('pdf.pageLabel', { page })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFMockViewer;
