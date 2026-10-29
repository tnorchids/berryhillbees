import { photos } from '../data/photos.js';
import ResponsiveImage, {
  halfPhotoSizes
} from '../components/ResponsiveImage.jsx';

const { firstHives, dadsHives, geffIvey } = photos;

export default function About() {
  return (
    <>
      <section
        aria-labelledby='about-heading'
        className='page-intro mx-auto max-w-2xl text-center'
      >
        <p className='mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted'>
          Our story
        </p>
        <h1
          id='about-heading'
          className='font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl'
        >
          Where it all started.
        </h1>
        <div className='mx-auto my-6 h-px w-12 bg-honey' aria-hidden='true' />
        <p className='text-base leading-8 text-muted sm:text-lg'>
          Two small hives in 2014. A family connection to bees. And a curiosity
          about just how different honey can taste.
        </p>
      </section>

      <section
        aria-labelledby='beekeeper-heading'
        className='grid items-center gap-8 border-t border-line section-spacing lg:grid-cols-2 lg:gap-16'
      >
        <div>
          <p className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>
            Meet the beekeeper
          </p>
          <h2
            id='beekeeper-heading'
            className='font-serif text-3xl tracking-tight sm:text-4xl'
          >
            Hi, I&apos;m Geff Ivey.
          </h2>
          <p className='mt-3 font-serif text-xl text-muted'>
            Software developer by day. Hobby beekeeper, too.
          </p>
          <div className='mt-6 space-y-4 text-base leading-8 text-muted'>
            <p>
              I&apos;m the head beekeeper here at Berry Hill Bees. I&apos;m also
              the only beekeeper here, so the competition for that title
              wasn&apos;t too fierce.
            </p>
            <p>
              My day job is software development, and beekeeping is my hobby.
              Berry Hill Bees is a small, personal operation, and I enjoy caring
              for the bees and sharing the honey they make.
            </p>
          </div>
        </div>
        <figure className='min-w-0'>
          <ResponsiveImage
            src={geffIvey}
            sizes={halfPhotoSizes}
            alt='Geff Ivey smiling in his beekeeping veil beside a tall stack of hive boxes'
            decoding='async'
            className='h-auto w-full rounded-sm'
          />
          <figcaption className='border-b border-line py-3 text-xs leading-6 text-muted'>
            The head beekeeper, with a little help from the bees.
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby='first-hives-heading'
        className='grid items-center gap-8 border-t border-line section-spacing lg:grid-cols-2 lg:gap-16'
      >
        <div className='lg:order-2'>
          <p className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>
            2014
          </p>
          <h2
            id='first-hives-heading'
            className='font-serif text-3xl tracking-tight sm:text-4xl'
          >
            Two ridiculously small hives.
          </h2>
          <div className='mt-6 space-y-4 text-base leading-8 text-muted'>
            <p>
              I started out with two ridiculously small hives in 2014. Even
              though I loved those first two hives, I lost one of them to mites
              only a few months after I got them.
            </p>
            <p>
              I was discouraged, but one hive did survive through the very cold
              winter of 2014. That was a huge confidence boost.
            </p>
          </div>
        </div>
        <figure className='min-w-0 lg:order-1'>
          <ResponsiveImage
            src={firstHives}
            sizes={halfPhotoSizes}
            decoding='async'
            alt='The two small hives that started Berry Hill Bees in 2014'
            className='h-auto w-full rounded-sm'
          />
          <figcaption className='border-b border-line py-4 text-xs leading-6 text-muted'>
            The first two Berry Hill Bees hives.
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby='inspiration-heading'
        className='grid gap-8 border-t border-line section-spacing lg:grid-cols-2 lg:gap-16'
      >
        <div>
          <h2
            id='inspiration-heading'
            className='font-serif text-3xl tracking-tight sm:text-4xl'
          >
            A few reasons to keep bees.
          </h2>
          <figure className='mt-8'>
            <ResponsiveImage
              src={dadsHives}
              sizes={halfPhotoSizes}
              decoding='async'
              alt='Dad with some of his first beehives in 1970 or 1971'
              loading='lazy'
              className='h-auto w-full rounded-sm'
            />
            <figcaption className='border-b border-line py-4 text-xs leading-6 text-muted'>
              Dad with some of his first hives in 1970 or 1971. A still from a
              family video, which I&apos;m grateful to my Mom for taking!
            </figcaption>
          </figure>
        </div>
        <div className='space-y-5 text-base leading-8 text-muted'>
          <p>
            My Dad used to keep bees, so I had some exposure to beekeeping when
            I was a kid. He had about twenty hives at one point.
          </p>
          <p>
            Later, my wife read a magazine article about the different kinds of
            honey. She ordered a type from New Zealand called Rata honey, and I
            became interested in honey made from the nectar of different flowers
            and how much variety there is.
          </p>
          <p>
            My Dad also gave me a quart of honey from a friend of his. I thought
            it was very good. I wanted to have some bees to make some honey that
            was as good as that!
          </p>
          <p>
            I wanted to learn more about bees, too—and hopefully help them,
            after hearing reports that bee populations were declining in the US.
          </p>
        </div>
      </section>

      <section
        aria-labelledby='growing-heading'
        className='mb-8 border-l-2 border-honey bg-honey/5 px-5 py-6 sm:mb-12 sm:px-8'
      >
        <div className='mx-auto max-w-2xl'>
          <h2
            id='growing-heading'
            className='font-serif text-3xl tracking-tight'
          >
            Growing from there.
          </h2>
          <p className='mt-5 text-base leading-8 text-muted'>
            I bought a few more bees in the spring of 2015 from an acquaintance
            in Cookeville, Tennessee. Those are the last ones I&apos;ve had to
            buy.
          </p>
          <p className='mt-4 font-serif text-2xl leading-relaxed'>
            They&apos;re a lot of work, but I really do love having them!
          </p>
          <a
            href='/products'
            className='mt-6 inline-block py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
          >
            See what our bees make <span aria-hidden='true'>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
