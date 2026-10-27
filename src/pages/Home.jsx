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
      <section
        aria-labelledby='welcome-heading'
        className='py-12 sm:py-16 lg:py-20'
      >
        <p className='mb-5 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs'>
          <span className='h-px w-7 bg-honey' aria-hidden='true' />
          Knoxville, Tennessee
        </p>
        <div className='grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16'>
          <h1
            id='welcome-heading'
            className='max-w-xl text-balance font-serif text-5xl leading-[1.12] tracking-[-0.025em] sm:text-6xl lg:text-[4.25rem]'
          >
            A small apiary.
            <br /> A little sweetness.
          </h1>
          <p className='max-w-lg text-base leading-8 text-muted sm:text-lg'>
            Welcome to Berry Hill Bees. We keep our bees in Solway, near Hardin
            Valley, using organic practices to produce all natural, raw honey.
            From our hives, here in Knoxville.
          </p>
        </div>
      </section>

      {latest && (
        <section
          aria-labelledby='latest-heading'
          className='mb-10 grid gap-6 border-y border-line py-7 sm:mb-12 lg:grid-cols-[1fr_2fr] lg:gap-16'
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

      <figure>
        <div className='overflow-hidden rounded-sm bg-stone-100'>
          <ResponsiveImage
            src={hives}
            alt='Geffrey tending the colorful Berry Hill Bee hives in Solway'
            className='h-auto w-full'
            fetchPriority='high'
          />
        </div>
        <figcaption className='flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line py-4 text-xs leading-relaxed text-muted'>
          <span>Geffrey in the bees!</span>
          <span>Life at Berry Hill Bees</span>
        </figcaption>
      </figure>

      <section
        aria-labelledby='apiary-heading'
        className='grid gap-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16'
      >
        <div>
          <p className='mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:text-xs'>
            From the apiary
          </p>
          <h2
            id='apiary-heading'
            className='max-w-sm font-serif text-3xl leading-tight tracking-tight sm:text-4xl'
          >
            Made by our bees.
            <br /> Shared by your beekeeper.
          </h2>
        </div>
        <div className='max-w-lg space-y-4 text-base leading-8 text-muted'>
          <p>
            Raw honey is our main product, but we also offer bee-related
            favorites like our Beeswax and Honey Cream and Beeswax Lip Balm.
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
