import { Box, Container, useTheme } from '@mui/material';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PayInvoice } from './PayInvoice';
import style from './InvoiceTransferView.module.scss';
import { ConfirmInvoice } from './ConfirmInvoice';
import PaidInvoice from './PaidInvoice';

import { Invoice } from '../../models';
import { formatNumber } from '../../utils';
import { RootState } from '../../store/rootReducer';
import { TransferInvoiceStatus } from '../../store/transferInvoice/types';
import { ConfirmInvoiceStatus } from '../../store/confirmInvoice';
export interface InvoiceTransferViewProps {
  invoice: Invoice;
}

export const InvoiceTransferView: React.FC<InvoiceTransferViewProps> = ({
  invoice,
}) => {
  const theme = useTheme();

  const title = useMemo(() => {
    let title = formatNumber(invoice.amount) + '$ transfer request';
    if (invoice.ref) {
      title += ' for ' + invoice.ref;
    }
    return title;
  }, [invoice.amount, invoice.ref]);

  const transferingStatus = useSelector<RootState, TransferInvoiceStatus>(
    (state) => state.transferInvoice.status,
  );
  const confirmingStatus = useSelector<RootState, ConfirmInvoiceStatus>(
    (state) => state.confirmInvoice.status,
  );

  const showPayInvoice = useMemo(
    () =>
      !invoice.deposited || transferingStatus === TransferInvoiceStatus.SUCCESS,
    [invoice.deposited, transferingStatus],
  );

  const showConfirmInvoice = useMemo(() => {
    return (
      invoice.deposited &&
      !showPayInvoice &&
      (!invoice.paid || confirmingStatus === ConfirmInvoiceStatus.SUCCESS)
    );
  }, [invoice.deposited, confirmingStatus, invoice.paid, showPayInvoice]);

  const showPaidInvoice = useMemo(
    () => invoice.paid && !showConfirmInvoice,
    [invoice.paid, showConfirmInvoice],
  );

  return (
    <Box
      flex={1}
      bgcolor={theme.palette.grey[100]}
      className={style.InvoiceTransferView}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="sm">
        {showPayInvoice && <PayInvoice invoice={invoice} />}
        {showConfirmInvoice && <ConfirmInvoice invoice={invoice} />}
        {showPaidInvoice && <PaidInvoice invoice={invoice} />}
      </Container>
    </Box>
  );
};
