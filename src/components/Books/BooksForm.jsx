import { useState } from 'react';
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from '../../store/books-actions';
import { bookActions } from '../../store/books-slice';
import classes from './Form.module.css';
const validateBook = (arrayOfBooks, newBookName) => {
  //Koristi se za provjeru da li vec postoji knjiga sa ovim nazivom
  let test;
  arrayOfBooks.forEach((book) => {
    if (book.name === newBookName) {
      test = true;
    }
  });
  return test;
};

const getAuthorID = (arrayOfAuthors, matchingName) => {
  //Vraca id autora kojeg je korisnik izabrao, kako bi mogli ga proslijediti na bazu
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
      setBookName(''); //Resetujemo vrijednost u input poljima nakon uspjesnog  dodavanja knjige
      setBookGenre('');
      setBookImage('');
      setAuthor(authors[0].name);
      dispatch(bookActions.addNewBook(true)); //Koristimo ovo zbog toga, sto je potrebno da dobijemo id knjige sa servera, te kada dodamo knjigu, potrebno je fetchati podatke sa servera, a nakon sekund ovu varijablu vracamo na false, pa ako neko zeli dodati novu knjigu, da to moze bez da je potrebno reloadati page
      setTimeout(() => {
        dispatch(bookActions.addNewBook(false));
      }, 1000);
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
        <div className={classes.inputs}>
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
      </Box>
      <Box>
        <Button onClick={addBookHandler} className={classes['action-button']}>
          Dodaj
        </Button>
      </Box>
      <Box className={classes['error-box']}>
        {extBook && (
          <div className={classes['error-message']}>
            <p>Knjiga vec postoji</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default BooksForm;
