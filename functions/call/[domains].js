export default async function handler(request, response){
  try{

  const res = await fetch(process.env.API_URL + `/domain/${request.params.domains}`)
  const data = await res.json()
  response.status(200).send(data);
  }catch(error){
    console.error(error);
    response.status(500).send({ error: 'Internal Server Error custom' });
  }
}
