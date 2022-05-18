import { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminActions } from '../store/admin-slice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import classes from './Login.module.css';

let usernameError = false; //Zbog problema sa useState-om se koriste ove dvije varijable
let passwordError = false;
const validateUsername = (username, func1) => {
  if (username.trim() === '') {
    usernameError = true;
    func1('Polje korisnicko ime ne smije biti prazno');
  } else if (username.trim() !== 'admin') {
    usernameError = true;
    func1('Pogresno korisnicko ime');
  } else {
    usernameError = false;
    func1('')
  }
};
const validatePassword = (password, func1) => {
  if (password.trim() === '') {
    passwordError = true;
    func1('Polje sifra ne smije biti prazno');
  } else if (password.trim() !== 'admin') {
    passwordError = true;
    func1('Pogresna sifra')
  } else {
    passwordError = false;
  }
};

const theme = createTheme();
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userError, setUserError] = useState()
  const [passError, setPassError] = useState()
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    validateUsername(data.get('username'), setUsernameErrorMessage);
    validatePassword(data.get('password'), setPasswordErrorMessage);
    if (usernameError) {
        setUserError(true)
    }else{
        setUserError(false)
    }
    if (passwordError) {
        setPassError(true)
    }else{
        setPassError(false)
    }
    if (!usernameError && !passwordError) {
      navigate('/');
      dispatch(adminActions.changeLoginStatus(true));
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            className={classes['input-field']}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Korisnicko ime'
              name='username'
              autoComplete='username'
              autoFocus
            />
            {userError && (
              <Grid container>
                <Grid item>
                  <Typography className={classes['error-message']} variant='h4'>
                    {usernameErrorMessage}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Sifra'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {passError && (
              <Grid container>
                <Grid item>
                  <Typography className={classes['error-message']} variant='h4'>
                    {passwordErrorMessage}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              className={classes['login-button']}
            >
              Prijavite se
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
