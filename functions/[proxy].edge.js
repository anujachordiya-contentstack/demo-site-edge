export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  console.log('CF-Connecting-IP',req.headers.get('CF-Connecting-IP'))
  console.log('x-forwarded-for',req.headers.get('x-forwarded-for'))
  if (route === '/test') {

    const modifiedRequest = new Request(new URL('/users', parsedUrl), req)
    const requestWithCF = new Request(modifiedRequest)
    const res = await fetch(requestWithCF);
    let response = await res.json();
    response = {
      ...response,
      envVariableValue: envVariable,
    }
    return new Response(JSON.stringify(response))
  }
  if (route === '/external') {
    const modifiedRequest = new Request('https://5e28-103-239-86-172.ngrok-free.app', req)

    // const modifiedRequest = new Request('https://webhook.site/2f864b70-aabe-4d17-9964-29ed6d59c719?id=1', req)
    // const modifiedRequest = new Request('https://dummytest.requestcatcher.com/test', req)
    const requestWithCF = new Request(modifiedRequest)
    requestWithCF.headers.set('Cache-Control','no-cache')
    return fetch(requestWithCF);
  }

  const modifiedRequest = new Request(req)
  return fetch(modifiedRequest)
}
