import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateMyBooks } from '../store/my-book-actions';
import Loading from '../components/UI/Loading';
import classes from './CustomBook.module.css';
const CustomBook = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const books = useSelector((state) => state.books.books);
  const myBooks = useSelector((state) => state.myBooks.myBooks);
  const { bookId } = useParams();
  const [existingBook, setExistingBook] = useState(false);
  const [addedBook, setAddedBook] = useState(false);
  const targetedBook = books.find((book) => book.id === bookId);
  useEffect(() => {
    if (books && targetedBook) {
      setIsLoading(false);
    }
  }, [books, targetedBook]);
  const addToMyBooksHandler = () => {
    console.log(myBooks);
    const newMyBook = {
      id: targetedBook.id,
      name: targetedBook.name,
      image: targetedBook.image,
      genre: targetedBook.genre,
      author: targetedBook.author.name,
    };
    let bookExists;
    let newMyBooks;
    let emptyBooks = myBooks === null;
    if (emptyBooks === true) {
      console.log('ovdje trebam biti');
      bookExists = false;
    } else {
      console.log('ovdje ne trebam biti');
      bookExists = myBooks.find((book) => book.id === newMyBook.id);
    }
    if (bookExists) {
      setExistingBook(true);
      setTimeout(() => {
        setExistingBook(false);
      }, 2000);
      return;
    }
    if (emptyBooks) {
      newMyBooks = [newMyBook];
    } else {
      newMyBooks = [...myBooks, newMyBook];
    }
    dispatch(updateMyBooks(newMyBooks));
    setAddedBook(true);
    setTimeout(() => {
      setAddedBook(false);
    }, 2000);
  };
  return (
    <Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes['main-container']}>
          <div className={classes['image-box']}>
            <img
              src={targetedBook.image}
              srcSet={targetedBook.image}
              alt={targetedBook.name}
              loading='lazy'
            />
          </div>
          <div className={classes['content-box']}>
            <div className={classes['content-div']}>
              <h3 className={classes['content-info']}>
                Naziv: {targetedBook.name}
              </h3>
            </div>
            <div className={classes['content-div']}>
              <h3 className={classes['content-info']}>
                Autor: {targetedBook.author.name}
              </h3>
            </div>
            <div className={classes['content-div']}>
              <h3 className={classes['content-info']}>
                Zanr: {targetedBook.genre}
              </h3>
            </div>

            <div className={classes['content-button']}>
              <Button
                onClick={addToMyBooksHandler}
                className={classes['mui-button']}
              >
                Dodaj u moje knjige
              </Button>
            </div>
            {existingBook && (
              <p className={classes['info-paragraph']}>
                Vec ste dodali tu knjigu
              </p>
            )}
            {addedBook && (
              <p className={classes['info-paragraph']}>
                Uspjesno ste dodali knjigu
              </p>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CustomBook;
