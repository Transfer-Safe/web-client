import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import type { NextPage } from 'next';

import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          my: 3,
        }}
      >
        <Typography variant="h1" fontWeight="600">
          Hello Next.js
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
