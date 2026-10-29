import useUpdates from '../hooks/useUpdates.js';
import UpdatePost from '../components/UpdatePost.jsx';

export default function Updates() {
  const { updates, isNew } = useUpdates();
  return (
    <div className='mx-auto max-w-3xl pb-8 sm:pb-12'>
      <section aria-labelledby='updates-heading' className='page-intro'>
        <p className='mb-4 text-xs uppercase tracking-[0.2em] text-muted'>
          From Berry Hill Bees
        </p>
        <h1
          id='updates-heading'
          className='font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl'
        >
          Notes from the apiary.
        </h1>
        <p className='mt-6 text-base leading-8 text-muted sm:text-lg'>
          Harvest news, shop announcements, and a little life with our bees.
          Newest notes first.
        </p>
      </section>
      <section aria-label='Updates' className='border-t border-line'>
        {updates.length ? (
          updates.map((update) => (
            <div key={update.id} className='border-b border-line py-5'>
              <UpdatePost update={update} isNew={isNew(update)} />
            </div>
          ))
        ) : (
          <p className='py-10 text-base leading-8 text-muted'>
            No announcements at the moment. Check back for news from the apiary.
          </p>
        )}
      </section>
    </div>
  );
}
