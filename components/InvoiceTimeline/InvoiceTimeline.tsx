import { Box } from '@mui/material';
import { useMemo } from 'react';

import { InvoiceTimelineCard } from './InvoiceTimelineCard';

import { Invoice } from '../../models';

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
  return (
    <Box>
      <InvoiceTimelineCard
        timestamp={new Date()}
        title="Invoice created"
        completed
        nextCompleted
        isFirst
      />
      <InvoiceTimelineCard
        timestamp={new Date()}
        title="Invoice deposited"
        subtitle="Now waiting for confirmation"
        completed
        active
      />
      <InvoiceTimelineCard title="Invoice confirmed" isLast />
    </Box>
  );
};

export default InvoiceTimeline;
