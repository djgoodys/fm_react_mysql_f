import { createSlice } from '@reduxjs/toolkit';
import { getTasks} from '../thunks/tasksThunk';

const initialState = { 
    loading: false, 
    tasks: [], 
    error:''
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = ''
      }
    )
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false
        state.tasks = []
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;