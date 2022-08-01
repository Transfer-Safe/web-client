import { createTheme, ThemeOptions } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5F37D0',
    },
    disabled: {
      main: '#9B9B9B',
    },
  },
  typography: {
    fontSize: 17,
    h1: {
      fontSize: '3rem',
      fontWeight: '500',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'normal',
    },
  },
} as ThemeOptions & {
  typography: {
    h1: TypographyStyleOptions;
  };
});
