import { Grid, Container } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookCard from '../components/UI/BookCard';
import classes from './Books.module.css';
const MyBooks = () => {
  const myBooks = useSelector((state) => state.myBooks.myBooks);
  const [noBooks, setNoBooks] = useState(true);
  useEffect(() => {
    if (myBooks !== null && myBooks.length > 0) {
      setNoBooks(false);
    }
  }, [myBooks]);
  return (
    <Fragment>
      {!noBooks && (
        <Container className={classes['books-grid']} maxWidth='md'>
          <Grid container spacing={4}>
            {myBooks.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <BookCard
                  bookId={book.id}
                  height={240}
                  bookImage={book.image}
                  bookName={book.name}
                  authorName={book.authorName}
                  myBook={true}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {noBooks && <p className={classes['info-paragraph']}>Nemate knjiga</p>}
    </Fragment>
  );
};

export default MyBooks;
