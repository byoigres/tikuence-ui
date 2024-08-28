import React, { useEffect } from 'react';
import { Link as InertiaLink } from '@inertiajs/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Icons
import HomeIcon from '@mui/icons-material/Home';
// Project imports
import UserCard from './UserCard';

const sx = {
  drawerPaper: (theme) => ({
    width: theme.spacing(30),
  })
};

const DrawerMenu = ({ open, onClose, isAuthenticated, credentials }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => { }, [open]);

  const userCard = credentials ? (
    <UserCard
      variant="contained"
      nameText={credentials.name}
      usernameText={`${credentials.username}`}
      pictureUrl={credentials.picture}
      onClick={() => {
        onClose();
      }}
    />
  ) : null;

  return (
    <Drawer
      variant={match ? 'permanent' : 'temporary'}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      PaperProps={{
        sx: sx.drawerPaper,
      }}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <List>
        <ListItem key="home" disablePadding>
          <ListItemButton
            LinkComponent={InertiaLink}
            href="/"
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}

export default DrawerMenu;
