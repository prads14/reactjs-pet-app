const fetchBreedList = async ({ queryKey }) => {
  const animal = queryKey[1];
  const breeds = [];
  if (animal) {
    const apiRes = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
    );

    if (!apiRes.ok) {
      throw new Error("Breeds list not fetched.");
    }

    return apiRes.json();
  }
  return breeds;
};

export default fetchBreedList;
