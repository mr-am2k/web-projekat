import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';
import classes from './App.module.css'
const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container className={classes['main-container']}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/my-books' element={<MyBooks />} />
        </Routes>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default App;
