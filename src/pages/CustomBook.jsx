import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../components/UI/Loading';
import classes from './CustomBook.module.css';
const CustomBook = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const books = useSelector((state) => state.books.books);
  const { bookId } = useParams();
  const targetedBook = books.find((book) => book.id === bookId);
  useEffect(() => {
    if (books && targetedBook) {
      setIsLoading(false);
    }
  }, [books, targetedBook]);
  return (
    <Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <Container className={classes['main-container']}>
          <div className={classes['image-box']}>
            <img
              src={targetedBook.image}
              srcSet={targetedBook.image}
              alt={targetedBook.name}
              loading='lazy'
            />
          </div>
          <div className={classes['content-box']}>
            <h3 className={classes['content-info']}>
              Naziv: {targetedBook.name}
            </h3>
            <h3 className={classes['content-info']}>
              Autor: {targetedBook.author.name}
            </h3>
            <h3 className={classes['content-info']}>
              Zanr: {targetedBook.genre}
            </h3>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default CustomBook;
