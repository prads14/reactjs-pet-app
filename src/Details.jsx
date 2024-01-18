import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundry from "./ErrorBountry";
import Modal from "./Modal";

// removing context and adding store
// import AdoptedPetContext from "./AdoptedPetContext";

import { useDispatch } from "react-redux";
import { add_pet } from "./adoptedPetSlice";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();
  // eslint-disable-next-line no-unused-vars
  // removing function for adopted pet context
  // const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const dispatch = useDispatch();

  if (results.isLoading) {
    return (
      <div>
        <h2> loading data</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="w-11/12 my-0 mx-auto p-3">
      <Carousel images={pet.images} />
      <div>
        <h1 className=" text-3xl text-gray-900">{pet.name}</h1>
        <h2 className=" italic font-bold">{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button
          className="bg-gray-900 text-white p-3 border-2 hover:bg-gray-600 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        {showModal ? (
          <Modal>
            <div className="fixed bg-gray-900 top-0 right-0 left-0 flex flex-col justify-center items-center text-white z-10 p-4">
              <div> Would you like to adopt {pet.name}</div>
              <div className="flex block">
                <button
                  onClick={() => {
                    dispatch(add_pet(pet));
                    //setAdoptedPet((pets) => [...pets, pet]);
                    navigation("/");
                  }}
                  className="button mr-2"
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)} className="button">
                  No
                </button>
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
