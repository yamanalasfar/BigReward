import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetHistory from "../../Api's/Activity";

// Asynchronous thunk to fetch the hist data
export const fetchHist = createAsyncThunk(
    "history/fetchHist",
    async (_, { rejectWithValue }) => {
        try {
            const data = await GetHistory(); // Fetch hist data
            return data; // Return the data directly
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Reject with error
        }
    }
);

// Create a slice to handle hist data
const histSlice = createSlice({
    name: "history",
    initialState: {
        hist: [], // Store the list of history objects
        status: "idle", // Track request status (idle/loading/succeeded/failed)
        error: null, // Track errors
    },
    reducers: {
        // You can define additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchHist.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.hist = action.payload; // Store the hist data
            })
            .addCase(fetchHist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload; // Store the error message
            });
    },
});

export default histSlice.reducer;
