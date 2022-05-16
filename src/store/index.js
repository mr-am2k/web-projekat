import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './books-slice';
import authorSlice from './authors-slice';

const store = configureStore({
  reducer: { authors: authorSlice.reducer, books: bookSlice.reducer },
});

export default store;
