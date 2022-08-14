import { Invoice } from '../../models';

interface InvoiceTimelineProps {
  invoice: Invoice;
}

const InvoiceTimeline: React.FC<InvoiceTimelineProps> = () => {
  return (
    // TODO: needs some design
    <ul>
      <li>Invoice created</li>
      <li>Transfer received</li>
      <li>Transfer confirmed and sent to your wallet</li>
    </ul>
  );
};

export default InvoiceTimeline;
