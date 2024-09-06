// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import('../../instrumentation.js').then(({ register, apiCallCounter }) => {
  register();
});

export default function handler(req, res) {
  console.log('vars length:', process.env.AH_COLLECTION_ID5);

  // Increment the API call counter
  // import('../../instrumentation.node.js').then(({ apiCallCounter }) => {
  //   apiCallCounter.add(1, { route: '/api/hello' });
  // });

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ name: "John Doe" });
}