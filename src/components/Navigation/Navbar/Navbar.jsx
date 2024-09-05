import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
// Project imports
import Logo from "../Logo";
import HamburgerMenu from "./HamburgerMenu";
import UserAvatarMenu from "./UserAvatarMenu";

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

const NavBar = ({ handleDrawerToggle }) => (
  <Box component="nav" sx={sx.nav}>
    <AppBar position="fixed" sx={sx.appBar}>
      <Toolbar>
        <HamburgerMenu handleDrawerToggle={handleDrawerToggle} />
        <Logo size={"small"} disableGutters sx={{ flexGrow: 1 }} />
        <UserAvatarMenu />
      </Toolbar>
    </AppBar>
  </Box>
);

export default NavBar;
