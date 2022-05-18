import { createSlice } from '@reduxjs/toolkit';
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    changeLoginStatus(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});
export const adminActions = adminSlice.actions;

export default adminSlice;
