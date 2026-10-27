const json = (message, status = 200) =>
  Response.json(
    { message },
    { status, headers: { 'Cache-Control': 'no-store' } }
  );

export async function contact(request, env) {
  if (request.method !== 'POST') return json('Method not allowed.', 405);
  if (request.headers.get('Origin') !== new URL(request.url).origin)
    return json('Please send your message from our contact page.', 403);
  if (!request.headers.get('Content-Type')?.startsWith('application/json'))
    return json('Invalid request.', 415);
  let data;
  try {
    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return json('Your message is too long.', 413);
      }
      chunks.push(value);
    }
    data = JSON.parse(await new Blob(chunks).text());
    if (!data || typeof data !== 'object') throw new Error('Invalid body');
  } catch {
    return json('Please check your message and try again.', 400);
  }
  if (data.website) return json('Thanks! Your message has been sent.');
  const { name, email, message } = data;
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > 5000
  ) {
    return json(
      'Please enter your name, a valid email, and a message of up to 5,000 characters.',
      400
    );
  }
  if (
    !env.EMAIL ||
    !env.CONTACT_FROM ||
    !env.CONTACT_TO ||
    !env.CONTACT_LIMITER
  )
    return json(
      'Messaging is temporarily unavailable. Please try us on Facebook.',
      503
    );
  try {
    const { success } = await env.CONTACT_LIMITER.limit({
      key: request.headers.get('CF-Connecting-IP') || 'unknown'
    });
    if (!success)
      return json('Please wait a minute before sending another message.', 429);
    await env.EMAIL.send({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      replyTo: email.trim(),
      subject: 'Berry Hill Bees website message',
      text: `From: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    });
    return json('Thanks! Your message has been sent.');
  } catch {
    return json(
      'We couldn’t send your message. Please try again later or contact us on Facebook.',
      502
    );
  }
}

export default {
  fetch(request, env) {
    if (new URL(request.url).pathname === '/api/contact')
      return contact(request, env);
    return env.ASSETS.fetch(request);
  }
};
