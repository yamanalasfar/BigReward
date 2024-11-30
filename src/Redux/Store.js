import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./Slices/CountryCodeSlice";
import offerReducer from "./Slices/OffersSlice";

const store = configureStore({
  reducer: {
    country: countryReducer,
    offers : offerReducer,
  },
});
export default store;