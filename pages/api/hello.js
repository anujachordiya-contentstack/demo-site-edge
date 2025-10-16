export default function handler(req, res) {
  const logObject = {"level":"info","time":1760430301264,"traceId":"e004c7bc-8e2b-4268-a7b2-92ee653e2cdd","date":"2025-10-14T08:25:01.264Z","msg":"getRecallNotifications","payload":{"languageCode":"en-ie","scope":"homepage","limit":6,"ignoreTaxonomyIfScoped":false},"context":{"clientId":"36bb4dc1-056e-4fb0-991b-c40ec6fffe98","stage":"dev","localeCode":"en_IE","host":"localhost:3000","domain":"philips.ie","href":"http://localhost:3000/","loggedIn":true}};

  // Log as object
  console.log('=== LOG AS OBJECT ===');
  console.log(logObject);
  console.log('\n\n');

  // Log as stringified JSON (compact)
  console.log('=== LOG AS STRINGIFIED (COMPACT) ===');
  console.log(JSON.stringify(logObject));
  console.log('\n\n');

  // Log as stringified JSON (pretty-printed with indentation)
  console.log('=== LOG AS STRINGIFIED (PRETTY-PRINTED) ===');
  console.log(JSON.stringify(logObject, null, 2));
  console.log('\n\n');

  // Log using console.dir (deep inspection)
  console.log('=== LOG USING console.dir (DEEP INSPECTION) ===');
  console.dir(logObject, { depth: null, colors: true });
  console.log('\n\n');

  // Log using console.table (for nested objects)
  console.log('=== LOG USING console.table ===');
  console.table(logObject);
  console.log('\n\n');

  res
    .status(200)
    .send({
      query: req.query,
      method: req.method,
      body: req.body,
      headers: req.headers,
      randomNum: Math.floor((Math.random()*100) + 1)
    });
}
