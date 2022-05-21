import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './books-slice';
import authorSlice from './authors-slice';
import adminSlice from './admin-slice'
import myBookSlice from './my-book-slice'

const store = configureStore({
  reducer: { authors: authorSlice.reducer, books: bookSlice.reducer, admin: adminSlice.reducer, myBooks: myBookSlice.reducer },
});

export default store;
