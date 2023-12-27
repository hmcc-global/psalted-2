import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, cloneElement, isValidElement, ReactElement } from 'react';
import { useMediaQuery, Box } from '@mui/material';
import axios from 'axios';
import { updateAxiosClient } from './customAxios';

import ErrorPage from './ErrorPage';
import NavBar from '../navigation/NavBar';
import NavBarMobile from '../navigation/NavBarMobile';
import Sidebar from '../navigation/Sidebar';

interface PrivateRouteProps {
  children: ReactElement;
  permissions: string[];
}

const PrivateRouteWrapper = ({ children, permissions }: PrivateRouteProps) => {
  const user = useSelector((state: any) => state.user);
  // TODO: Pass userObj as a prop to NavBar
  const [userObj, setUserObj] = useState(null);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navBar = isMobile ? <NavBarMobile onToggleSidebar={handleToggleSidebar} /> : <NavBar />;

  const checkIfTokenExists = async (toVerify: any) => {
    try {
      const { data } = await axios.post('/api/auth/verify-token', {
        token: toVerify,
      });
      updateAxiosClient(toVerify);
      return data;
    } catch (err: any) {
      if (err.response.data.raw === 'token-expired') {
        localStorage.clear();
        window.location.reload();
      }
      return {};
    }
  };

  useEffect(() => {
    // useEffects are meant to be synchronous, this helps to remove the warning
    async function fetch() {
      let obj = await checkIfTokenExists(user);
      setUserObj(obj);
    }

    fetch();
  }, [user]);

  // check if Token exists in redux store
  const noTokenExists = Object.keys(user).length === 0;
  const noUser = permissions.includes('noUser');
  const isPublic = permissions.includes('public');
  const access = isPublic;
  // TODO: When accessType is implemented, uncomment this
  //   const access = isPublic || permissions.some(
  //   (p: any) => userObj != null && Object.keys(userObj).length !== 0 && p === userObj.accessType
  // );

  const renderPageWithNavBar = (
    navBar: JSX.Element,
    children: ReactElement<unknown, string | React.JSXElementConstructor<any>>,
    isSidebarOpen: boolean
  ) => {
    if (isValidElement(children)) {
      // Render the navbar, sidebar, and the children of the route
      return (
        <>
          {navBar}
          <Box display="flex" flexDirection="row" height="100vh" paddingY="5em">
            <Sidebar isOpen={isSidebarOpen} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {cloneElement(children)}
            </Box>
          </Box>
        </>
      );
    } else {
      // If the children is not a valid React element, render the error page
      return <ErrorPage />;
    }
  };

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
      renderPageWithNavBar(navBar, children, isSidebarOpen);
    }
  }
  // If the route is accessible (public or matches user's access type)
  else if (access) {
    // If there is no token in the redux store
    if (noTokenExists) {
      // Navigate to the login page
      return <Navigate to="/login" />;
    } else {
      renderPageWithNavBar(navBar, children, isSidebarOpen);
    }
  } else {
    // If the route is not accessible, render the error page
    return <ErrorPage />;
  }
};

export default PrivateRouteWrapper;
