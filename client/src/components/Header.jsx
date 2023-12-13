import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/logo_black.jpg';
import CartLogo from './CartLogo';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { updateIsAuth } from '../store/reducers/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MessageIcon from '@mui/icons-material/Message';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { email, userRole } = useSelector((state) => state.FilterReducer);

  useEffect(() => {
    window.localStorage.setItem('role', userRole);
  }, [userRole]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.localStorage.removeItem('isAuth');
    window.localStorage.removeItem('role');
    dispatch(updateIsAuth(false))
    navigate('/login');
    handleClose();
  };


  return (
    <div className="top-bar">
      <Link to="/">
        <img src={logo} alt="logo" className="header-logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/" className="dark">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cosmetics" className="dark">
              Cosmetics
            </Link>
          </li>
          <li>
            <Link to="/about" className="dark">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="dark">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <CartLogo className="cart-image-dark" />
            </Link>
          </li>

          {userRole === 'ADMIN' && (          
              <Link to="/addgoods">
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={0} color="error">
                    <AddCircleIcon style={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
          )}
          {userRole === 'ADMIN' && (          
              <Link to="/contactAdmin">
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={0} color="error">
                    <MessageIcon style={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
          )}
           {userRole === 'ADMIN' && (          
              <Link to="/orders">
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={0} color="error">
                    <ContactPageIcon style={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
          )}

          <li>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <PersonIcon style={{ border: "1px solid black", borderRadius: "30%" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile {email}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
