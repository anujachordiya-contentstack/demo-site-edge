export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  
  if (route === '/test') {
    const res = await fetch(`https://contentstack-com-implement-redirects.contentstackapps.com`);
    let response = await res.json();
    response = {
      ...response,
      time: new Date(),
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response), {
      headers: {
        'X-Message': 'Change response headers',
        'server': 'Launch'
      }
    })
  }

  return fetch(req)
}
