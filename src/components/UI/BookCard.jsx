import { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../store/books-actions';
import { bookActions } from '../../store/books-slice';
import { getMyBooks, updateMyBooks } from '../../store/my-book-actions';
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
  const myBooks = useSelector((state) => state.myBooks.myBooks);
  const [existingBook, setExistingBook] = useState(false);
  const [addedBook, setAddedBook] = useState(false);
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

  const addToMyBooksHandler = () => {
    const newMyBook = {
      id: props.bookId,
      name: props.bookName,
      image: props.bookImage,
      genre: props.bookGenre,
      author: props.authorName,
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
  const removeFromMyBooksHandler = () => {
    let indexForRemoving
    let temporaryBooks = [...myBooks]
    console.log(myBooks)
    const removeBookID = props.bookId;
    myBooks.find((book, index) => {
      if(book.id === removeBookID)
      indexForRemoving = index
    });
    console.log(indexForRemoving)
    temporaryBooks.splice(indexForRemoving,1)
    dispatch(updateMyBooks(temporaryBooks));
    dispatch(getMyBooks())
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
          {!adminStatus && !props.myBook && (
            <Button
              onClick={addToMyBooksHandler}
              className={classes['mui-button']}
              size='small'
              color='primary'
            >
              Dodaj u moje knjige
            </Button>
          )}
          {adminStatus && !props.myBook && (
            <Button
              onClick={removeBookHandler}
              className={classes['mui-button']}
              size='small'
              color='primary'
            >
              Ukloni knjigu
            </Button>
          )}
          {props.myBook && (
            <Button
              onClick={removeFromMyBooksHandler}
              className={classes['mui-button']}
              size='small'
              color='primary'
            >
              Ukloni moju knjigu
            </Button>
          )}
        </CardActions>
        {existingBook && (
          <p className={classes['info-paragraph']}>Vec ste dodali tu knjigu</p>
        )}
        {addedBook && (
          <p className={classes['info-paragraph']}>
            Uspjesno ste dodali knjigu
          </p>
        )}
      </Card>
    </Container>
  );
};

export default BookCard;
