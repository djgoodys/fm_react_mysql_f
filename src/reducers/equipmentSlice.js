import { createSlice } from '@reduxjs/toolkit';
import { manageEquipment } from '../thunks/listEquipmentThunk';

const initialState = { 
    loading: false, 
    equipment: [], 
    error: ''
};

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        // Synchronous reducers go here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(manageEquipment.pending, (state) => {
                state.loading = true;
            })
            .addCase(manageEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.equipment = action.payload;
                state.error = '';
            })
            .addCase(manageEquipment.rejected, (state, action) => {
                state.loading = false;
                state.equipment = [];
                state.error = action.error.message;
            });
    },
});

export const { reducer: equipmentReducer } = equipmentSlice;
export default equipmentSlice.reducer;
