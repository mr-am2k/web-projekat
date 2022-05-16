import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';
const MainNavigation = () => {
  return (
    <Container className={classes.container} maxWidth='lg'>
      <nav className={classes.navbar}>
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : '')}
            to='/'
          >
            <h1 className={classes.logo}>Knjige</h1>
          </NavLink>
        </div>
        <div className={classes['nav-content']}>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : '')}
            to='/books'
          >
            Knjige
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : '')}
            to='/my-books'
          >
            Moje Knjige
          </NavLink>
        </div>
      </nav>
    </Container>
  );
};

export default MainNavigation;
