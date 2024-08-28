import React from 'react';
import Navbar from './Navbar';
import DrawerMenu from './DrawerMenu';

const Navigation = ({ isAuthenticated, profile }) => (
  <>
    <Navbar isAuthenticated={isAuthenticated} profile={profile} />
    <DrawerMenu />
  </>
);

export default Navigation;
