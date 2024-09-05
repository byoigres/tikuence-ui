import React, { useEffect } from 'react';
import { usePage, Link as InertiaLink, router } from '@inertiajs/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// Icons
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// Project imports
import Logo from './Logo';
import DrawerItemButton from './DrawerItemButton';
import DrawerDivider from './DrawerDivider';

const sx = {
  drawerPaper: (theme) => ({
    width: theme.spacing(30),
  }),
};

const DrawerMenu = ({ open, onClose }) => {
  const {
    props: {
      auth: { isAuthenticated, profile }
    },
  } = usePage();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

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
      {match && (
          <Logo />
      )}
      <DrawerDivider />
      {isAuthenticated && (
        <DrawerItemButton
          icon={<AddIcon />}
          text="Create new list"
          href="/lists/add"
          onClick={(e) => {
            e.preventDefault();
            router.visit('/lists/add', {
              method: 'get',
              preserveState: true,
              preserveScroll: true,
              only: ['auth', 'flash', 'errors', 'referer', 'modal'],
            });
          }}
        />
      )}

      <DrawerDivider />
      <List sx={{ display: 'initial-flex', flexGrow: 1 }}>
        <ListItem key="home" disablePadding alignItems='flex-start'>
          <ListItemButton
            LinkComponent={InertiaLink}
            href="/"
            color="secondary"
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
      {!isAuthenticated && (
        <>
          <DrawerDivider />
          <DrawerItemButton
            color="primary"
            variant="outlined"
            text="Sign in"
            href="/auth/signin"
          />
          <DrawerItemButton
            color="secondary"
            variant="contained"
            text="Create new account"
            href="/auth/signup"
          />
        </>
      )}
      {isAuthenticated && match && (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={profile.picture} />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Typography>{profile.name}</Typography>
                )}
                secondary={
                  <Typography
                    component="span"
                    variant="caption"
                  >
                    {`@${profile.username}`}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="logout" disablePadding>
            <ListItemButton component={InertiaLink} href="/auth/logout">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
}

export default DrawerMenu;
