export default async function handler(req, context) {
  const parsedUrl = new URL(req.url);
  const route = parsedUrl.pathname;
  const envVariable = context.env.TEST_KEY;
  
  if (route === '/test') {
    const res = await fetch(`https://contentstack-com-implement-redirects.contentstackapps.com/123`,{headers:{ "Host":"contentstack-com-implement-redirects.contentstackapps.com"}});
    return res;
  }

  return fetch(req)
}
