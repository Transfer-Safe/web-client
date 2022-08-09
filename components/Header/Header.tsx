import { AppBar } from '@mui/material';
import { Container } from '@mui/system';

import styles from './Header.module.scss';

import Logo from '../Logo';

const Header: React.FC = () => {
  return (
    <AppBar
      color="transparent"
      className={styles.Header}
      position="static"
      sx={{
        paddingY: (theme) => ({
          xs: theme.spacing(3),
          md: theme.spacing(6),
        }),
      }}
    >
      <Container maxWidth="xl">
        <Logo />
      </Container>
    </AppBar>
  );
};

export default Header;
