import { createTheme } from '@mui/material/styles';

const baseThemeOptions = {
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  typography: {
    fontFamily: `Proxima Soft`,
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Blue (Material UI default blue)
      light: '#63A4FF',
      dark: '#004BA0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00FFAA', // Neon Green (unchanged)
      light: '#5CFFCC',
      dark: '#00CC88',
      contrastText: '#000000',
    },
    background: {
      default: '#F8F8FF', // Mint White
      paper: 'none', // Soft Sky
    },
    text: {
      primary: '#1E1E2F', // Midnight
      secondary: '#1976D2', // Blue secondary text
    },
    divider: '#CCCCCC',
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976D2', // Blue
      light: '#63A4FF',
      dark: '#004BA0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00FFAA', // Neon Green (unchanged)
      light: '#5CFFCC',
      dark: '#00CC88',
      contrastText: '#000000',
    },
    background: {
      default: '#1E1E2F', // Midnight Blue
      paper: '#2A2A3C', // Slightly lighter than Midnight
    },
    text: {
      primary: '#F8F8FF', // Mint White
      secondary: '#63A4FF', // Lighter Blue
    },
    divider: '#3C3C3C',
  },
});
