// pages/api/log-test.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const logPayload = {
    env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
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
