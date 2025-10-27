// pages/api/log-test.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction




export default function handler(req, res) {
const logPayload = {
    env: process.env.NODE_ENV,
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    timestamp: new Date().toISOString()
  };


  // Log a full structured JSON payload — this is what might get filtered on Launch
  console.log('---- BEGIN STRUCTURED LOG ----');
  console.log(logPayload);
  console.log('http://localhost:4000',logPayload);
  console.log('local:4000 1', logPayload);
  console.log('http://' + 'localhost:4000 2');
  console.log(JSON.stringify({ url: 'http://localhost:4000 3' }));
  console.log('Endpoint: localhost:4000' 4, );
  console.log('http://127.0.0.1:4000 5');

  console.log({ endpoint: 'http://localhost:4000' });
  console.log('---- END STRUCTURED LOG ----');

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: "Structured log generated successfully",
    observedStage: logPayload.stage,
  });
  
  
}
