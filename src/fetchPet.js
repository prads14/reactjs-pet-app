const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} response is not correct.`);
  }

  return apiRes.json();
};

export default fetchPet;
// export default async function fetchPet() {
//   let id = 1;
//   let obj;

//   const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

//   obj = await res.json();

//   return obj;
// }
