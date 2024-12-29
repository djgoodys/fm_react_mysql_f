import { createSlice } from '@reduxjs/toolkit';
import { manageFilterTypes } from '../thunks/filterTypesThunk';

const initialState = { 
    loading: false, 
    filterTypes: [], 
    error: ''
};

const filterTypesSlice = createSlice({
    name: 'filterTypes',
    initialState,
    reducers: {
        // Synchronous reducers go here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(manageFilterTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(manageFilterTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.filterTypes = action.payload;
                state.error = '';
            })
            .addCase(manageFilterTypes.rejected, (state, action) => {
                state.loading = false;
                state.filterTypes = [];
                state.error = action.error.message;
            });
    },
});

export const { reducer: filterTypesReducer } = filterTypesSlice;
export default filterTypesSlice.reducer;
