// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import('../../instrumentation.js').then(({ register }) => {
  register();
});

export default function handler(req, res) {
  console.log('vars length:',process.env.AH_COLLECTION_ID5);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ name: "John Doe" });
}
