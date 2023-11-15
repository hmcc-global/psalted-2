import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { routes as appRoutes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#717CFF',
        main: '#717CFF',
        dark: '#717CFF',
        contrastText: '#000',
      },
      secondary: {
        main: '#717CFF',
        light: '#717CFF',
        dark: '#717CFF',
        contrastText: '#000',
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
    </Provider>
  );
}

export default App;
