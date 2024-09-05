import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { usePage, Link as InertiaLink } from "@inertiajs/react";

// Project imports
import Logo from "../Logo";
import UserAvatar from "../UserAvatar";
import HamburgerMenu from "./HamburgerMenu";


const sx = {
  nav: {
    display: "flex",
  },
  appBar: (theme) => ({
    [theme.breakpoints.up("md")]: {
      display: "none",
      zIndex: 1201,
    },
  }),
}

const NavBar = ({ handleDrawerToggle }) => {
  const {
    props: {
      auth: { isAuthenticated, profile }
    },
  } = usePage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="nav" sx={sx.nav}>
      <AppBar position="fixed" sx={sx.appBar}>
        <Toolbar>
          <HamburgerMenu handleDrawerToggle={handleDrawerToggle} />
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
                <UserAvatar image={profile.picture} letter={profile.name[0]} size="small" />
              ) : (
              <AccountCircleIcon />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
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
    </Box>
  );
};

export default NavBar;
