import { Container } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminActions } from '../../store/admin-slice';
import classes from './Navbar.module.css';
const MainNavigation = () => {
  const dispatch = useDispatch();
  const adminStatus = useSelector((state) => state.admin.isLoggedIn);
  const adminStatusHandler = () => {
    dispatch(adminActions.changeLoginStatus(false));
  };
  return (
    <Container className={classes.container} maxWidth='lg'>
      <nav className={classes.navbar}>
        <div>
          <NavLink to='/'>
            <h1 className={classes.logo}>Saudade</h1>
          </NavLink>
        </div>
        <div className={classes['nav-content']}>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : '')}
            to='/books'
          >
            Knjige
          </NavLink>
          {!adminStatus && (
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/my-books'
            >
              Moje Knjige
            </NavLink>
          )}
          {!adminStatus && (
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : '')}
              to='/login'
            >
              Login
            </NavLink>
          )}
          {adminStatus && (
            <Link onClick={adminStatusHandler} to='/'>
              Logout
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};

export default MainNavigation;
