import { Box, Container, TextField, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import { useMemo } from 'react';

import InvoiceTimeline from './InvoiceTimeline';

import { useCurrencyByAddress } from '../../hooks';
import { Invoice } from '../../models';
import { formatNumber } from '../../utils';
import Button from '../Button';
import { CurrencyLabelList } from '../CurrencyLabel';

export interface InvoiceViewProps {
  invoice: Invoice;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice }) => {
  const formattedAmount = useMemo(
    () => formatNumber(invoice.amount),
    [invoice.amount],
  );

  const title = useMemo(() => {
    if (invoice.ref) {
      return `${formattedAmount}$ transfer request for ${invoice.ref}`;
    }
    return `${formattedAmount} transfer request`;
  }, [invoice.ref, formattedAmount]);

  const getCurrency = useCurrencyByAddress();

  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.grey[100]}
      flex="1"
      display="flex"
      flexDirection="column"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box display="flex" flex="1" py={8} alignItems="stretch">
          <Box
            flex="1"
            pr={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h1">{title}</Typography>
            <Box mt={6} display="flex">
              <Button variant="contained" sx={{ marginRight: 2 }}>
                Copy link
              </Button>
              <TextField
                sx={{ flex: 1 }}
                value={window.location.href}
                variant="outlined"
              />
            </Box>
            <Typography mt={2}>
              Share this link to receive the transfer
            </Typography>
          </Box>
          <Box bgcolor={theme.palette.grey[400]} width="1px" />
          <Box
            flex="1"
            pl={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h2" color={theme.palette.primary.main}>
              Transfer request created!
            </Typography>
            <Typography color={theme.palette.grey[800]} mt={2}>
              {invoice.receipientEmail && (
                <span>
                  You&apos;ll receive notifications regarding this request to{' '}
                  {invoice.receipientEmail}.{' '}
                </span>
              )}
              Invoice will be paid in{' '}
              <CurrencyLabelList
                light
                isNative={invoice.isNativeToken}
                currencies={invoice.availableTokenTypes
                  .map(getCurrency)
                  .map(({ code }) => code)}
              />
              .
            </Typography>
            <Box>
              <InvoiceTimeline invoice={invoice} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
