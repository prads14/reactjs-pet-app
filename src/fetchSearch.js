const fetchSearch = async ({ queryKey }) => {
  const { animal, breed, location, page } = queryKey[1];
  const apiRes = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&breed=${breed}&location=${location}&page=${page}`,
  );

  if (!apiRes.ok) {
    throw new Error(`Pets search response is not correct.`);
  }

  return apiRes.json();
};

export default fetchSearch;
