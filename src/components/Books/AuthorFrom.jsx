import { useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import classes from './AuthorForm.module.css';
const AuthorFrom = () => {
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
          label='Autor'
        />
      </div>
      <Button className={classes['action-button']}>Dodaj</Button>
    </Box>
  );
};

export default AuthorFrom;
