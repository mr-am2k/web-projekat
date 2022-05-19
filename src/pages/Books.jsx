import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Button } from '@mui/material';
import BookCard from '../components/UI/BookCard';
import BooksForm from '../components/Books/BooksForm';
import AuthorFrom from '../components/Books/AuthorFrom';
import classes from './Books.module.css';
const Books = () => {
  const books = useSelector((state) => state.books.books);
  const adminStatus = useSelector((state) => state.admin.isLoggedIn);
  const [addBook, setAddBook] = useState(true);
  const [addAuthor, setAddAuthor] = useState(false);

  const addBookHandler = () => {
    setAddBook(true);
    setAddAuthor(false);
  };
  const addAuthorHandler = () => {
    setAddAuthor(true);
    setAddBook(false);
  };

  return (
    <Container>
      {adminStatus && (
        <div>
          <Container maxWidth='md' className={classes['books-buttons']}>
            <Button
              onClick={addBookHandler}
              className={classes['action-button']}
            >
              Dodaj Knjigu
            </Button>
            <Button
              onClick={addAuthorHandler}
              className={classes['action-button']}
            >
              Dodaj autora
            </Button>
          </Container>
          {addBook && <BooksForm />}
          {addAuthor && <AuthorFrom />}
        </div>
      )}
      <Container className={classes['books-grid']} maxWidth='md'>
        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4}>
              <BookCard
                bookId={book.id}
                height={240}
                bookImage={book.image}
                bookName={book.name}
                authorName={book.author.name}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default Books;
