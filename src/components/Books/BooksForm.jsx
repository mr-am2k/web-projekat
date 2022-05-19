import { useState } from 'react';
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../store/books-actions';
import classes from './Form.module.css';
const validateBook = (arrayOfBooks, newBookName) => {
  let test;
  arrayOfBooks.forEach((book) => {
    if (book.name === newBookName) {
      test = true;
    }
  });
  return test;
};

const getAuthorID = (arrayOfAuthors, matchingName) => {
  let authorID;
  arrayOfAuthors.forEach((author) => {
    if (author.name.trim() === matchingName.trim()) {
      authorID = author.id;
    }
  });
  return authorID;
};

const BooksForm = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const books = useSelector((state) => state.books.books);
  const [author, setAuthor] = useState(authors[0].name);
  const [bookName, setBookName] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [extBook, setExtBook] = useState(false);
  const setBookNameHandler = (event) => {
    setBookName(event.target.value);
  };
  const setBookGenreHandler = (event) => {
    setBookGenre(event.target.value);
  };
  const setBookImageHandler = (event) => {
    setBookImage(event.target.value);
  };
  const handleChange = (event) => {
    setAuthor(event.target.value);
    console.log(event.target.value);
  };
  const addBookHandler = () => {
    const newBook = {
      name: bookName,
      genre: bookGenre,
      image: bookImage,
      author: {
        id: getAuthorID(authors, author),
        name: author,
      },
    };
    if (validateBook(books, newBook.name)) {
      setExtBook(true);
    } else {
      setExtBook(false);
      dispatch(addBook(newBook));
    }
  };
  return (
    <Box className={classes['author-container']}>
      <Box
        className={classes['books-form']}
        component='form'
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            value={bookName}
            onChange={setBookNameHandler}
            className={classes['input-field']}
            required
            id='outlined-required'
            label='Naziv Knjige'
          />
          <TextField
            value={bookGenre}
            onChange={setBookGenreHandler}
            className={classes['input-field']}
            required
            id='outlined-required'
            label='Zanr'
          />
          <TextField
            value={bookImage}
            onChange={setBookImageHandler}
            className={classes['input-field']}
            required
            id='outlined-required'
            label='URL slike'
          />
          <TextField
            className={classes['input-field']}
            id='outlined-select-currency'
            select
            label='Autor'
            value={author}
            onChange={handleChange}
          >
            {authors.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button onClick={addBookHandler} className={classes['action-button']}>
          Dodaj
        </Button>
      </Box>
      {extBook && (
        <div className={classes['error-message']}>
          <h1>Knjiga vec postoji</h1>
        </div>
      )}
    </Box>
  );
};

export default BooksForm;
