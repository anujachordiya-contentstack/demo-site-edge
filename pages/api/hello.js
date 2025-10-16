// pages/api/log-test.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


function handler2(){
const logPayload = {
    env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    //body: req.body,
    host: req.headers.host,
    href: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`,
    stage: process.env.NEXT_PUBLIC_LAUNCH_STAGE || 'local',
    localeCode: req.headers['accept-language'] || 'unknown',
    loggedIn: !!req.headers['authorization'],
    scope: req.query.scope || null,
    limit: req.query.limit || null,
    customVars: {
      AH_COLLECTION_ID5: process.env.AH_COLLECTION_ID5,
      SOME_OTHER_ENV: process.env.SOME_OTHER_ENV || 'unset'
    },
    timestamp: new Date().toISOString(),
     env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    //headers: req.headers,
    query: req.query,
    //body: req.body,
    host: req.headers.host,
    href: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`,
    stage: process.env.NEXT_PUBLIC_LAUNCH_STAGE || 'local',
    localeCode: req.headers['accept-language'] || 'unknown',
    loggedIn: !!req.headers['authorization'],
    scope: req.query.scope || null,
    limit: req.query.limit || null,
    customVars: {
      AH_COLLECTION_ID5: process.env.AH_COLLECTION_ID5,
      SOME_OTHER_ENV: process.env.SOME_OTHER_ENV || 'unset'
    },
    timestamp: new Date().toISOString(),
     env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    //headers: req.headers,
    query: req.query,
    //body: req.body,
    host: req.headers.host,
    href: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`,
    stage: process.env.NEXT_PUBLIC_LAUNCH_STAGE || 'local',
    localeCode: req.headers['accept-language'] || 'unknown',
    loggedIn: !!req.headers['authorization'],
    scope: req.query.scope || null,
    limit: req.query.limit || null,
    customVars: {
      AH_COLLECTION_ID5: process.env.AH_COLLECTION_ID5,
      SOME_OTHER_ENV: process.env.SOME_OTHER_ENV || 'unset'
    },
    timestamp: new Date().toISOString(),
     env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    //headers: req.headers,
    query: req.query,
    //body: req.body,
    host: req.headers.host,
    href: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`,
    stage: process.env.NEXT_PUBLIC_LAUNCH_STAGE || 'local',
    localeCode: req.headers['accept-language'] || 'unknown',
    loggedIn: !!req.headers['authorization'],
    scope: req.query.scope || null,
    limit: req.query.limit || null,
    customVars: {
      AH_COLLECTION_ID5: process.env.AH_COLLECTION_ID5,
      SOME_OTHER_ENV: process.env.SOME_OTHER_ENV || 'unset'
    },
    timestamp: new Date().toISOString()
  };


  // Log a full structured JSON payload — this is what might get filtered on Launch
  console.log('---- BEGIN STRUCTURED LOG ----');
  console.log(logPayload);
  console.log('---- END STRUCTURED LOG ----');

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: "Structured log generated successfully",
    observedStage: logPayload.stage,
  });
  
}


export default function handler(req, res) {
const before = process.memoryUsage();
 await handler2(req, res)
  const after = process.memoryUsage();
  const diffMB = ((after.heapUsed - before.heapUsed) / 1024 / 1024).toFixed(2);
  console.log((before.rss / 1024 / 1024).toFixed(2), (after.rss / 1024 / 1024).toFixed(2), diffMB)
}
