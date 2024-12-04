export default async function handler(request) {
  
  const modifiedUrl = new URL(request.url);
  if (modifiedUrl.hostname === 'demo-site-edge-dev.devcontentstackapps.com') {
    console.log('Redirecting to demo-site-edge-npmrc.devcontentstackapps.com');
    modifiedUrl.hostname = 'demo-site-edge-npmrc.devcontentstackapps.com';
    return Response.redirect(modifiedUrl, 301)
  }
  return fetch(request);
}
