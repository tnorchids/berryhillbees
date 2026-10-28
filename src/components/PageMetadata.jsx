import { useEffect } from 'react';
import { pageMetadata, notFoundMetadata } from '../data/pageMetadata.js';
import { canonicalUrl, siteStructuredData } from '../data/site.js';

export default function PageMetadata({ path }) {
  useEffect(() => {
    const metadata = pageMetadata[path] ?? notFoundMetadata;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').content =
      metadata.description;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (pageMetadata[path]) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = canonicalUrl(path);
    } else {
      canonical?.remove();
    }
    let structuredData = document.getElementById('site-structured-data');
    if (path === '/') {
      if (!structuredData) {
        structuredData = document.createElement('script');
        structuredData.id = 'site-structured-data';
        structuredData.type = 'application/ld+json';
        document.head.append(structuredData);
      }
      structuredData.textContent = JSON.stringify(siteStructuredData);
    } else {
      structuredData?.remove();
    }
    let robots = document.querySelector('meta[name="robots"]');
    if (!pageMetadata[path] || metadata.noindex) {
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
