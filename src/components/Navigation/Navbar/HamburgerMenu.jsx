import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const HamburgerMenu = ({ handleDrawerToggle }) => (
  <IconButton
    color="inherit"
    aria-label="open
    drawer"
    edge="start"
    onClick={handleDrawerToggle}
  >
    <MenuIcon />
  </IconButton>
);

export default HamburgerMenu