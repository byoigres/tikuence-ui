import React, { useEffect } from 'react';
import { Link as InertiaLink } from '@inertiajs/react';
import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// Icons
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
// Project imports
import UserCard from './UserCard';
import { Home } from '@mui/icons-material';

const drawerWidth = 240;

const sx = {
  drawerPaper: (theme) => ({
    width: theme.spacing(30),
  })
};

const StyledNav = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    // width: drawerWidth,
    // flexShrink: 0,
  },
}));

const DrawerMenu = ({ open, onClose, isAuthenticated, credentials }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => { }, [open]);

  return (
    // <Box component="nav" sx={sx.nav}>
    <Drawer
      variant={match ? 'permanent' : 'temporary'}
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={open}
      PaperProps={{
        sx: sx.drawerPaper,
      }}
      onClose={() => { }}
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
    // </Box>
  );

  // return (
  //   <Drawer
  //     anchor="left"
  //     open={open}
  //     onClose={onClose}
  //   >
  //     <List>
  //       <ListItem>
  //         <ListItemText primary="Menu" />
  //       </ListItem>
  //       <Divider />
  //       <ListItem>
  //         <ListItemText primary="Home" />
  //       </ListItem>
  //       <ListItem>
  //         <ListItemText primary="About" />
  //       </ListItem>
  //       <ListItem>
  //         <ListItemText primary="Contact" />
  //       </ListItem>
  //       <Divider />
  //       {isAuthenticated && (
  //         <>
  //           <ListItem>
  //             <ListItemText primary="Dashboard" />
  //           </ListItem>
  //           <ListItem>
  //             <ListItemText primary="Profile" />
  //           </ListItem>
  //           <ListItem>
  //             <ListItemText primary="Logout" />
  //           </ListItem>
  //         </>
  //       )}
  //       {!isAuthenticated && (
  //         <>
  //           <ListItem>
  //             <ListItemText primary="Login" />
  //           </ListItem>
  //           <ListItem>
  //             <ListItemText primary="Register" />
  //           </ListItem>
  //         </>
  //       )}
  //     </List>
  //   </Drawer>
  // );
}

export default DrawerMenu;
