import { Typography } from '@mui/material';

import classes from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        Footer
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary'>
        Something to give purpose to the footer
      </Typography>
    </footer>
  );
};

export default Footer;
