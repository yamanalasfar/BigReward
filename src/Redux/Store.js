import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./Slices/CountryCodeSlice";
import offerReducer from "./Slices/OffersSlice";
import giftsReducer from "./Slices/GiftsSlice";
import balanceReducer from "./Slices/BalanceSlice";
import historyReducer from "./Slices/ActivitySlice";
import profileReducer from "./Slices/ProfileSlice";


const store = configureStore({
  reducer: {
    country: countryReducer,
    offers: offerReducer,
    gifts: giftsReducer, 
    balance: balanceReducer,
    history: historyReducer,
    profile: profileReducer,
  },
});
export default store;