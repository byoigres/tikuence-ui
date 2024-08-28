import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link as InertiaLink } from "@inertiajs/react";
import { styled } from "@mui/material/styles";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";

const StyledNav = styled("nav")(({ theme }) => ({
  display: "flex",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
    zIndex: 1201,
  },
}));

const NavBar = ({ isAuthenticated, profile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledNav>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <MenuIcon />
          </IconButton>
          <Logo size={"small"} disableGutters sx={{ flexGrow: 1 }} />
          <Tooltip title={isAuthenticated ? profile.name : "Login"}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-haspopup="true"
              onClick={handleUserMenuClick}
            >
              {isAuthenticated ? (
                <UserAvatar letter={profile.name[0]} />
              ) : (
              <AccountCircleIcon />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </StyledAppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
      >
        {isAuthenticated && [
          <MenuItem
            key="menu-item-user-profile"
            onClick={handleUserMenuClose}
            component={InertiaLink}
            href={`/users/${profile.name}`}
          >
            My Profile
          </MenuItem>,
          <MenuItem key="menu-item-logout" component="a" href="/auth/logout">
            <Typography color="secondary">Logout</Typography>
          </MenuItem>,
        ]}
        {!isAuthenticated && [
          <MenuItem
            key="menu-item-auth-login"
            component={InertiaLink}
            href="/auth/signin"
          >
            Sing in
          </MenuItem>,
          <MenuItem
            key="menu-item-auth-register"
            component={InertiaLink}
            href="/auth/signup"
          >
            <Typography color="secondary">Create account</Typography>
          </MenuItem>
        ]}
      </Menu>
    </StyledNav>
  );
};

export default NavBar;
