// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(process.env.test_env_2)
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ name: "John Doe" });
}
