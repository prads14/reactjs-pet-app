import Pet from "./Pet";

const Results = ({ pets, isLoading }) => {
  if (isLoading) {
    return <div className="search">Data loading</div>;
  }
  return (
    <div>
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
