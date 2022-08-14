import { Box, Container, Typography } from '@mui/material';

import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Box
      minHeight={100}
      className={style.Footer}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        paddingY: (theme) => ({
          xs: theme.spacing(2),
          md: theme.spacing(4),
        }),
      }}
    >
      <Container maxWidth="xl">
        <Typography>TransferSafe</Typography>
        <Typography variant="body2">
          Copyright © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
