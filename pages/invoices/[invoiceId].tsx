import { Chain, useEthers } from '@usedapp/core';
import { NextPage } from 'next';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import assert from 'assert';

import Button from '../../components/Button';
import InvoiceView from '../../components/invoiceView';
import { SignIn } from '../../components/signin';
import { useDepositInvoice } from '../../hooks';
import { useConfirmInvoice } from '../../hooks/useConfirmInvoice';
import { useGetInvoice } from '../../hooks/useGetInvoice';
import { useRefundInvoice } from '../../hooks/useRefundInvoice';
import { RootState } from '../../store/rootReducer';
import { formatAmount } from '../../utils';

export interface InvoicePageProps {
  invoiceId: string;
}

const InvoicePage: NextPage<InvoicePageProps> = ({ invoiceId }) => {
  const { invoice, error, loading } = useGetInvoice(invoiceId);
  const { account } = useEthers();
  const depositInvoice = useDepositInvoice();
  const confirmInvoice = useConfirmInvoice();
  const refundInvoice = useRefundInvoice();
  const chain = useSelector<RootState, Chain>(({ settings }) => settings.chain);

  const onRefund = useCallback(async () => {
    assert(invoice);
    await refundInvoice.send(invoice);
  }, [refundInvoice, invoice]);

  const onPay = useCallback(async () => {
    assert(invoice);
    await depositInvoice.send(invoice);
  }, [invoice, depositInvoice]);

  const onConfirm = useCallback(async () => {
    assert(invoice);
    await confirmInvoice.send(invoice);
  }, [invoice, confirmInvoice]);

  const amount = useMemo(
    () => invoice && formatAmount(invoice.amount, chain),
    [invoice, chain],
  );

  return (
    <div>
      <SignIn />
      {error && <p>Failed to fetch invoice</p>}
      {loading && <p>Loading...</p>}
      {invoice && (
        <div>
          <InvoiceView invoice={invoice} />
          {invoice.balance == 0 && (
            <Button loading={depositInvoice.loading} onClick={onPay}>
              Pay {amount}
            </Button>
          )}
          {invoice.balance > 0 && account == invoice.senderAddress && (
            <Button loading={confirmInvoice.loading} onClick={onConfirm}>
              Confirm
            </Button>
          )}

          {invoice.balance > 0 && account == invoice.receipientAddress && (
            <Button loading={refundInvoice.loading} onClick={onRefund}>
              Refund
            </Button>
          )}
          {invoice.paid && <div>Invoice paid</div>}
        </div>
      )}
    </div>
  );
};

InvoicePage.getInitialProps = async (ctx) => {
  return {
    invoiceId: ctx.query.invoiceId as string,
  };
};

export default InvoicePage;
