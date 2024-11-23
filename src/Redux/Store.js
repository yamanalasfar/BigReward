import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./Slices/CountryCodeSlice";

const store = configureStore({
    reducer: {
      country: countryReducer,
    },
  });
  
  export default store;