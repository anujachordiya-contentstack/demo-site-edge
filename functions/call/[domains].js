export default async function handler(request, response){
  const res = await fetch(process.env.API_URL + `/domain/${request.params.domains}`)
  const data = await res.json()
  response.status(200).send(data);
}
