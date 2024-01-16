import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, location, images, id } = props;
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="absolute block bottom-0 pl-2 bg-gradient-to-tr from-black to-transparent text-white">
        <h1>{name}</h1>
        <h2>
          {animal} &mdash; {breed} &mdash; {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
