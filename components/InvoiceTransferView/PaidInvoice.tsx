import { Box, Typography, useTheme } from '@mui/material';

import { Invoice } from '../../models';
import { formatNumber, formatTransactionId } from '../../utils';
import Animation from '../Animation';
import InvoiceStatusLabel from '../InvoiceStatusLabel';

interface PaidInvoiceProps {
  invoice: Invoice;
}

const PaidInvoice: React.FC<PaidInvoiceProps> = ({ invoice }) => {
  const theme = useTheme();

  return (
    <Box pb={4}>
      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Box maxWidth={230}>
          <Animation loop={false} animation="success" />
        </Box>
      </Box>
      <InvoiceStatusLabel invoice={invoice} mt={4} />
      <Typography variant="h1" mt={2}>
        <Box color={theme.palette.primary.main} component="span">
          {formatNumber(invoice.amount)}${' '}
        </Box>
        {invoice.ref ? (
          <span> for {invoice.ref}</span>
        ) : (
          <span> transfer request</span>
        )}
      </Typography>
      <Typography variant="subtitle2" mt={1}>
        Transfer request from {formatTransactionId(invoice.receipientAddress)}
      </Typography>
      <Box mt={4}>
        <Typography>
          This transfer has succesfully been made on{' '}
          {invoice.confirmDate?.toLocaleDateString()}
          at {invoice.confirmDate?.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default PaidInvoice;
