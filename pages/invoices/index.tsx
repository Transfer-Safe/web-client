import { Box, Container, NoSsr, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NextPage } from 'next';
import { useAccount } from 'wagmi';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import InvoicesList from '../../components/InvoicesList';

const InvoicesPage: NextPage = () => {
  const account = useAccount();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex={1}>
        <Container maxWidth="sm">
          <Typography variant="h1">My invoices</Typography>
          <NoSsr>{account.isConnected && <InvoicesList />}</NoSsr>
          {!account.isConnected && (
            <Box
              p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <ConnectButton />
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default InvoicesPage;
