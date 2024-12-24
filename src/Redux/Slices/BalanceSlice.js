import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetBalance from "../../Api's/GetBalance";

export const fetchBalance = createAsyncThunk(
    'balance/fetchBalance',
    async (_, { rejectWithValue }) => {
        try {
          const data = await GetBalance();
          return data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
);

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
      b: 0,
      u: '',
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBalance.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBalance.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.b = action.payload.b;
          state.u = action.payload.u;
        })
        .addCase(fetchBalance.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export default balanceSlice.reducer;