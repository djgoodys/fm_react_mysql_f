import { createSlice } from '@reduxjs/toolkit';
import { manageUsers} from '../thunks/usersThunk';

const initialState = { 
    loading: false, 
    users: [], 
    error:''
}

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(manageUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = ''
      }
    )
      .addCase(manageUsers.rejected, (state, action) => {
        state.loading = false
        state.users= []
        state.error = action.error.message;
      });
  },
});

export default UsersSlice.reducer;