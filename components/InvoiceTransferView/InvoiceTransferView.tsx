import { Box, Container, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { PayInvoice } from './PayInvoice';
import style from './InvoiceTransferView.module.scss';
import { ConfirmInvoice } from './ConfirmInvoice';
import PaidInvoice from './PaidInvoice';

import { Invoice } from '../../models';
import { RootState } from '../../store/rootReducer';
import { TransferInvoiceStatus } from '../../store/transferInvoice/types';
import { ConfirmInvoiceStatus } from '../../store/confirmInvoice';
import InvoiceHeadTags from '../InvoiceHeadTags';
export interface InvoiceTransferViewProps {
  invoice: Invoice;
}

export const InvoiceTransferView: React.FC<InvoiceTransferViewProps> = ({
  invoice,
}) => {
  const theme = useTheme();

  const transferingStatus = useSelector<RootState, TransferInvoiceStatus>(
    (state) => state.transferInvoice.status,
  );
  const confirmingStatus = useSelector<RootState, ConfirmInvoiceStatus>(
    (state) => state.confirmInvoice.status,
  );

  const showPayInvoice = useMemo(() => {
    const showPayInvoice =
      !invoice.deposited ||
      (invoice.deposited && transferingStatus !== TransferInvoiceStatus.IDLE);

    return showPayInvoice;
  }, [invoice.deposited, transferingStatus]);

  const showConfirmInvoice = useMemo(() => {
    return (
      invoice.deposited &&
      !showPayInvoice &&
      (!invoice.paid ||
        (invoice.paid && confirmingStatus !== ConfirmInvoiceStatus.IDLE))
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
      <InvoiceHeadTags invoice={invoice} />
      <Container maxWidth="sm">
        {showPayInvoice && <PayInvoice invoice={invoice} />}
        {showConfirmInvoice && <ConfirmInvoice invoice={invoice} />}
        {showPaidInvoice && <PaidInvoice invoice={invoice} />}
      </Container>
    </Box>
  );
};
