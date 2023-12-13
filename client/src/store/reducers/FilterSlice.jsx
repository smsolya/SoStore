import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: localStorage.getItem("email") || "",
  isAuth: localStorage.getItem('isAuth') || true,
  userRole: localStorage.getItem('role') || "USER",
  firstName: "",
  lastName: "",
  addressLine: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  nameCard: "",
  numberCard: "",
  expiryData: "",
  cvv: ""
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {

    updateIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateAddressLine: (state, action) => {
      state.addressLine = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
    updateZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
    updateCountry: (state, action) => {
      state.country = action.payload;
    },
    updateNameCard: (state, action) => {
      state.nameCard = action.payload;
    },
    updateNumberCard: (state, action) => { 
      state.numberCard = action.payload;
    },
    updateExpiryData: (state, action) => { 
      state.expiryData = action.payload;
    },
    updateCvv: (state, action) => { 
      state.cvv = action.payload;
    },
  },
});

export const { updateIsAuth, updateEmail, updateUserRole,updateFirstName, updateLastName, updateAddressLine, updateCity, updateState, updateZipCode, updateCountry, updateCvv, updateExpiryData, updateNumberCard, updateNameCard} = FilterSlice.actions;

export default FilterSlice.reducer;