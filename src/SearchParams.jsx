import { useState, useContext, useTransition } from "react";
// import useBreedList from "./useBreedList";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import fetchBreedList from "./fetchBreedList";
import AdoptedPetContext from "./AdoptedPetContext";
// import Page from "./Page";;
const Animals = ["cat", "dog", "bird", "rabbit", "raptile"];

const SearchParams = () => {
  const DefaultState = {
    searchParams: {
      animal: "",
      breed: "",
      location: "",
      page: 0,
    },
  };
  const [isPending, startTransition] = useTransition();

  const [searchParams, setSearchParams] = useState(
    DefaultState["searchParams"],
  );

  const [animal, setAnimal] = useState("");
  const [adoptedPet] = useContext(AdoptedPetContext);
  // const [pets, setPets] = useState([]);
  //   const [breeds] = useBreedList(animal);

  const breedslist = useQuery(["breeds", animal], fetchBreedList);

  const [breeds] = [breedslist?.data?.breeds ?? [], breedslist.status];

  // useEffect(() => {
  //   requestPets();
  //   return () => {
  //     console.log("component is unmounting here.");
  //   };
  // }, []);

  const results = useQuery(["search", searchParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  const isLoading = results?.isLoading || false;

  return (
    <>
      <div className="flex w-11/12 my-0 mx-auto">
        {adoptedPet.length > 0 ? (
          <div className="inline-block">
            <h3 className="font-semibold"> Adoption List: </h3>
            {adoptedPet.map((pet) => (
              <img
                src={pet.images[0]}
                alt={pet.name}
                key={pet.id}
                className="carousel-item"
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex w-11/12 my-0 mx-auto">
        <form
          className=" p-10 mb-10 bg-gray-200 shadow-lg flex flex-col justify-start items-center"
          onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData(e.target);

            startTransition(() => {
              setSearchParams({
                animal: formData.get("animal") || "",
                breed: formData.get("breed") || "",
                location: formData.get("location") || "",
                page: 0,
              });
            });

            formData.set("animal", "");
          }}
        >
          <label htmlFor="location">
            Location
            <input
              name="location"
              type="text"
              className="search-input"
              id="location"
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              onChange={(e) => {
                setAnimal(e.target.value);
              }}
              className="search-input"
              name="animal"
              id="animal"
              value={animal}
            >
              <option />
              {Animals.map((animal) => (
                <option key={animal.toLowerCase()}>
                  {animal.toLowerCase()}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              className="search-input disabled:grayed-disabled"
              name="breed"
              disabled={breeds.length === 0}
              id="breed"
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed}>{breed}</option>
              ))}
            </select>
          </label>
          {isPending ? (
            <div className="mini loading-pane">
              <h2 className="loader">🌀</h2>
            </div>
          ) : (
            <button className="button">Submit</button>
          )}
        </form>
        <div className="block w-full">
          <Results pets={pets} isLoading={isLoading} />
          <div className="flex flex-row gap-2 justify-start items-center m-2 pagination ml-10">
            {Array.from({
              length: Math.ceil(results?.data?.numberOfResults / 10 ?? 0),
            }).map((it, index) => (
              <button
                className={
                  searchParams?.page === index
                    ? " bg-slate-200 px-3 py-2"
                    : "bg-slate-500 px-3 py-2"
                }
                key={index + 1}
                onClick={() =>
                  setSearchParams({ ...searchParams, page: index })
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchParams;
