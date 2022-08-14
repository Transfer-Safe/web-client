import { Box, Container, Typography, useTheme } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

import style from './InvoiceTransferView.module.scss';

import { Invoice } from '../../models';
import { RootState } from '../../store/rootReducer';
import { TransferInvoiceStatus } from '../../store/transferInvoice/types';
import { formatNumber, formatTransactionId } from '../../utils';
import AppModal from '../AppModal';
import BuyCurrencyButton from '../BuyCurrencyButton';
import FormattedNumber from '../FormattedNumber';
import ThrobberSection from '../Throbber/ThrobberSection';
export interface InvoiceTransferViewProps {
  invoice: Invoice;
}

export const InvoiceTransferView: React.FC<InvoiceTransferViewProps> = ({
  invoice,
}) => {
  const theme = useTheme();
  const { isConnected } = useAccount();

  const title = useMemo(() => {
    let title = formatNumber(invoice.amount) + '$ transfer request';
    if (invoice.ref) {
      title += ' for' + invoice.ref;
    }
    return title;
  }, [invoice.amount, invoice.ref]);

  const transferInvoiceStatus = useSelector<RootState, TransferInvoiceStatus>(
    (state) => state.transferInvoice.status,
  );

  const isSigning = useMemo(
    () => transferInvoiceStatus === TransferInvoiceStatus.SIGNING,
    [transferInvoiceStatus],
  );

  const isTransferring = useMemo(() => {
    if (transferInvoiceStatus === TransferInvoiceStatus.TRANSFERRING) {
      return true;
    }
    if (transferInvoiceStatus === TransferInvoiceStatus.SUCCESS) {
      if (!invoice.deposited) {
        return true;
      }
    }
    return false;
  }, [transferInvoiceStatus, invoice.deposited]);

  return (
    <Box
      flex={1}
      bgcolor={theme.palette.grey[100]}
      className={style.InvoiceTransferView}
    >
      <AppModal
        title={`Transfering ${formatNumber(invoice.amount)}$`}
        open={isTransferring || isSigning}
      >
        {isSigning && (
          <ThrobberSection
            title="Waiting for you to sign the transaction"
            mt={2}
          />
        )}
        {isTransferring && (
          <ThrobberSection
            title="Transfering funds"
            mt={2}
            subtitle="Transaction 0x323...234"
          />
        )}
      </AppModal>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          textAlign="center"
          mt={8}
          sx={{
            wordBreak: 'break-word',
          }}
        >
          {invoice.deposited && <span>Deposited! </span>}
          <Typography
            component="span"
            variant="h1"
            color={theme.palette.primary.main}
          >
            <FormattedNumber value={invoice.amount} suffix="$" />
          </Typography>

          {invoice.ref && <span> for {invoice.ref}</span>}
        </Typography>

        <Link href="https://google.com" target="_blank">
          <Typography
            mt={2}
            textAlign="center"
            lineHeight="2rem"
            variant="subtitle1"
            fontSize="1.1rem"
          >
            Transfer request from{' '}
            {formatTransactionId(invoice.receipientAddress)}
          </Typography>
        </Link>
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          {!isConnected && <ConnectButton />}
          {isConnected && (
            <React.Fragment>
              {invoice.isNativeToken && (
                <BuyCurrencyButton
                  invoiceId={invoice.id}
                  variant="outlined"
                  isNativeCurrency
                  value={10}
                  size="large"
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'inherit',
                    },
                    marginTop: 2,
                  }}
                />
              )}
              {invoice.availableTokenTypes.map((token) => (
                <BuyCurrencyButton
                  invoiceId={invoice.id}
                  key={token}
                  variant="outlined"
                  tokenAddress={token}
                  value={10}
                  size="large"
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'inherit',
                    },
                    marginTop: 2,
                  }}
                />
              ))}
            </React.Fragment>
          )}
        </Box>
        <Typography
          color={theme.palette.grey[800]}
          my={4}
          textAlign="center"
          variant="body2"
        >
          We will hold your transfer until you confirm it by pressing the
          “Confirm” button. If you change your mind you can refund your deposit
          after{' '}
          <Box
            component="span"
            fontWeight="600"
            color={theme.palette.primary.main}
          >
            2 weeks
          </Box>
        </Typography>
      </Container>
    </Box>
  );
};
