export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  console.log(req.headers.get('x-forwarded-for'));
  
  const userAgent = req.headers.get('user-agent');
  console.log('User-Agent:', userAgent);
  if (route === '/test') {
    const res = await fetch(`https://random-data-api.com/api/v2/appliances`);
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
