import { NextPage } from 'next';
import React, { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';

import assert from 'assert';

import Button from '../../components/Button';
import InvoiceView from '../../components/invoiceView';
import { useCurrentChain, useDepositInvoice } from '../../hooks';
import { useConfirmInvoice } from '../../hooks/useConfirmInvoice';
import { useGetInvoice } from '../../hooks/useGetInvoice';
import { useRefundInvoice } from '../../hooks/useRefundInvoice';
import { formatAmount } from '../../utils';

export interface InvoicePageProps {
  invoiceId: string;
}

const InvoicePage: NextPage<InvoicePageProps> = ({ invoiceId }) => {
  const { data: invoice, error, isLoading } = useGetInvoice(invoiceId);
  const { address } = useAccount();
  const depositInvoice = useDepositInvoice(invoiceId);
  const confirmInvoice = useConfirmInvoice(invoiceId);
  const refundInvoice = useRefundInvoice(invoiceId);
  const chain = useCurrentChain();

  const onRefund = useCallback(async () => {
    assert(invoice);
    await refundInvoice.writeAsync?.();
  }, [refundInvoice, invoice]);

  const onPay = useCallback(async () => {
    assert(invoice);
    await depositInvoice.writeAsync?.();
  }, [invoice, depositInvoice]);

  const onConfirm = useCallback(async () => {
    assert(invoice);
    await confirmInvoice.writeAsync?.();
  }, [invoice, confirmInvoice]);

  const amount = useMemo(
    () => invoice && formatAmount(invoice.amount, chain),
    [invoice, chain],
  );

  return (
    <div>
      {error && <p>Failed to fetch invoice</p>}
      {isLoading && <p>Loading...</p>}
      {invoice && (
        <div>
          <InvoiceView invoice={invoice} />
          {invoice.balance === 0 && !invoice.paid && (
            <Button loading={depositInvoice.isLoading} onClick={onPay}>
              Pay {amount}
            </Button>
          )}
          {invoice.balance > 0 && address == invoice.senderAddress && (
            <Button loading={confirmInvoice.isLoading} onClick={onConfirm}>
              Confirm
            </Button>
          )}

          {invoice.balance > 0 && address == invoice.receipientAddress && (
            <Button loading={refundInvoice.isLoading} onClick={onRefund}>
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
