import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { routes as appRoutes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import customTheme from './theme';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Box height="100vh" display="flex" flexDirection="column">
            <BrowserRouter>
              <Routes>
                {appRoutes.map((route) => (
                  <Route key={route.key} path={route.path} element={<route.component />} />
                ))}
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
