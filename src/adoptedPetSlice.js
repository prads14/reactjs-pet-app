import { createSlice } from "@reduxjs/toolkit";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    pets: [],
  },
  reducers: {
    add_pet: (state, action) => {
      // CHecking if the pet is already adopted
      const isAdopted = state.pets
        ? state.pets.find((item) => item.id === action.payload.id)
        : false;
      if (!isAdopted) {
        state.pets = [...state.pets, action.payload];
      }
    },
  },
});

export const { add_pet } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
