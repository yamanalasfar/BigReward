import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetOffers from "../../Api's/Home";

export const fetchOffers = createAsyncThunk(
    "offers/fetchOffers",
    async (countryCode, { rejectWithValue }) => {
        try {
            const offers = await GetOffers(countryCode); 
            return offers;
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
);

const offersSlice = createSlice({
    name: "offers",
    initialState: {
        sdkOffers: [],
        webOffers: [],
        cpaOffers: [],
        cpvOffers: [],
        status: "idle", 
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.sdkOffers = action.payload.sdkOffers;
                state.webOffers = action.payload.webOffers;
                state.cpaOffers = action.payload.cpaOffers;
                state.cpvOffers = action.payload.cpvOffers;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default offersSlice.reducer;
