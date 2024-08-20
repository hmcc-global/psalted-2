import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { routes as appRoutes, userRoutes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import customTheme from './theme';
import NavBarMobile from './components/navigation/NavBarMobile';
import Sidebar from './components/navigation/Sidebar';
import SearchBar from './components/navigation/SearchBar';
import CustomAppContainer from './components/custom/CustomAppContainer';
import './styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isUserView = window.location.pathname.includes('view');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navBar = isMobile ? <NavBarMobile onToggleSidebar={handleToggleSidebar} /> : null;

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
          <BrowserRouter>
            <CustomAppContainer>
              <>
                {isUserView ? null : <Sidebar isOpen={isSidebarOpen} />}

                <Box display={isUserView ? 'none' : 'flex'} component="main" sx={{ flexGrow: 1 }}>
                  {navBar}

                  <Routes>
                    {userRoutes.map((route) => (
                      <Route key={route.key} path={route.path} element={<route.component />} />
                    ))}
                    {appRoutes.map((route) => (
                      // TODO: Uncomment this when PrivateRouteWrapper is implemented and delete the navbar here
                      // <Route
                      //   key={route.key}
                      //   path={route.path}
                      //   element={
                      //     <PrivateRouteWrapper permissions={route.permissions}>
                      //       <route.component />
                      //     </PrivateRouteWrapper>
                      //   }
                      // />
                      <Route key={route.key} path={route.path} element={<route.component />} />
                    ))}
                  </Routes>
                </Box>
              </>
            </CustomAppContainer>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
