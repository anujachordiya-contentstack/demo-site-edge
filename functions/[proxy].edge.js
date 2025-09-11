export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  
  const userAgent = req.headers.get('user-agent');
console.log("requested", route)
  const redirectRequest = new Request(`https://contentstack-com-implement-redirects.devcontentstackapps.com${route}`);
    const res = await fetch(redirectRequest);
    console.log(res.status)
    if(!res.ok){
      return new Response('Internal Server Error', { status: 500 });
    }
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

  return fetch(req)
}
