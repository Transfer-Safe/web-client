import { Box, Container, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InvoiceTransferButtons } from './InvoiceTransferButtons';
import style from './InvoiceTransferView.module.scss';

import { Invoice } from '../../models';
import { RootState } from '../../store/rootReducer';
import { resetTransferInvoice } from '../../store/transferInvoice/actions';
import { TransferInvoiceStatus } from '../../store/transferInvoice/types';
import { formatNumber, formatTransactionId } from '../../utils';
import AppModal from '../AppModal';
import FormattedNumber from '../FormattedNumber';
import ThrobberSection from '../Throbber/ThrobberSection';
export interface InvoiceTransferViewProps {
  invoice: Invoice;
}

export const InvoiceTransferView: React.FC<InvoiceTransferViewProps> = ({
  invoice,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  const showSuccesfullyTransferedModal = useMemo(() => {
    if (transferInvoiceStatus === TransferInvoiceStatus.SUCCESS) {
      if (invoice.deposited) {
        return true;
      }
    }
    return false;
  }, [transferInvoiceStatus, invoice.deposited]);

  useEffect(() => {
    console.log('===> invoice.deposited', invoice.deposited);
  }, [invoice.deposited]);

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
      <AppModal
        open={showSuccesfullyTransferedModal}
        title="Succesfully transfered"
        onClose={() => dispatch(resetTransferInvoice())}
      >
        <Typography>
          You have succesfully transfered {formatNumber(invoice.amount)}$
        </Typography>
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
        {!invoice.deposited && <InvoiceTransferButtons invoice={invoice} />}
      </Container>
    </Box>
  );
};
