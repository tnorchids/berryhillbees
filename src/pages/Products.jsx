import { photos } from '../data/photos.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';

const { flipTopHoney, muthHoney, honeyCream, lipBalm, cappedHoney } = photos;

function ProductPhoto({
  src,
  alt,
  caption,
  className,
  sizes = '(min-width: 1232px) 484px, (min-width: 1024px) calc((100vw - 104px) / 2 - 80px), (min-width: 640px) calc(100vw - 160px), calc(100vw - 104px)'
}) {
  return (
    <figure className={className}>
      <div className='flex aspect-[4/3] items-center justify-center rounded-sm bg-white p-2 sm:p-3'>
        <ResponsiveImage
          src={src}
          sizes={sizes}
          alt={alt}
          loading='lazy'
          decoding='async'
          className='h-full w-full object-contain'
        />
      </div>
      <figcaption className='mt-3 text-xs leading-relaxed text-muted'>
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Products() {
  return (
    <>
      <section aria-labelledby='products-heading' className='page-intro'>
        <p className='mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs'>
          <span className='h-px w-7 bg-honey' aria-hidden='true' />
          From the apiary
        </p>
        <div className='grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16'>
          <h1
            id='products-heading'
            className='font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl'
          >
            Our products.
          </h1>
          <p className='max-w-lg text-base leading-8 text-muted sm:text-lg'>
            Honey from our Knoxville hives, along with Beeswax and Honey Cream
            and Beeswax Lip Balm.
          </p>
        </div>
      </section>

      <section
        aria-labelledby='honey-heading'
        className='border-t border-line section-spacing'
      >
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-16'>
          <div>
            <p className='mb-3 text-xs uppercase tracking-[0.18em] text-muted'>
              01 / From our hives
            </p>
            <h2 id='honey-heading' className='font-serif text-3xl sm:text-4xl'>
              Berry Hill honey
            </h2>
            <figure className='mt-5 max-w-sm'>
              <ResponsiveImage
                src={cappedHoney}
                sizes='(min-width: 432px) 384px, calc(100vw - 48px)'
                alt='A wooden frame of honeycomb sealed with pale wax cappings, beside an uncapping tool'
                loading='lazy'
                decoding='async'
                className='h-auto w-full rounded-sm'
              />
              <figcaption className='mt-3 text-xs leading-6 text-muted'>
                A frame of honey sealed with wax cappings, before extraction.
              </figcaption>
            </figure>
          </div>
          <div className='space-y-4 text-base leading-8 text-muted'>
            <p>
              Our honey is produced using organic principles in a single apiary
              in Knoxville, Tennessee. It varies slightly from year to year, but
              is consistently light in color and flavorful. We don&apos;t use
              harmful chemicals to treat parasitic mites.
            </p>
            <p>We offer our premium honey in a variety of packaging options:</p>
            <ul className='list-disc space-y-1 pl-5 marker:text-honey'>
              <li>Convenient plastic squeeze bottles for easy dispensing</li>
              <li>Glass jars</li>
              <li>Muth jars with cork tops, perfect for gift giving</li>
            </ul>
          </div>
        </div>
        <div className='mt-8 grid gap-8 sm:grid-cols-2 sm:gap-6'>
          <ProductPhoto
            src={flipTopHoney}
            sizes='(min-width: 1232px) 540px, (min-width: 640px) calc((100vw - 104px) / 2 - 24px), calc(100vw - 64px)'
            alt='Berry Hill honey in a plastic jar with a flip-top lid'
            caption='Plastic jars with flip-top lids'
          />
          <ProductPhoto
            src={muthHoney}
            sizes='(min-width: 1232px) 540px, (min-width: 640px) calc((100vw - 104px) / 2 - 24px), calc(100vw - 64px)'
            alt='Berry Hill honey in a decorative Muth jar with a cork'
            caption='Decorative Muth jar with cork'
          />
        </div>
      </section>

      <div className='grid gap-6 border-t border-line py-8 sm:py-10 lg:grid-cols-2'>
        <section
          aria-labelledby='cream-heading'
          className='flex min-w-0 flex-col rounded-sm border border-line bg-white p-5 sm:p-7'
        >
          <div>
            <p className='mb-3 text-xs uppercase tracking-[0.18em] text-muted'>
              02 / Beeswax and honey
            </p>
            <h2
              id='cream-heading'
              className='mb-6 font-serif text-3xl leading-tight sm:text-4xl'
            >
              Beeswax &amp; Honey Cream
            </h2>
            <div className='max-w-lg space-y-4 text-base leading-8 text-muted'>
              <p>
                Along with honey, we occasionally offer other beeswax-related
                products. Our top seller is Berry Hill Beeswax and Honey Cream:
                a luscious, thick lotion made with high quality ingredients,
                including our Berry Hill beeswax, mango butter, and lanolin.
              </p>
              <p>
                We consistently receive great reviews and repeat customers for
                this moisturizing lotion.
              </p>
            </div>
          </div>
          <ProductPhoto
            src={honeyCream}
            className='mt-auto pt-6'
            alt='Berry Hill Beeswax and Honey Cream'
            caption='Berry Hill Beeswax and Honey Cream'
          />
        </section>

        <section
          aria-labelledby='balm-heading'
          className='flex min-w-0 flex-col rounded-sm border border-line bg-white p-5 sm:p-7'
        >
          <div>
            <p className='mb-3 text-xs uppercase tracking-[0.18em] text-muted'>
              03 / From our capping wax
            </p>
            <h2
              id='balm-heading'
              className='mb-6 font-serif text-3xl sm:text-4xl'
            >
              Beeswax Lip Balm
            </h2>
            <p className='max-w-lg text-base leading-8 text-muted'>
              Our Berry Hill Beeswax Lip Balm is made with our premium capping
              wax. And yes, that&apos;s a real bee in the photo — it must have
              smelled the wax.
            </p>
          </div>
          <ProductPhoto
            src={lipBalm}
            className='mt-auto pt-6'
            alt='Berry Hill Beeswax Lip Balm with a bee on the tube'
            caption='Berry Hill Beeswax Lip Balm'
          />
        </section>
      </div>
      <aside className='mb-8 flex flex-col justify-between gap-4 border-y border-line py-6 sm:mb-12 sm:flex-row sm:items-center'>
        <div>
          <h2 className='font-serif text-2xl'>Prices and availability.</h2>
          <p className='mt-2 text-sm leading-7 text-muted'>
            Check the shop for current stock and ordering options.
          </p>
        </div>
        <a href='/buyonline' className='shop-link self-start sm:self-auto'>
          Buy online <span aria-hidden='true'>→</span>
        </a>
      </aside>
    </>
  );
}
