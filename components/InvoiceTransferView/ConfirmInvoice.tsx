import { Box, Typography, useTheme } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmButton from './ConfirmButton';
import RefundButton from './RefundButton';

import { Invoice } from '../../models';
import { formatNumber, formatTransactionId } from '../../utils';
import InvoiceStatusLabel from '../InvoiceStatusLabel';
import { RootState } from '../../store/rootReducer';
import {
  ConfirmInvoiceStatus,
  resetConfirmInvoice,
} from '../../store/confirmInvoice';
import AppModal from '../AppModal';
import ThrobberSection from '../Throbber/ThrobberSection';
import Button from '../Button';
import { useLinkToTransaction } from '../../hooks/useLinkToTransaction';

interface ConfirmInvoiceProps {
  invoice: Invoice;
}

export const ConfirmInvoice: React.FC<ConfirmInvoiceProps> = ({ invoice }) => {
  const theme = useTheme();
  const account = useAccount();
  const dispatch = useDispatch();

  const isOwner = useMemo(
    () => account.address === invoice.senderAddress,
    [account.address, invoice.senderAddress],
  );

  const confirmStatus = useSelector<RootState, ConfirmInvoiceStatus>(
    (state) => state.confirmInvoice.status,
  );

  const showLoadingModal = useMemo(
    () =>
      confirmStatus === ConfirmInvoiceStatus.CONFIRMING ||
      confirmStatus === ConfirmInvoiceStatus.SIGNING ||
      (confirmStatus === ConfirmInvoiceStatus.SUCCESS && !invoice.paid),
    [confirmStatus, invoice.paid],
  );

  const showSuccessmodal = useMemo(
    () => confirmStatus === ConfirmInvoiceStatus.SUCCESS && invoice.paid,
    [confirmStatus, invoice.paid],
  );

  const txId = useSelector<RootState, string | undefined>(
    (state) => state.confirmInvoice.txid,
  );

  const linkToTransaction = useLinkToTransaction(txId);

  const onCloseSuccess = useCallback(() => {
    dispatch(resetConfirmInvoice());
  }, [dispatch]);

  return (
    <Box pb={4}>
      <AppModal open={showLoadingModal} title="Confirming invoice">
        {confirmStatus === ConfirmInvoiceStatus.SIGNING ? (
          <ThrobberSection
            title="Waiting for you to sign the transaction"
            mt={2}
          />
        ) : (
          <ThrobberSection
            title="Confirming invoice"
            mt={2}
            subtitle={txId && `Transaction ${formatTransactionId(txId)}`}
          />
        )}
      </AppModal>
      <AppModal
        open={showSuccessmodal}
        title="Invoice confirmed"
        onClose={onCloseSuccess}
      >
        <Typography>
          You succesfully confirmed invoice. {formatNumber(invoice.amount)}$ has
          been transferred to {formatTransactionId(invoice.receipientAddress)}.
        </Typography>
        <Box
          mt={4}
          display="flex"
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: { xs: '100%', md: 'auto' },
              marginTop: { xs: 4, md: 0 },
            }}
            onClick={onCloseSuccess}
          >
            Sweet!
          </Button>
          {linkToTransaction && (
            <Button
              href={linkToTransaction}
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
      <Typography variant="h1" mt={2}>
        <Box color={theme.palette.primary.main} component="span">
          {formatNumber(invoice.amount)}${' '}
        </Box>
        {invoice.ref ? (
          <span> for {invoice.ref}</span>
        ) : (
          <span> transfer request</span>
        )}
      </Typography>
      <Typography variant="subtitle2" mt={1}>
        Transfer request from {formatTransactionId(invoice.receipientAddress)}
      </Typography>
      <Box mt={4}>
        {isOwner && (
          <React.Fragment>
            {' '}
            <ConfirmButton
              variant="contained"
              size="large"
              sx={{
                width: '100%',
              }}
              invoice={invoice}
            />
            <RefundButton
              invoice={invoice}
              variant="outlined"
              size="large"
              sx={{ mt: 2, width: '100%' }}
            />
          </React.Fragment>
        )}
        {!account.isConnected && <ConnectButton />}
      </Box>
      <Typography mt={2}>
        This invoice was deposited {isOwner && <span>by you</span>} on{' '}
        {invoice.depositDate?.toLocaleDateString()} at{' '}
        {invoice.depositDate?.toLocaleTimeString()}. Just confirm it when you
        are ready, so the receipient can withdraw the funds.
      </Typography>
      <Typography mt={2}>
        If you changed your mind you can claim a refund in 2 weeks.
      </Typography>
    </Box>
  );
};
