import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';
import CustomBook from './pages/CustomBook';
import Login from './pages/Login';
import classes from './App.module.css';
import { getAuthors } from './store/authors-actions';
import { getBooks } from './store/books-actions';
import { getMyBooks } from './store/my-book-actions';
import { useDispatch } from 'react-redux';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //Pozivanje prilikom loada aplikaceije, get requestova, koji osiguravaju da su nam svi autori, knjige i nase knjige dostupni, kako bi ih mogli globalno koristiti
    dispatch(getAuthors());
    dispatch(getBooks());
    dispatch(getMyBooks());
  }, [dispatch]);
  return (
    <Fragment>
      <Navbar />
      <Container className={classes['main-container']}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/*' exact element={<Books />} />
          <Route path='/books/:bookId' element={<CustomBook />} />
          <Route path='/my-books' element={<MyBooks />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
