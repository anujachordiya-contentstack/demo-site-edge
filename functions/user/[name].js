export default async function handler(request, response) {
  await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds
  response.status(200).send(`Hello ${request.query.name}`);
}
