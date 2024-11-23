import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetCountryCode from "../../Api's/GetCountryCode";

export const fetchCountryCode = createAsyncThunk(
    'country/fetchCountryCode',
    async (_, { rejectWithValue }) => {
        try {
          const data = await GetCountryCode();
          return { countryCode: data.countryCode, ip: data.query };
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

const countrySlice = createSlice({
    name: 'country',
    initialState: {
      countryCode: '',
      ip: '',
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCountryCode.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCountryCode.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.countryCode = action.payload.countryCode;
          state.ip = action.payload.ip;
        })
        .addCase(fetchCountryCode.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export default countrySlice.reducer;