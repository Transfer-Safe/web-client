import { Box, Container, TextField, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';

import InvoiceTimeline from '../InvoiceTimeline';
import { useCurrencyByAddress } from '../../hooks';
import { Invoice } from '../../models';
import { formatNumber } from '../../utils';
import Button from '../Button';
import { CurrencyLabelList } from '../CurrencyLabel';

export interface InvoiceViewProps {
  invoice: Invoice;
  encodedEmail?: string;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
  invoice,
  encodedEmail,
}) => {
  const [link, setLink] = useState('');
  const [sharingAvailable, setSharingAvailable] = useState(false);

  const formattedAmount = useMemo(
    () => formatNumber(invoice.amount),
    [invoice.amount],
  );

  const title = useMemo(() => {
    if (invoice.ref) {
      return `for ${invoice.ref}`;
    }
    return 'transfer request';
  }, [invoice.ref]);

  const getCurrency = useCurrencyByAddress();

  const theme = useTheme();

  useEffect(() => {
    setLink(window.location.href.replace('/invoices/', '/transfer/'));
  }, []);

  useEffect(() => {
    if (navigator.canShare && navigator.canShare({ url: link })) {
      setSharingAvailable(true);
    } else {
      setSharingAvailable(false);
    }
  }, [link]);

  const onCopyLink = useCallback(() => {
    if (sharingAvailable) {
      navigator.share({ url: link });
    } else {
      navigator.clipboard.writeText(link);
    }
  }, [link, sharingAvailable]);

  return (
    <Box
      bgcolor={theme.palette.grey[100]}
      flex="1"
      display="flex"
      flexDirection="column"
    >
      <Head>
        <title>{`${formattedAmount}$ ${title}`}</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Box
          display="flex"
          flex="1"
          py={8}
          alignItems="stretch"
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Box
            flex="1"
            pr={{
              xs: 0,
              md: 4,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h1">
              <Typography
                variant="h1"
                component="span"
                color={theme.palette.primary.main}
              >
                {formattedAmount}$
              </Typography>{' '}
              {title}
            </Typography>
            <Box
              mt={6}
              display="flex"
              flexDirection={{
                xs: 'column-reverse',
                md: 'row',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  marginRight: {
                    xs: 0,
                    md: 2,
                  },
                  marginTop: {
                    xs: 1,
                    md: 0,
                  },
                }}
                onClick={onCopyLink}
                shortcut="enter"
                size="large"
              >
                {sharingAvailable ? 'Share' : 'Copy link'}
              </Button>
              <TextField sx={{ flex: 1 }} value={link} variant="outlined" />
            </Box>
            <Typography mt={1} variant="body2">
              Share this link to receive the transfer
            </Typography>
          </Box>
          <Box bgcolor={theme.palette.grey[400]} width="1px" />
          <Box
            flex="1"
            pl={{
              md: 4,
            }}
            mt={{
              xs: 4,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h2">Invoice status</Typography>
            <Box
              mt={{
                xs: 0,
                md: 2,
              }}
            >
              <InvoiceTimeline invoice={invoice} />
            </Box>
            <Typography color={theme.palette.grey[800]} mt={2}>
              {encodedEmail && (
                <span>
                  You&apos;ll receive notifications regarding this request to{' '}
                  {encodedEmail}.{' '}
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
