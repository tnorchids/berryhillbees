export default function ThankYou() {
  return (
    <section
      aria-labelledby='thank-you-heading'
      className='mx-auto max-w-2xl py-16 sm:py-24'
    >
      <p className='mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted'>
        <span className='h-px w-7 bg-honey' aria-hidden='true' />
        Berry Hill Bees
      </p>
      <h1
        id='thank-you-heading'
        className='font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl'
      >
        Thank you for your order.
      </h1>
      <div className='my-7 h-px w-12 bg-honey' aria-hidden='true' />
      <p className='text-lg leading-8 text-muted'>
        We hope you love the products our bees worked so hard to produce.
      </p>
      <div className='mt-8 border-y border-line py-6'>
        <h2 className='font-serif text-2xl'>What happens next?</h2>
        <p className='mt-3 text-base leading-8 text-muted'>
          Please check your PayPal receipt or account for your payment status
          and order details. Once payment is confirmed, we&apos;ll prepare your
          order for shipping or follow up about any pickup arrangement made at
          checkout.
        </p>
        <p className='mt-4 text-sm leading-7 text-muted'>
          Have a question?{' '}
          <a
            href='/contact'
            className='underline decoration-honey underline-offset-4 hover:text-ink'
          >
            Send us a message
          </a>{' '}
          with your PayPal transaction reference so we can help.
        </p>
      </div>
      <div className='mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm'>
        <a
          href='/'
          className='py-2 underline decoration-honey underline-offset-4 hover:text-muted'
        >
          Return home <span aria-hidden='true'>→</span>
        </a>
        <a
          href='/buyonline'
          className='py-2 underline decoration-honey underline-offset-4 hover:text-muted'
        >
          Back to the shop
        </a>
      </div>
    </section>
  );
}
