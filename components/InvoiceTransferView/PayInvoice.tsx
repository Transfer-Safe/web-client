import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InvoiceTransferButtons } from './InvoiceTransferButtons';

import { Invoice } from '../../models';
import { formatNumber, formatTransactionId } from '../../utils';
import FormattedNumber from '../FormattedNumber';
import AppModal from '../AppModal';
import ThrobberSection from '../Throbber/ThrobberSection';
import { resetTransferInvoice } from '../../store/transferInvoice/actions';
import { RootState } from '../../store/rootReducer';
import { TransferInvoiceStatus } from '../../store/transferInvoice/types';
import Button from '../Button';

interface PayInvoiceProps {
  invoice: Invoice;
}

export const PayInvoice: React.FC<PayInvoiceProps> = ({ invoice }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const showSuccesfullyTransferedModal = useMemo(() => {
    if (transferInvoiceStatus === TransferInvoiceStatus.SUCCESS) {
      if (invoice.deposited) {
        return true;
      }
    }
    return false;
  }, [transferInvoiceStatus, invoice.deposited]);

  const onCloseSuccessModal = useCallback(
    () => dispatch(resetTransferInvoice()),
    [dispatch],
  );

  return (
    <Box>
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
      <AppModal
        open={showSuccesfullyTransferedModal}
        title="Succesfully transfered"
        onClose={onCloseSuccessModal}
      >
        <Typography>
          You have succesfully transfered {formatNumber(invoice.amount)}$
        </Typography>
        <Button
          onClick={onCloseSuccessModal}
          variant="contained"
          sx={{
            width: { xs: '100%', md: 'auto' },
            marginTop: 4,
          }}
        >
          Awesome!
        </Button>
      </AppModal>
      <Typography
        variant="h1"
        mt={8}
        sx={{
          wordBreak: 'break-word',
        }}
      >
        <Typography
          component="span"
          variant="h1"
          color={theme.palette.primary.main}
        >
          <FormattedNumber value={invoice.amount} suffix="$" />
        </Typography>

        {invoice.ref ? (
          <span> for {invoice.ref}</span>
        ) : (
          <span> transfer request</span>
        )}
      </Typography>

      <Link href="https://google.com" target="_blank">
        <Typography
          mt={2}
          lineHeight="2rem"
          variant="subtitle1"
          fontSize="1.1rem"
        >
          Transfer request from {formatTransactionId(invoice.receipientAddress)}
        </Typography>
      </Link>
      <InvoiceTransferButtons invoice={invoice} />
    </Box>
  );
};
