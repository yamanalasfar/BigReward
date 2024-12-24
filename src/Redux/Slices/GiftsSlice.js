import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetGifts from "../../Api's/Gifts";

export const fetchGifts = createAsyncThunk(
    "gifts/fetchGifts",
    async (_, { rejectWithValue }) => {
        try {
            const data = await GetGifts(); // Fetch API data
            return data; // Directly return the full response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const giftsSlice = createSlice({
    name: "gifts",
    initialState: {
        gifts: {}, // Store the raw API response
        categories: [], // Extracted categories
        balance: 0, // User's balance
        status: "idle", // Track request status
        error: null, // Track errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGifts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGifts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.gifts = action.payload; // Store full response for flexibility
                state.balance = action.payload.balance; // Extract balance
                state.categories = action.payload.cat; // Extract categories
            })
            .addCase(fetchGifts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default giftsSlice.reducer;
