import { createSlice } from "@reduxjs/toolkit";

const searchParamsSlice = createSlice({
  name: "requestParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
      page: 0,
    },
  },

  reducers: {
    all: (store, action) => {
      store.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
