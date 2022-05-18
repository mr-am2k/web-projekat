import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Button } from '@mui/material';
import BookCard from '../components/UI/BookCard';
import classes from './Books.module.css';
const Books = () => {
  const books = useSelector((state) => state.books.books);
  return (
    <Container>
    <Container  maxWidth='md' className={classes['books-buttons']}>
    <Button>Dodaj Knjigu</Button>
    <Button>Dodaj autora</Button>
    </Container>
  
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
