export default function handler(request, response){
  response.status(200).send(`${request.params.domains} is not blocked at this api`);
}
