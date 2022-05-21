import { Container, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container className={classes.container} maxWidth='lg'>
      <nav className={classes.navbar}>
        <div>
          <NavLink to='/'>
            <h1 className={classes.logo}>Saudade</h1>
          </NavLink>
        </div>
        <div
          className={`${classes['nav-content']} ${classes['nav-hamburger']} `}
        >
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={classes['action-button']}
          >
            <MenuIcon />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              className={classes['hamburger-link']}
              onClick={handleClose}
            >
              <Link to='/books'>Knjige</Link>
            </MenuItem>
            {!adminStatus && (
              <MenuItem
                className={classes['hamburger-link']}
                onClick={handleClose}
              >
                <Link to='/my-books'>Moje Knjige</Link>
              </MenuItem>
            )}

            <MenuItem
              className={classes['hamburger-link']}
              onClick={handleClose}
            >
              {!adminStatus && <Link to='/login'>Prijava</Link>}
              {adminStatus && (
                <Link onClick={adminStatusHandler} to='/'>
                  Odjava
                </Link>
              )}
            </MenuItem>
          </Menu>
        </div>
        <div className={`${classes['nav-content']} ${classes['nav-default']}`}>
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
              Prijava
            </NavLink>
          )}
          {adminStatus && (
            <Link onClick={adminStatusHandler} to='/'>
              Odjava
            </Link>
          )}
        </div>
      </nav>
    </Container>
  );
};

export default MainNavigation;
