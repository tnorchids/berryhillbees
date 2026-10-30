import { photos } from '../data/photos.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import UpdatePost from '../components/UpdatePost.jsx';
import useUpdates from '../hooks/useUpdates.js';

const hives = photos.homeHives;

export default function Home() {
  const { updates, isNew } = useUpdates();
  const latest = updates[0];
  return (
    <>
      <section aria-labelledby='welcome-heading' className='page-intro'>
        <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div>
            <p className='mb-4 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs'>
              <span className='h-px w-7 bg-honey' aria-hidden='true' />
              Knoxville, Tennessee
            </p>
            <h1
              id='welcome-heading'
              className='max-w-xl text-balance font-serif text-4xl leading-[1.12] tracking-[-0.025em] sm:text-5xl lg:text-6xl'
            >
              A small apiary.
              <br /> A little sweetness.
            </h1>
          </div>
          <div>
            <p className='max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8'>
              Welcome to Berry Hill Bees. We keep our bees in Solway, near
              Hardin Valley, using organic practices to produce all natural, raw
              honey. From our hives, here in Knoxville.
            </p>
            <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-3'>
              <a
                href='/wheretobuy'
                className='inline-block py-3 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
              >
                Local Retailers
              </a>
              <a
                href='/buyonline'
                className='inline-block py-3 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
              >
                Buy online
              </a>
            </div>
          </div>
          <figure className='min-w-0 lg:col-span-2'>
            <ResponsiveImage
              src={hives}
              alt='Geffrey tending the colorful Berry Hill Bee hives in Solway'
              className='h-auto w-full rounded-sm'
              fetchPriority='high'
            />
            <figcaption className='mt-3 text-xs leading-6 text-muted'>
              Geffrey in the bees!
            </figcaption>
          </figure>
        </div>
      </section>

      {latest && (
        <section
          aria-labelledby='latest-heading'
          className='grid gap-4 border-y border-line bg-honey/5 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-12'
        >
          <div>
            <h2
              id='latest-heading'
              className='text-xs uppercase tracking-[0.2em] text-muted'
            >
              Latest update
            </h2>
            <a
              href='/updates'
              className='mt-3 inline-block py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
            >
              All updates <span aria-hidden='true'>→</span>
            </a>
          </div>
          <UpdatePost update={latest} isNew={isNew(latest)} />
        </section>
      )}

      <section
        aria-labelledby='apiary-heading'
        className='grid gap-6 page-intro lg:grid-cols-2 lg:gap-16'
      >
        <div>
          <p className='mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs'>
            From the apiary
          </p>
          <h2
            id='apiary-heading'
            className='max-w-sm font-serif text-3xl leading-tight tracking-tight sm:text-4xl'
          >
            Our honey.
            <br /> From our own hives.
          </h2>
        </div>
        <div className='max-w-lg space-y-4 text-base leading-8 text-muted'>
          <p>
            Raw honey is our main product. We also offer Beeswax and Honey Cream
            and Beeswax Lip Balm.
          </p>
          <p>
            We produce all the honey we sell, so you&apos;re buying from the
            beekeeper who produced it!
          </p>
        </div>
      </section>
    </>
  );
}
