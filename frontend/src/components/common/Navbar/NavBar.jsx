import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {resetUser} from "../../../features/userSlice"
import { showForm } from '../../../actions/formState';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = {
  estimator: "estimator",
  manage: "admin-board",
};
const settings = ["Profile", "Favourites", "Logout"];

const NavBar = () => {
  // * VARIABLES
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // * STATES
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
 
  // * EVENT HANDLERS
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (setting) => {
    if (setting === "Logout") {
      dispatch(resetUser());
      navigate("/");
      window.localStorage.clear()
    } else {
      navigate(`/${setting.toLowerCase()}`);
    }
    setAnchorElUser(null);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLoginForm = () => {
    dispatch(showForm());
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleNavigate}
          >
            KOM-PR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Mobile Menu */}
              {userData.id &&
                Object.keys(pages).map((page) => {
                  if (page === "manage" && userData.admin === false) {
                    return null;
                  }
                  return (
                    <Link
                      to={`/${pages[page]}`}
                      key={page}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        onClick={() => handleCloseNavMenu(page)}
                        sx={{ my: 2, color: "black", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  );
                })}
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleNavigate}
          >
            KOM-PR
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userData.id &&
              Object.keys(pages).map((page) => {
                if (page === "manage" && userData.admin === false) {
                  return null;
                }
                return (
                  <Link
                    to={`/${pages[page]}`}
                    key={page}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                );
              })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userData.id  ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: "1px solid white" }}>
                    <Avatar src={`${userData.avatar}`} alt={userData.firstName} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleLoginForm}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
