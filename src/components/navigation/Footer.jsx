import { Typography } from '@mui/material';

import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        Copyright: am2k
      </Typography>
      <Typography variant='subtitle1' align='center'>
        2022
      </Typography>
    </footer>
  );
};

export default Footer;
