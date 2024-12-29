import { createSlice } from '@reduxjs/toolkit';
import { manageTasks } from '../thunks/tasksThunk';

const initialState = { 
    loading: false, 
    tasks: [], 
    error: ''
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Synchronous reducers go here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(manageTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(manageTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = '';
            })
            .addCase(manageTasks.rejected, (state, action) => {
                state.loading = false;
                state.tasks = [];
                state.error = action.error.message;
            });
    },
});

export const { reducer: tasksReducer } = tasksSlice;
export default tasksSlice.reducer;