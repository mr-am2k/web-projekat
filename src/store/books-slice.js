import { createSlice } from '@reduxjs/toolkit';
const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    addedNewBook: false,
  },
  reducers: {
    replaceBooks(state, action) {
      state.books = action.payload;
    },
    addNewBook(state, action) {
      state.addedNewBook = action.payload;
    },
  },
});
export const bookActions = bookSlice.actions;

export default bookSlice;
