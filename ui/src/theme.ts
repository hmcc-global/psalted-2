import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';
import '@fontsource/dm-sans';

const PRIMARY_MAIN = '#4B50B4';
const PRIMARY_LIGHT = '#C9CDFF';
// const PRIMARY_LIGHTER = '#DDE0FF';
const PRIMARY_LIGHTER = '#E6E0E9';
// const PRIMARY_LIGHTEST = '#EEEFFF';
const PRIMARY_LIGHTEST = '#EADDFF';
const PRIMARY_DARK = '#6750A4';
const PRIMARY_DARKER = '#1D192B';
const PRIMARY_DARKEST = '#141218';

const SECONDARY_MAIN = '#9E9E9E';
const SECONDARY_LIGHT = '#999999';
const SECONDARY_LIGHTER = '#FAFAFA';

declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main?: string;
    light?: string;
    lighter?: string;
    lightest?: string;
    dark?: string;
    darker?: string;
    darkest?: string;
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN,
      light: PRIMARY_LIGHT,
      lighter: PRIMARY_LIGHTER,
      lightest: PRIMARY_LIGHTEST,
      dark: PRIMARY_DARK,
      darker: PRIMARY_DARKER,
      darkest: PRIMARY_DARKEST,
    },
    secondary: {
      main: SECONDARY_MAIN,
      light: SECONDARY_LIGHT,
      lighter: SECONDARY_LIGHTER,
    },
    background: {
      default: '#171717',
    },
    text: {
      primary: '#fff',
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
      'Work Sans',
      'DM Sans',
    ].join(','),
    h1: {
      fontSize: '2rem', // Equivalent to 32px (16 * 2)
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem', // Equivalent to 24px (16 * 1.5)
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.25rem', // Equivalent to 20px (16 * 1.25)
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.125rem', // Equivalent to 18px (16 * 1.125)
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1rem', // Equivalent to 16px (16 * 1)
      fontWeight: 600,
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
    caption: {
      fontSize: '0.6875rem', // Equivalent to 11px (16 * 0.0.6875)
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem', // Equivalent to 14px (16 * 0.875)
      fontWeight: 400,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: '#fff',
          border: '1px solid {theme.palette.primary.main}',
        },
      },
    },
  },
});

export default customTheme;
