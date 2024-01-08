import { useState, useContext } from "react";
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
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          setSearchParams({
            animal: formData.get("animal") || "",
            breed: formData.get("breed") || "",
            location: formData.get("location") || "",
            page: 0,
          });

          formData.set("animal", "");
        }}
      >
        <div>
          {adoptedPet.length > 0 ? (
            <div className="carousel-smaller">
              {adoptedPet.map((pet) => (
                <img src={pet.images[0]} alt={pet.name} key={pet.id} />
              ))}
            </div>
          ) : null}
        </div>
        <label htmlFor="location">
          Location
          <input
            name="location"
            type="text"
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
            name="animal"
            id="animal"
            value={animal}
          >
            <option />
            {Animals.map((animal) => (
              <option key={animal.toLowerCase()}>{animal.toLowerCase()}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" disabled={breeds.length === 0} id="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <div className="search">
        <Results pets={pets} isLoading={isLoading} />
        <div className="pagination">
          {Array.from({
            length: Math.ceil(results?.data?.numberOfResults / 10 ?? 0),
          }).map((it, index) => (
            <button
              className={searchParams?.page === index ? "active" : ""}
              key={index + 1}
              onClick={() => setSearchParams({ ...searchParams, page: index })}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
