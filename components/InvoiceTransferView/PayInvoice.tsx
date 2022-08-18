import { Box, Link, Typography, useTheme } from '@mui/material';
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
import InvoiceStatusLabel from '../InvoiceStatusLabel';
import {
  useLinkToAddress,
  useLinkToTransaction,
} from '../../hooks/useLinkToTransaction';

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

  const txId = useSelector<RootState, string | undefined>(
    (state) => state.transferInvoice.txId,
  );
  const linkToExplorer = useLinkToTransaction(txId);
  const linkToReceiverAddress = useLinkToAddress(invoice.receipientAddress);

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
          <React.Fragment>
            <ThrobberSection
              title="Transfering funds"
              mt={2}
              subtitle="Transaction 0x323...234"
            />
            {linkToExplorer && (
              <Button
                href={linkToExplorer}
                target="_blank"
                variant="outlined"
                size="small"
                sx={{
                  mt: 2,
                  width: '100%',
                }}
              >
                View in Explorer
              </Button>
            )}
          </React.Fragment>
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
        <Box
          display="flex"
          mt={4}
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Button
            onClick={onCloseSuccessModal}
            variant="contained"
            sx={{
              width: { xs: '100%', md: 'auto' },
              marginTop: { xs: 4, md: 0 },
            }}
          >
            Awesome
          </Button>
          {linkToExplorer && (
            <Button
              href={linkToExplorer}
              target="_blank"
              variant="outlined"
              sx={{
                mt: { xs: 1, md: 0 },
                width: { xs: '100%', md: 'auto' },
                ml: { xs: 0, md: 2 },
              }}
            >
              View in Explorer
            </Button>
          )}
        </Box>
      </AppModal>
      <InvoiceStatusLabel mt={4} invoice={invoice} />
      <Typography
        variant="h1"
        mt={2}
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

      {linkToReceiverAddress && (
        <Typography
          mt={2}
          lineHeight="2rem"
          variant="subtitle1"
          fontSize="1.1rem"
        >
          Transfer request from{' '}
          <Link href={linkToReceiverAddress} target="_blank">
            {formatTransactionId(invoice.receipientAddress)}
          </Link>
        </Typography>
      )}

      <InvoiceTransferButtons invoice={invoice} />
    </Box>
  );
};
