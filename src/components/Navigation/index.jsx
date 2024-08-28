import React, { useState } from 'react';
import Navbar from './Navbar';
import DrawerMenu from './DrawerMenu';

const Navigation = ({ isAuthenticated, profile }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} profile={profile} handleDrawerToggle={handleDrawerToggle} />
      <DrawerMenu open={isDrawerOpen} onClose={() => { setIsDrawerOpen(false); }} />
    </>
  );
}

export default Navigation;
