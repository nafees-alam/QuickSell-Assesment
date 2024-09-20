import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "DataReducer",
  initialState: {
    loading: false,
    allTickets: [],
    allUser: [],
  },
  reducers: {
    DATA_REQUEST: (state) => {
      state.loading = true;
    },
    DATA_SUCCESS: (state, action) => {
      state.loading = false;
      state.allTickets = action.payload.tickets;
      state.allUser = action.payload.users;
    },
    DATA_FAILURE: (state) => {
      state.loading = false;
      state.allTickets = [];
      state.allUser = [];
    },
  },
});

// Exporting the actions and reducers
export const { DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } = dataSlice.actions;

export const DataReducer = dataSlice.reducer;
