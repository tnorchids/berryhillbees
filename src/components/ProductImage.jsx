import { useEffect, useId, useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage.jsx';

export default function ProductImage({ product }) {
  const dialog = useRef(null);
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function open() {
    dialog.current.showModal();
    setIsOpen(true);
  }

  return (
    <>
      <button
        type='button'
        onClick={open}
        aria-label={`Enlarge photo of ${product.name}`}
        aria-haspopup='dialog'
        className='group relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center rounded-sm p-5'
      >
        <ResponsiveImage
          src={product.image}
          sizes='(min-width: 1232px) 280px, (min-width: 1024px) calc((100vw - 128px) / 3 - 88px), (min-width: 768px) calc((100vw - 104px) / 2 - 88px), (min-width: 640px) calc(100vw - 168px), calc(100vw - 128px)'
          alt={product.alt}
          loading='lazy'
          decoding='async'
          className='h-full w-full object-contain'
        />
        <span
          aria-hidden='true'
          className='absolute bottom-0 right-0 rounded-sm border border-line bg-paper px-2 py-1 text-xs text-muted group-hover:border-honey group-hover:text-ink'
        >
          Enlarge ↗
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
        className='fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-sm border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-black/65'
      >
        <div className='p-4 sm:p-6'>
          <div className='mb-4 flex items-start justify-between gap-4'>
            <h2 id={titleId} className='font-serif text-2xl'>
              {product.name}
            </h2>
            <button
              type='button'
              autoFocus
              onClick={() => dialog.current.close()}
              className='shrink-0 rounded-sm border border-line px-3 py-2 text-sm hover:border-honey'
            >
              Close <span aria-hidden='true'>×</span>
            </button>
          </div>
          {isOpen && (
            <ResponsiveImage
              src={product.image}
              sizes='(min-width: 944px) 848px, calc(100vw - 80px)'
              alt={product.alt}
              className='max-h-[65svh] w-full object-contain'
            />
          )}
          <p className='mt-4 text-sm text-muted'>{product.size}</p>
        </div>
      </dialog>
    </>
  );
}
