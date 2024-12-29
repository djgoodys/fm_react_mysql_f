import { createSlice } from '@reduxjs/toolkit';
import { getListEquipment } from '../thunks/listEquipmentThunk';

const initialState = { 
    loading: false, 
    list_equipment: [], 
    error:''
}

const listEquipmentSlice = createSlice({
  name: 'list_equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListEquipment.pending, (state) => {
        state.loading = true;
      })
   
      .addCase(getListEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.list_equipment = action.payload;
        state.error = ''
      }
    )
      .addCase(getListEquipment.rejected, (state, action) => {
        state.loading = false
        state.list_equipment = []
        state.error = action.error.message;
      });
  },
});

export default listEquipmentSlice.reducer;