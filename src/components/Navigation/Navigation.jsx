import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import DrawerMenu from './Drawer/DrawerMenu';

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <DrawerMenu
        open={isDrawerOpen}
        onClose={() => { setIsDrawerOpen(false); }}
      />
    </>
  );
}

export default Navigation;
