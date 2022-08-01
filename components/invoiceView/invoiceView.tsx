import { useMemo } from 'react';

import { useCurrentChain } from '../../hooks';
import { Invoice } from '../../models';
import { formatAmount } from '../../utils';

export interface InvoiceViewProps {
  invoice: Invoice;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice }) => {
  const chain = useCurrentChain();
  const amount = useMemo(
    () => formatAmount(invoice.amount, chain),
    [invoice.amount, chain],
  );

  return (
    <div>
      <p>
        <strong>Name:</strong> {invoice.ref}
      </p>
      <p>
        <strong>Amount:</strong> {amount}
      </p>
      <p>
        <strong>Balance:</strong> {formatAmount(invoice.balance, chain)}
      </p>
      <p>
        <strong>Fee:</strong> {formatAmount(invoice.fee, chain)}
      </p>
      <p>
        <strong>Recipient name:</strong> {invoice.receipientName}
      </p>
    </div>
  );
};
