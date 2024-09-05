import React from "react";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { usePage, Link as InertiaLink } from "@inertiajs/react";

const UserDropdowMenu = ({ anchorEl, handleUserMenuClose }) => {
  const {
    props: {
      auth: { isAuthenticated, profile },
    },
  } = usePage();
  return (
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
  );
};

export default UserDropdowMenu;
