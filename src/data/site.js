export const site = {
  name: 'Berry Hill Bees',
  url: 'https://berryhillbees.com',
  sameAs: ['https://www.facebook.com/berryhillbees']
};

export function canonicalUrl(path) {
  return new URL(path, site.url).href;
}

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: `${site.url}/`,
      sameAs: site.sameAs
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      publisher: { '@id': `${site.url}/#organization` },
      inLanguage: 'en-US'
    }
  ]
};
