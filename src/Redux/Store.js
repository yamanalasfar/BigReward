import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./Slices/CountryCodeSlice";
import offerReducer from "./Slices/OffersSlice";
import activityReducer from "./Slices/ActivitySlice";

const store = configureStore({
  reducer: {
    country: countryReducer,
    offers: offerReducer,
    activity : activityReducer, 
  },
});
export default store;