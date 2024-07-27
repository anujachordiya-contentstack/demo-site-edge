import t from "test"
export default function handler(request, response) {
  console.log("🚀 ~ handler ~ request:", request.body)
  const users = [
    { name: 'sanika' },
    { name: 'siddhi' },
    { name: 'shravani' }
  ];

  console.log("query params", request.query)

  response.status(200).send({
    body: request.body,
    users,
    query: request.query
  });
}
