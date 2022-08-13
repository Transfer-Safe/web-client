import { Box } from '@mui/material';
import { NextPage } from 'next';
import React, { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';

import assert from 'assert';

import style from './InvoicePage.module.scss';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import InvoiceView from '../../../components/InvoiceView';
import { useCurrentChain, useDepositInvoice } from '../../../hooks';
import { useGetInvoice } from '../../../hooks';
import { formatAmount } from '../../../utils';

export interface InvoicePageProps {
  invoiceId: string;
}

const InvoicePage: NextPage<InvoicePageProps> = ({ invoiceId }) => {
  const { data: invoice, error, isLoading } = useGetInvoice(invoiceId);
  const { address } = useAccount();
  const depositInvoice = useDepositInvoice(invoiceId);
  // const confirmInvoice = useConfirmInvoice(invoiceId);
  // const refundInvoice = useRefundInvoice(invoiceId);
  const chain = useCurrentChain();

  // const onRefund = useCallback(async () => {
  //   assert(invoice);
  //   await refundInvoice.writeAsync?.();
  // }, [refundInvoice, invoice]);

  const onPay = useCallback(async () => {
    assert(invoice);
    await depositInvoice.writeAsync?.();
  }, [invoice, depositInvoice]);

  // const onConfirm = useCallback(async () => {
  //   assert(invoice);
  //   await confirmInvoice.writeAsync?.();
  // }, [invoice, confirmInvoice]);

  const amount = useMemo(
    () => invoice && formatAmount(invoice.amount, chain),
    [invoice, chain],
  );

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      className={style.InvoicePage}
    >
      <Header />
      {invoice && <InvoiceView invoice={invoice} />}
      <Footer />
    </Box>
  );
};

InvoicePage.getInitialProps = async (ctx) => {
  return {
    invoiceId: ctx.query.invoiceId as string,
  };
};

export default InvoicePage;
