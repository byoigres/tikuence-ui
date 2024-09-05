import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { usePage } from "@inertiajs/react";
import UserAvatar from "../UserAvatar";
import UserDropdowMenu from "./UserDropdowMenu";

const UserAvatarMenu = () => {
  const {
    props: {
      auth: { isAuthenticated, profile },
    },
  } = usePage();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const avatar = isAuthenticated ? (
    <UserAvatar />
  ) : (
    <AccountCircleIcon fontSize="large" />
  );

  return (
    <>
      <Tooltip title={isAuthenticated ? profile.name : "Login"}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-haspopup="true"
          onClick={handleUserMenuClick}
        >
          {avatar}
        </IconButton>
      </Tooltip>
      <UserDropdowMenu anchorEl={anchorEl} handleUserMenuClose={handleUserMenuClose} />
    </>
  );
}

export default UserAvatarMenu;
