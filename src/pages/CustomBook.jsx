import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
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
              <Button className={classes['mui-button']}>Dodaj u moje knjige</Button>
            </div>
          </div>

        </div>
      )}
    </Fragment>
  );
};

export default CustomBook;
