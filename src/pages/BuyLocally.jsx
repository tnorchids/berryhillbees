const locations = [
  {
    name: 'Kirby Plants Greenhouse and Garden Center',
    link: 'https://g.page/kirby-plants?share',
    address: '7234 Oak Ridge Hwy',
    city: 'Knoxville, TN 37931',
    phone: '(865) 313-2829',
    products: ['One Pound Honey in Flip Top Jars']
  },
  {
    name: 'Three Rivers Market',
    link: 'https://goo.gl/maps/cPBynfqWyWVkjkWUA',
    address: '1100 N. Central St.',
    city: 'Knoxville, TN 37917',
    phone: '(865) 525-2069',
    products: [
      'One Pound Honey in Flip Top Jars',
      'One Pound Honey in Decorative Muth Jars'
    ]
  },
  {
    name: 'Visit Knoxville, Visitor Center',
    link: 'https://g.page/visitknoxville?share',
    address: '301 S. Gay Street',
    city: 'Knoxville, TN 37902',
    phone: '(865) 523-7263',
    products: ['One Pound Honey in Decorative Muth Jars']
  }
];

export default function BuyLocally() {
  return (
    <>
      <section
        aria-labelledby='where-heading'
        className='page-intro mx-auto max-w-2xl text-center'
      >
        <p className='mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted'>
          Find us locally
        </p>
        <h1
          id='where-heading'
          className='font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl'
        >
          Buy locally.
        </h1>
        <div className='mx-auto my-6 h-px w-12 bg-honey' aria-hidden='true' />
        <p className='text-base leading-8 text-muted sm:text-lg'>
          Pick up Berry Hill Bees honey at one of these Knoxville retailers.
        </p>
      </section>

      <section
        aria-label='Retail locations'
        className='grid gap-5 pb-10 md:grid-cols-3 md:gap-6'
      >
        {locations.map((location) => (
          <article
            key={location.name}
            className='flex min-w-0 flex-col rounded-sm border border-line bg-white p-6 sm:p-8 md:p-6 lg:p-8'
          >
            <div className='mb-6 h-1 w-8 bg-honey/70' aria-hidden='true' />
            <h2 className='font-serif text-2xl leading-snug tracking-tight md:min-h-[6.5rem] lg:text-[1.65rem]'>
              {location.name}
            </h2>
            <address className='mt-5 text-sm not-italic leading-7 text-muted'>
              {location.address}
              <br />
              {location.city}
            </address>
            <a
              href={`tel:+1${location.phone.replace(/\D/g, '')}`}
              aria-label={`Call ${location.name} at ${location.phone}`}
              className='mt-2 self-start py-2 text-sm underline decoration-line underline-offset-4 hover:decoration-honey'
            >
              {location.phone}
            </a>
            <div className='mb-8 mt-6 border-t border-line pt-5'>
              <h3 className='text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted'>
                Available here
              </h3>
              <ul className='mt-3 space-y-2 text-sm leading-6 text-muted'>
                {location.products.map((product) => (
                  <li key={product}>{product}</li>
                ))}
              </ul>
            </div>
            <a
              href={location.link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View map for ${location.name} (opens in a new tab)`}
              className='mt-auto flex items-center justify-between gap-3 rounded-sm border border-line px-4 py-3 text-sm transition-colors hover:border-honey hover:bg-paper'
            >
              View map <span aria-hidden='true'>↗</span>
            </a>
          </article>
        ))}
      </section>

      <aside
        aria-labelledby='before-heading'
        className='mb-8 flex flex-col gap-5 border-y border-line py-6 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10'
      >
        <div className='max-w-2xl'>
          <h2 id='before-heading' className='font-serif text-xl'>
            A quick call before you go
          </h2>
          <p className='mt-2 text-sm leading-7 text-muted'>
            Please call ahead to confirm honey is in stock before making a
            special trip. Jar options and availability may vary.
          </p>
        </div>
        <a
          href='/products'
          className='shrink-0 self-start py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted sm:self-auto'
        >
          Explore our products <span aria-hidden='true'>→</span>
        </a>
      </aside>
    </>
  );
}
