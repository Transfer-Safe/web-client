import { Box } from '@mui/material';
import { useMemo } from 'react';

import { InvoiceTimelineCard } from './InvoiceTimelineCard';

import { Invoice } from '../../models';
import { formatNumber } from '../../utils';
import { useCurrentChain } from '../../hooks';

enum InvoiceStatus {
  Created = 'created',
  Deposited = 'deposited',
  Refunded = 'refunded',
  Paid = 'paid',
}

interface InvoiceTimelineProps {
  invoice: Invoice;
}

const InvoiceTimeline: React.FC<InvoiceTimelineProps> = ({ invoice }) => {
  const invoiceStatus: InvoiceStatus = useMemo(() => {
    if (invoice.paid) {
      return InvoiceStatus.Paid;
    }
    if (invoice.refunded) {
      return InvoiceStatus.Refunded;
    }
    if (invoice.deposited) {
      return InvoiceStatus.Deposited;
    }
    return InvoiceStatus.Created;
  }, [invoice]);

  const currentChain = useCurrentChain();

  const formattedPaidAmount = useMemo(
    () =>
      formatNumber(invoice.paidAmount) +
        ' ' +
        currentChain.nativeCurrency?.name || 'MATIC',
    [invoice, currentChain],
  );

  const formattedDepositedAmount = useMemo(
    () =>
      formatNumber(invoice.balance) + ' ' + currentChain.nativeCurrency?.name ||
      'MATIC',
    [invoice, currentChain],
  );

  return (
    <Box>
      <InvoiceTimelineCard
        timestamp={invoice.createdDate}
        title="Invoice created"
        completed
        nextCompleted={invoice.deposited || invoice.paid}
        isFirst
        active={invoiceStatus === InvoiceStatus.Created}
      />
      {!invoice.instant && (
        <InvoiceTimelineCard
          timestamp={invoice.depositDate}
          title="Invoice deposited"
          subtitle={
            invoiceStatus === InvoiceStatus.Deposited
              ? `We received ${formattedDepositedAmount}. Now waiting for confirmation`
              : undefined
          }
          completed={invoice.deposited}
          active={invoiceStatus === InvoiceStatus.Deposited}
          nextCompleted={invoice.paid || invoice.refunded}
        />
      )}
      {!invoice.refunded && (
        <InvoiceTimelineCard
          title="Transfer completed"
          subtitle={
            invoiceStatus === InvoiceStatus.Paid
              ? `Sender confirmed the transfer, ${formattedPaidAmount} are in your wallet`
              : undefined
          }
          completed={invoice.paid}
          active={invoiceStatus === InvoiceStatus.Paid}
          isLast
          timestamp={invoice.confirmDate}
        />
      )}
      {invoice.refunded && (
        <InvoiceTimelineCard
          title="Invoice refunded"
          completed
          isLast
          active
          timestamp={invoice.refundDate}
        />
      )}
    </Box>
  );
};

export default InvoiceTimeline;
