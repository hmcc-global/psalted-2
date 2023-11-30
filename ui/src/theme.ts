import { createTheme } from '@mui/material/styles';

const PRIMARY_MAIN = '#4B50B4';
const PRIMARY_LIGHT = '#C9CDFF';
const PRIMARY_LIGHTER = '#DDE0FF';
const PRIMARY_LIGHTEST = '#EEEFFF';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main?: string;
    light?: string;
    lighter?: string;
    lightest?: string;
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
      light: PRIMARY_LIGHT,
      lighter: PRIMARY_LIGHTER,
      lightest: PRIMARY_LIGHTEST,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      'Roboto',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem', // Equivalent to 32px (16 * 2)
      fontWeight: 400,
    },
    h2: {
      fontSize: '1.5rem', // Equivalent to 24px (16 * 1.5)
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.25rem', // Equivalent to 20px (16 * 1.25)
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem', // Equivalent to 16px (16 * 1)
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem', // Equivalent to 14px (16 * 0.875)
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem', // Equivalent to 16px (16 * 1)
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem', // Equivalent to 14px (16 * 0.875)
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem', // Equivalent to 14px (16 * 0.875)
      fontWeight: 500,
    },
    overline: {
      fontSize: '0.625rem', // Equivalent to 10px (16 * 0.625)
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem', // Equivalent to 12px (16 * 0.75)
      fontWeight: 400,
    },
  },
});

export default customTheme;
