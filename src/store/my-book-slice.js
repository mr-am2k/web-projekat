import { createSlice } from '@reduxjs/toolkit';
const myBookSlice = createSlice({
  name: 'myBook',
  initialState: {
    myBooks: [],
  },
  reducers: {
    replaceBooks(state, action) {
      state.myBooks = action.payload;
    },
  },
});
export const myBookActions = myBookSlice.actions;

export default myBookSlice;
