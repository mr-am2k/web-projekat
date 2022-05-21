import { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addAuthor } from '../../store/authors-actions';
import classes from './Form.module.css';
const validateAuthor = (arrayOfAuthors, newAuthorName) => {
  //Koristi se za provjeru da li postoji vec autor sa tim podacima, kako bi izbjegli fetch istog autora
  let test;
  arrayOfAuthors.forEach((author) => {
    if (author.name === newAuthorName) {
      test = true;
    }
  });
  return test;
};
const AuthorFrom = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const [extAuthor, setExtAuthor] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const updateAuthorNameHandler = (event) => {
    setAuthorName(event.target.value);
  };

  const addAuthorHandler = () => {
    const newAuthor = {
      name: authorName,
    };
    if (validateAuthor(authors, newAuthor.name)) {
      setExtAuthor(true);
    } else {
      setExtAuthor(false);
      dispatch(addAuthor(newAuthor));
      setAuthorName('');
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
            value={authorName}
            onChange={updateAuthorNameHandler}
            className={classes['input-field']}
            required
            id='outlined-required'
            label='Autor'
          />
        </div>
      </Box>
      <Box>
        <Button onClick={addAuthorHandler} className={classes['action-button']}>
          Dodaj
        </Button>
      </Box>
      <Box className={classes['error-box']}>
        {extAuthor && (
          <div className={classes['error-message']}>
            <p>Autor vec postoji</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default AuthorFrom;
