import { createSlice } from '@reduxjs/toolkit';
import {manageFilterTypes} from '../thunks/filterTypesThunk';

const initialState = {
    loading: false,
    filter_types: [],
    error: ''
  };

const filterTypesSlice = createSlice({
  name: 'filter_types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageFilterTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageFilterTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.filter_types = action.payload;
        state.error = ''
      }
    )
      .addCase(manageFilterTypes.rejected, (state, action) => {
        state.loading = false
        state.filter_types = []
        state.error = action.error.message;
      });
  },
});

export default filterTypesSlice.reducer