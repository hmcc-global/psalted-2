import { Navigate } from 'react-router-dom';
import { useState, cloneElement, isValidElement, ReactElement } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import ErrorPage from './ErrorPage';
import NavBarMobile from '../navigation/NavBarMobile';
import Sidebar from '../navigation/Sidebar';
import { useUser } from '../../helpers/customHooks';

interface PrivateRouteProps {
  children: ReactElement;
  permissions: string[];
}

const renderPageWithNavBar = (
  navBar: JSX.Element | null,
  children: ReactElement<unknown, string | React.JSXElementConstructor<any>>,
  isSidebarOpen: boolean
) => {
  if (isValidElement(children)) {
    // Render the navbar, sidebar, and the children of the route
    return (
      <>
        {navBar}
        <Box component="main" display="flex" sx={{ flexGrow: 1 }}>
          <Sidebar isOpen={isSidebarOpen} />
          {cloneElement(children)}
        </Box>
      </>
    );
  } else {
    // If the children is not a valid React element, render the error page
    return <ErrorPage />;
  }
};

const PrivateRouteWrapper = ({ children, permissions }: PrivateRouteProps) => {
  const { user } = useUser();
  // TODO: Pass userObj as a prop to NavBar

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navBar = isMobile ? <NavBarMobile onToggleSidebar={handleToggleSidebar} /> : null;

  // check if Token exists in redux store
  const noTokenExists = user ? Object.keys(user).length === 0 : true;
  const noUser = permissions.includes('noUser');
  const isPublic = permissions.includes('public');
  const isRequireUser = permissions.includes('user');
  const access = isPublic;
  // TODO: When accessType is implemented, uncomment this
  //   const access = isPublic || permissions.some(
  //   (p: any) => userObj != null && Object.keys(userObj).length !== 0 && p === userObj.accessType
  // );

  // If the route does not require a user
  if (noUser) {
    // If there is no token in the redux store
    if (noTokenExists) {
      // Render the children of the route
      return (
        <Box component="main" sx={{ flexGrow: 1 }}>
          {cloneElement(children)}
        </Box>
      );
    } else {
      // If there is a token, navigate to the page
      return renderPageWithNavBar(navBar, children, isSidebarOpen);
    }
  }
  // If the route is accessible (public or matches user's access type)
  else if (access || isRequireUser) {
    // If there is no token in the redux store
    if (noTokenExists) {
      // Navigate to the login page
      return <Navigate to="/login" />;
    } else {
      return renderPageWithNavBar(navBar, children, isSidebarOpen);
    }
  } else {
    // If the route is not accessible, render the error page
    return <ErrorPage />;
  }
};

export default PrivateRouteWrapper;
