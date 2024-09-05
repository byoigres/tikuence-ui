import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as InertiaLink } from '@inertiajs/react';

const DrawerItemButton = ({ icon, text, href, onClick, color = "primary", variant = "outlined" }) => {
  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),
      })}
    >
      <Button
        startIcon={icon}
        color={color}
        variant={variant}
        fullWidth
        href={href}
        LinkComponent={InertiaLink}
        onClick={onClick}
      >
        {text}
      </Button>
    </Box>
  );
}

export default DrawerItemButton;
