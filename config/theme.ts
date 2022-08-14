import { createTheme, ThemeOptions } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5F37D0',
      light: '#F9F8FF',
    },
    disabled: {
      main: '#9B9B9B',
    },
  },
  typography: {
    fontSize: 17,
    fontFamily: 'GeneralSans-Variable',
    fontWeightBold: 'GeneralSans-Bold',
    fontWeightRegular: 'GeneralSans-Regular',
    fontWeightLight: 'GeneralSans-Light',
    fontWeightMedium: 'GeneralSans-Medium',
    body2: {
      fontSize: '0.9rem',
    },
    h1: {
      fontSize: '3rem',
      fontWeight: '600',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: '600',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'normal',
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: '400',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: '400',
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {},
        paper: {
          borderStyle: 'solid',
          borderWidth: 0.5,
          borderColor: '#CACDD5',
          borderRadius: 12,
        },
      },
    },
  },
} as ThemeOptions & {
  typography: {
    h1: TypographyStyleOptions;
  };
});
