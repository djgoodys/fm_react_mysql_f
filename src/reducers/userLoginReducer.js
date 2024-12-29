import { createSlice } from '@reduxjs/toolkit';
import { Login } from '../thunks/loginThunk';
import { Logout } from '../thunks/logoutThunk'

const initialState = { 
    loggedIn: false,
    loading: false, 
    userData: [],
    error:'' 
}

const userLoginSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;

        if(action.payload.login ==="passed"){
          state.loggedIn = true
          localStorage.setItem("username", action.payload.user_name)
        }
        state.error = ''
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false
        state.userData = []
        state.error = action.error.message;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.loggedIn = false
        state.userData = null
        state.backupFolder = null

      });
  },
});

export default userLoginSlice.reducer;