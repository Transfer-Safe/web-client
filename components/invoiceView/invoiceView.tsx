import { Button } from '@nextui-org/react';
import { Chain } from '@usedapp/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Invoice } from '../../models';
import { RootState } from '../../store/rootReducer';
import { formatAmount } from '../../utils';

export interface InvoiceViewProps {
  invoice: Invoice;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ invoice }) => {
  const chain = useSelector<RootState, Chain>(({ settings }) => settings.chain);
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
        <strong>Receipement name:</strong> {invoice.receipientName}
      </p>
    </div>
  );
};
