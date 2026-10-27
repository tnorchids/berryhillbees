import { useState } from 'react';

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setFeedback('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setStatus('sent');
      setFeedback(result.message);
      form.reset();
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message?.startsWith('Unexpected') || error instanceof TypeError
          ? 'We couldn’t send your message. Please try again later or find us on Facebook.'
          : error.message
      );
    }
  }
  const fieldClass =
    'mt-2 block w-full rounded-sm border border-line bg-paper px-3 py-3 text-base text-ink';
  return (
    <form onSubmit={submit} className='mt-6 space-y-5'>
      <label className='block text-sm' htmlFor='contact-name'>
        Your name
        <input
          id='contact-name'
          name='name'
          autoComplete='name'
          required
          maxLength={100}
          className={fieldClass}
        />
      </label>
      <label className='block text-sm' htmlFor='contact-email'>
        Your email
        <input
          id='contact-email'
          name='email'
          type='email'
          autoComplete='email'
          required
          maxLength={254}
          className={fieldClass}
        />
      </label>
      <label className='block text-sm' htmlFor='contact-message'>
        Message
        <textarea
          id='contact-message'
          name='message'
          required
          maxLength={5000}
          rows={6}
          className={`${fieldClass} resize-y`}
        />
      </label>
      <div hidden aria-hidden='true'>
        <label>
          Website
          <input name='website' tabIndex={-1} autoComplete='off' />
        </label>
      </div>
      <p className='text-xs leading-6 text-muted'>
        We&apos;ll use your email to reply to your message.
      </p>
      <button
        disabled={status === 'sending'}
        className='rounded-sm bg-ink px-6 py-3 text-sm text-paper hover:bg-ink/85 disabled:cursor-wait disabled:opacity-60'
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p
        role='status'
        aria-live='polite'
        className={`text-sm leading-7 ${status === 'error' ? 'text-red-800' : 'text-muted'}`}
      >
        {feedback}
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <section
        aria-labelledby='contact-heading'
        className='mx-auto max-w-2xl pb-10 pt-12 text-center sm:pb-12 sm:pt-16'
      >
        <p className='mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted'>
          Say hello
        </p>
        <h1
          id='contact-heading'
          className='font-serif text-5xl leading-tight tracking-tight sm:text-6xl'
        >
          We&apos;d love to hear from you.
        </h1>
        <div className='mx-auto my-6 h-px w-12 bg-honey' aria-hidden='true' />
        <p className='text-base leading-8 text-muted sm:text-lg'>
          Have a question about our honey, our bees, or an order? Get in touch.
        </p>
      </section>

      <section
        aria-label='Ways to get in touch'
        className='grid gap-6 pb-10 sm:grid-cols-2 sm:pb-14'
      >
        <article className='rounded-sm border border-line bg-white p-6 sm:p-8'>
          <div className='mb-6 h-1 w-8 bg-honey/70' aria-hidden='true' />
          <h2 className='font-serif text-3xl tracking-tight'>
            Drop us a line.
          </h2>
          <p className='mt-4 text-sm leading-7 text-muted'>
            Send your questions, comments, or feedback straight to Berry Hill
            Bees.
          </p>
          <ContactForm />
        </article>
        <article className='rounded-sm border border-line bg-white p-6 sm:p-8'>
          <div className='mb-6 h-1 w-8 bg-honey/70' aria-hidden='true' />
          <h2 className='font-serif text-3xl tracking-tight'>Keep in touch.</h2>
          <p className='mt-4 text-sm leading-7 text-muted'>
            You can also follow Berry Hill Bees on Facebook for a little more
            life from the apiary.
          </p>
          <a
            href='https://www.facebook.com/berryhillbees'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Berry Hill Bees on Facebook (opens in a new tab)'
            className='mt-5 inline-block py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
          >
            Find us on Facebook <span aria-hidden='true'>↗</span>
          </a>
        </article>
      </section>

      <aside
        aria-labelledby='visiting-heading'
        className='mb-12 flex flex-col justify-between gap-5 border-y border-line py-7 sm:mb-16 sm:flex-row sm:items-center sm:gap-12'
      >
        <div className='max-w-xl'>
          <h2 id='visiting-heading' className='font-serif text-2xl'>
            Looking for our honey locally?
          </h2>
          <p className='mt-3 text-sm leading-7 text-muted'>
            We don&apos;t have our own storefront and aren&apos;t able to offer
            tours of the apiary. You can find our honey at Knoxville retailers
            or shop online.
          </p>
        </div>
        <div className='flex shrink-0 flex-wrap gap-x-6 gap-y-2 text-sm'>
          <a
            href='/wheretobuy'
            className='py-2 underline decoration-honey underline-offset-4 hover:text-muted'
          >
            Buy locally
          </a>
          <a
            href='/buyonline'
            className='py-2 underline decoration-honey underline-offset-4 hover:text-muted'
          >
            Shop online
          </a>
        </div>
      </aside>
    </>
  );
}
