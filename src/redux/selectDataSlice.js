import { createSlice } from "@reduxjs/toolkit";

const selectDataSlice = createSlice({
    name: "SelectDataReducer",
    initialState: {
      loading: false,
      selectedData: [],
      user: null,
      message: "",
    },
    reducers: {
      SELECT_DATA_REQUEST: (state) => {
        state.loading = true;
        state.selectedData = [];
      },
      SELECT_DATA_SUCCESS: (state, action) => {
        state.loading = false;
        state.selectedData = action.payload.filteredList;
        state.user = action.payload.isUserFilter;
      },
      SELECT_DATA_FAILURE: (state, action) => {
        state.loading = false;
        state.selectedData = [];
        state.message = action.payload.message;
      },
    },
  });

  export const { SELECT_DATA_REQUEST, SELECT_DATA_SUCCESS, SELECT_DATA_FAILURE } = selectDataSlice.actions;
  export const SelectDataReducer = selectDataSlice.reducer;