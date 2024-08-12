export default function handler(request, response) {
  console.log("🚀 ~ handler ~ request:", request.body)
  const users = [
    { name: 'sanika' },
    { name: 'siddhi' },
    { name: 'shravani' }
  ];

  console.log("query params", request.query)
  console.log("env", process.env.test_env)
  console.log("env", process.env.test_env_2)

  response.status(200).send({
    body: request.body,
    users,
    query: request.query
  });
}
