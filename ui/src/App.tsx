import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { routes as appRoutes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import customTheme from './theme';
import NavBarMobile from './components/navigation/NavBarMobile';
import CustomAppContainer from './components/custom/CustomAppContainer';
import './styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRouteWrapper from './components/custom/PrivateRouteWrapper';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
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
              <Box display="flex" component="main" sx={{ flexGrow: 1 }}>
                {navBar}
                <Routes>
                  {appRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={
                        <PrivateRouteWrapper permissions={route.permissions}>
                          <route.component />
                        </PrivateRouteWrapper>
                      }
                    />
                  ))}
                </Routes>
              </Box>
            </CustomAppContainer>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
