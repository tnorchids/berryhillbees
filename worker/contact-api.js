import { contact } from './index.js';

// A path-specific Worker in front of the existing Pages custom domain.
// It serves no site assets and has no route on the production hostname.
export default {
  fetch(request, env) {
    if (new URL(request.url).pathname !== '/api/contact') {
      return new Response('Not found', { status: 404 });
    }
    return contact(request, env);
  }
};
