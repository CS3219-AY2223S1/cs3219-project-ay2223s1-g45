import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#FFFFFF',
      dark: '#000000'
    },
    secondary: {
      main: '#FFFFFF',
      light: '#EF429A',
      dark: '#AC44B0'
    }
  },
  typography: {
    fontFamily: 'Arimo, Arial'
  }
});
