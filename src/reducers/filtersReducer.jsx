import { createSlice } from '@reduxjs/toolkit';
import { manageFilters} from '../thunks/filtersThunk';

const initialState = { 
    loading: false, 
    filters: [], 
    error:''
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.filters = action.payload;
        state.error = ''
      }
    )
      .addCase(manageFilters.rejected, (state, action) => {
        state.loading = false
        state.filters = []
        state.error = action.error.message;
      });
  },
});

export default filtersSlice.reducer