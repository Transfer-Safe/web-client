import { Box } from '@mui/material';
import { NextPage } from 'next';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import InvoicesList from '../../components/InvoicesList';

const InvoicesPage: NextPage = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex={1}>
        <InvoicesList />
      </Box>
      <Footer />
    </Box>
  );
};

export default InvoicesPage;
