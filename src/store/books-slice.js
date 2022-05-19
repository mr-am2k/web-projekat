import { createSlice } from '@reduxjs/toolkit';
const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
  },
  reducers: {
    replaceBooks(state, action) {
      state.books = action.payload;
    },
    addNewBook(state, action) {
      const newBook = action.payload;
      state.books.push(newBook);
    },
  },
});
export const bookActions = bookSlice.actions;

export default bookSlice;
