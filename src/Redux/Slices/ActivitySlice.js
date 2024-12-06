import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetActivity from "../../Api's/Activity";

export const fetchActivity = createAsyncThunk(
    "activity/fetchActivity",
    async (_, { rejectWithValue }) => {
        try {
            const data = await GetActivity(); // `data` is the parsed response from the API
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message); // Use API error details if available
        }
    }
);


const activitySlice = createSlice({
    name: "activity",
    initialState: {
        activity: [], // Store the activity data here
        status: "idle", // Track request status
        error: null, // Track errors
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchActivity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.activity = action.payload.activity || action.payload; // Adjust based on response
            })
            .addCase(fetchActivity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});
export default activitySlice.reducer;
