import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { deleteBook } from '../../store/books-actions';
import { bookActions } from '../../store/books-slice';
import classes from './BookCard.module.css';
const getBookID = (books, bookName) => {
  let bookID;
  books.forEach((book) => {
    if (book.name === bookName) {
      bookID = book.id;
    }
  });
  return bookID;
};
const BookCard = (props) => {
  const dispatch = useDispatch();
  const adminStatus = useSelector((state) => state.admin.isLoggedIn);
  const books = useSelector((state) => state.books.books);
  const navigation = useNavigate();
  const moreInfoRedirectHandler = () => {
    navigation('/books/' + props.bookId);
  };
  const removeBookHandler = () => {
    dispatch(deleteBook(getBookID(books, props.bookName)));
    dispatch(bookActions.addNewBook(true));
    setTimeout(() => {
      dispatch(bookActions.addNewBook(false));
    }, 1000);
  };
  return (
    <Container className={classes['card-container']}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            onClick={moreInfoRedirectHandler}
            className={classes['card-media']}
            component='img'
            height={props.height}
            image={props.bookImage} //Pri loadu stranice se ucitavaju podaci, te se slika samo prikazuje kad se podaci ucitaju, tj. kada random book postoji
            alt='Book picture'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {props.bookName}
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              {props.authorName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes['action-buttons']}>
          <Button
            className={classes['mui-button']}
            onClick={moreInfoRedirectHandler}
            size='small'
            color='primary'
          >
            Vise informacija
          </Button>
          {!adminStatus && (
            <Button
              className={classes['mui-button']}
              size='small'
              color='primary'
            >
              Dodaj u moje knjige
            </Button>
          )}
          {adminStatus && (
            <Button
              onClick={removeBookHandler}
              className={classes['mui-button']}
              size='small'
              color='primary'
            >
              Ukloni knjigu
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
};

export default BookCard;
