export function getLegacyRedirect(href) {
  const current = new URL(href);
  if (!current.hash.startsWith('#/')) return null;

  const target = new URL(current.hash.slice(1), current.origin);
  // Never let a malformed bookmark redirect to an external host.
  if (target.origin !== current.origin) return null;
  target.pathname = target.pathname.replace(/\/+$/, '') || '/';
  if (target.pathname === '/purchase') target.pathname = '/buyonline';
  for (const key of new Set(current.searchParams.keys())) {
    if (!target.searchParams.has(key)) {
      for (const value of current.searchParams.getAll(key))
        target.searchParams.append(key, value);
    }
  }
  return `${target.pathname}${target.search}${target.hash}`;
}
