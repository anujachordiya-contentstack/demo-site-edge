export default async function handler(request, response){
  const res = await fetch(ProcessingInstruction.env.API_URL + `/domains/${request.params.domains}`)
  const data = await res.json()
  response.status(200).send(data);
}
