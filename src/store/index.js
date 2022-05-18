import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './books-slice';
import authorSlice from './authors-slice';
import adminSlice from './admin-slice'

const store = configureStore({
  reducer: { authors: authorSlice.reducer, books: bookSlice.reducer, admin: adminSlice.reducer },
});

export default store;
