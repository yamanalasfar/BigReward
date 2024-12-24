import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetProfile from "../../Api's/Profile/GetProfileData";

// Asynchronous thunk to fetch the profile data
export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const data = await GetProfile(); // Fetch profile data
            return data; // Return the full profile response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Handle and reject with error
        }
    }
);

// Create a slice to manage the profile data
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        data: {}, // Store the profile object
        status: "idle", // Track request status (idle/loading/succeeded/failed)
        error: null, // Track any errors
    },
    reducers: {
        // Add reducers here if additional local state changes are needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = "loading"; // Set status to loading while the request is in progress
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = "succeeded"; // Set status to succeeded when the request completes
                state.data = action.payload; // Store the fetched profile data
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = "failed"; // Set status to failed when the request fails
                state.error = action.payload; // Store the error message
            });
    },
});

export default profileSlice.reducer;
