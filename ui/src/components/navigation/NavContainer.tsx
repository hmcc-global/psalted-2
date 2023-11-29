import React, { useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import NavBarMobile from './NavBarMobile';
import SidebarMobile from './SidebarMobile';
import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

const NavContainer: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const excludeNavbarRoutes = ['/signup'];
  const shouldRenderNavbar = !excludeNavbarRoutes.includes(location.pathname);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {shouldRenderNavbar &&
        (isMobile ? <NavBarMobile onToggleSidebar={handleToggleSidebar} /> : <NavBar />)}
      {isMobile ? <SidebarMobile isOpen={isSidebarOpen} /> : <Sidebar />}
    </div>
  );
};

export default NavContainer;
