import { photos } from '../data/photos.js';
import ResponsiveImage from '../components/ResponsiveImage.jsx';

const { bigHives: hives, italians, watching, activity } = photos;

function BeePhoto({ src, alt, caption, eager = false }) {
  return (
    <figure className='min-w-0'>
      <ResponsiveImage
        src={src}
        sizes={
          src === italians || src === activity
            ? '(min-width: 1232px) 564px, (min-width: 640px) calc((100vw - 104px) / 2), calc(100vw - 48px)'
            : undefined
        }
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding='async'
        className='h-auto w-full rounded-sm'
      />
      <figcaption className='border-b border-line py-4 text-xs leading-6 text-muted'>
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Bees() {
  return (
    <>
      <section aria-labelledby='bees-heading' className='py-12 sm:py-16'>
        <p className='mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted'>
          <span className='h-px w-7 bg-honey' aria-hidden='true' />
          Life in the apiary
        </p>
        <div className='grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16'>
          <h1
            id='bees-heading'
            className='font-serif text-5xl leading-tight tracking-tight sm:text-6xl'
          >
            Meet our bees.
          </h1>
          <p className='max-w-lg text-base leading-8 text-muted sm:text-lg'>
            All of our bees live in a single apiary in the Solway area of
            Knoxville. Keeping them together makes them easier to care forâ€”and
            gives us plenty to watch.
          </p>
        </div>
      </section>

      <BeePhoto
        src={hives}
        eager
        alt='Geffrey standing beside tall stacks of Berry Hill Bees hives'
        caption="Here are some of our big hives. I'm over six feet tall, so you can see these are monsters!"
      />

      <section
        aria-labelledby='honeybees-heading'
        className='grid gap-6 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16'
      >
        <h2
          id='honeybees-heading'
          className='font-serif text-3xl leading-tight tracking-tight sm:text-4xl'
        >
          A closer look at
          <br className='hidden sm:block' /> our honeybees.
        </h2>
        <div className='max-w-lg space-y-4 text-base leading-8 text-muted'>
          <p>
            Our bees are mostly Italian honeybees, the most commonly kept bees
            in the US. They look like what comes to mind when you think of a
            typical bee, with gold and black bands.
          </p>
          <p>
            We also have Carniolan honeybees, which are darker than the
            Italians. Both types tend to be fairly gentle and easy to work with.
          </p>
        </div>
      </section>

      <section
        aria-label='Inside our hives'
        className='grid items-start gap-8 pb-10 sm:grid-cols-2 sm:gap-6 sm:pb-14'
      >
        <BeePhoto
          src={italians}
          alt='Italian honeybees gathered around their queen'
          caption="Some of our Italian bees with their queen. She's the longer bee in the center of the photo."
        />
        <BeePhoto
          src={activity}
          alt='Honeybees busy at the hive in spring'
          caption='The bees are very active in spring, building comb, caring for young, and collecting nectar and pollen.'
        />
      </section>

      <section
        aria-labelledby='watching-heading'
        className='border-t border-line py-10 sm:py-14'
      >
        <h2
          id='watching-heading'
          className='mb-6 font-serif text-3xl tracking-tight'
        >
          Sometimes they watch me, too.
        </h2>
        <BeePhoto
          src={watching}
          alt='A row of honeybees peeking out between the hive frames'
          caption="Sometimes the bees just sit and watch me when I'm checking the hive. See them lined up between the frames."
        />
      </section>

      <section
        aria-labelledby='video-heading'
        className='border-t border-line py-10 sm:py-14'
      >
        <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
          <div>
            <h2
              id='video-heading'
              className='font-serif text-3xl tracking-tight sm:text-4xl'
            >
              Spring at Berry Hill.
            </h2>
            <p className='mt-3 text-sm leading-7 text-muted'>
              A little time in the apiary, with the bees in action.
            </p>
          </div>
          <a
            href='https://www.youtube.com/watch?v=NIjJ1scu6zY'
            className='self-start py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
          >
            Watch on YouTube <span aria-hidden='true'>â†’</span>
          </a>
        </div>
        <iframe
          src='https://www.youtube-nocookie.com/embed/NIjJ1scu6zY'
          title='Berry Hill Bees apiary in early spring'
          loading='lazy'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
          className='aspect-video w-full rounded-sm border-0 bg-ink'
        />
      </section>
    </>
  );
}
