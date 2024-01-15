import Pet from "./Pet";

const Results = ({ pets, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="mini loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-1 w-11/12 my-0 mx-auto sm:grid-cols-2 lg:grid-cols-2">
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
