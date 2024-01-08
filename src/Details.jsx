import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBountry";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div>
        <h2> loading data</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        {showModal ? (
          <Modal>
            <div>
              <div> Would you like to adopt {pet.name}</div>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet((pets) => [...pets, pet]);
                    navigation("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
        <p>{pet.description}</p>
      </div>
      <div></div>
    </div>
  );
};

function DetailsErrorBoundry(props) {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
}

export default DetailsErrorBoundry;
