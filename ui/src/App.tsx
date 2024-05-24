import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { routes as appRoutes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import customTheme from './theme';
import NavBarMobile from './components/navigation/NavBarMobile';
import Sidebar from './components/navigation/Sidebar';
import SearchBar from './components/navigation/SearchBar';
import './styles.css';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navBar = isMobile ? <NavBarMobile onToggleSidebar={handleToggleSidebar} /> : <SearchBar />;

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Box display="flex" flexDirection="row" height="100vh">
            <Sidebar isOpen={isSidebarOpen} />

            <Box component="main" sx={{ flexGrow: 1 }}>
              {navBar}

              <Routes>
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
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
