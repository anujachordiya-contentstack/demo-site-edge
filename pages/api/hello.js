// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let apiCallCounter2 = ()=>{}
import('../../instrumentation.js').then(({ register, apiCallCounter }) => {
  register();
  apiCallCounter2 = apiCallCounter;
});

export default function handler(req, res) {
  console.log('vars length:', process.env.AH_COLLECTION_ID5);

  // Increment the API call counter
  // apiCallCounter2.add(1, { route: '/api/hello' });// not working

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ name: "John Doe" });
}