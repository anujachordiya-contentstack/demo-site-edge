export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  console.log(req.headers.get('CF-Connecting-IP'))
  const modifiedReq = new Request(request)
  modifiedReq.headers.set("x-forwarded-for", modifiedReq.headers.get('CF-Connecting-IP'))
  console.log(modifiedReq.headers.get('x-forwarded-for'))
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

  const modifiedRequest = new Request(req)
  return fetch(modifiedRequest)
}
