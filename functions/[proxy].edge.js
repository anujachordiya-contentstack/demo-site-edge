export default async function handler(request, context) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    if(hostname === 'www.vineshkamble.xyz'){
        return new Response(null, {
            status: 302,
            headers: { Location: 'https://vineshkamble.xyz' } // Fixed: comma instead of semicolon, added https://
        });
    }
    return fetch(request); // Fixed: added return
}
