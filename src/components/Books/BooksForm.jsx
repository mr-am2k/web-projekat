import { useState } from 'react';
import { Button, Box, TextField, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import classes from './BooksForm.module.css';
const BooksForm = () => {
  const authors = useSelector((state) => state.authors.authors);
  const [author, setAuthor] = useState(authors[0].name);
  const handleChange = (event) => {
    setAuthor(event.target.value);
  };
  return (
    <Box
      className={classes['books-form']}
      component='form'
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          className={classes['input-field']}
          required
          id='outlined-required'
          label='Naziv Knjige'
        />
        <TextField
          className={classes['input-field']}
          required
          id='outlined-required'
          label='Zanr'
        />
        <TextField
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
      <Button className={classes['action-button']}>Dodaj</Button>
    </Box>
  );
};

export default BooksForm;
