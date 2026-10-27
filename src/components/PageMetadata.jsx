import { useEffect } from 'react';
import { pageMetadata, notFoundMetadata } from '../data/pageMetadata.js';

export default function PageMetadata({ path }) {
  useEffect(() => {
    const metadata = pageMetadata[path] ?? notFoundMetadata;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').content =
      metadata.description;
    let robots = document.querySelector('meta[name="robots"]');
    if (!pageMetadata[path]) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.append(robots);
      }
      robots.content = 'noindex';
    } else {
      robots?.remove();
    }
  }, [path]);
  return null;
}
