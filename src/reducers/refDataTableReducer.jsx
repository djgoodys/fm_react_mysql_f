import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  dataTableRef: null,
};

export const setDataTableRef = createAsyncThunk(
  'dataTableRef/setDataTableRef',
  (ref) => ref
);

const dataTableSlice = createSlice({
  name: 'dataTableRef',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDataTableRef.fulfilled, (state, action) => {
      state.dataTableRef = action.payload;
    });
  },
});

export default dataTableSlice.reducer;
