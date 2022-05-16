import { createSlice } from '@reduxjs/toolkit';
const authorSlice = createSlice({
  name: 'author',
  initialState: {
    authors: [],
  },
  reducers: {
    replaceAuthors(state, action) {
      state.authors = action.payload;
    },
    addNewAuthor(state, action) {
      const newAuthor = action.payload;
      state.authors.push(newAuthor);
    },
  },
});
export const authorActions = authorSlice.actions;

export default authorSlice;
