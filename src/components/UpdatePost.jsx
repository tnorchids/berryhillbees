import { formatUpdateDate } from '../utils/updates.js';

export function NewUpdateBadge() {
  return (
    <span className='rounded-sm border border-honey/30 bg-honey/10 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-ink'>
      New
    </span>
  );
}

export default function UpdatePost({ update, isNew }) {
  return (
    <article aria-labelledby={`update-${update.id}`}>
      <div className='mb-2 flex flex-wrap items-center gap-3 text-xs text-muted'>
        <time dateTime={update.publishedOn}>
          {formatUpdateDate(update.publishedOn)}
        </time>
        {isNew && <NewUpdateBadge />}
      </div>
      <h2
        id={`update-${update.id}`}
        className='font-serif text-2xl leading-tight tracking-tight'
      >
        {update.title}
      </h2>
      <p className='mt-2 text-base leading-7 text-muted'>{update.text}</p>
      {update.link && (
        <a
          href={update.link.href}
          className='mt-2 inline-block py-2 text-sm underline decoration-honey underline-offset-4 hover:text-muted'
        >
          {update.link.label} <span aria-hidden='true'>→</span>
        </a>
      )}
    </article>
  );
}
