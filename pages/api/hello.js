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


    
console.log(`[${new Date().toLocaleString()}] ---- BEGIN STRUCTURED LOG ----`);
console.log('This is useful for debugging. Is clubbing showing up in telemetry rather than console.This is useful for debugging. Is clubbing showing up in telemetry rather than console');
console.log('new log');
console.log('log present.Is clubbing showing up');
console.log(`[${new Date().toLocaleString()}] ---- END STRUCTURED LOG ----`);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: "Structured log generated successfully",
    observedStage: logPayload.stage,
  });
  
  
}
