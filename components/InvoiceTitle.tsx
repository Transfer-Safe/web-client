import { Box, Typography, TypographyProps, useTheme } from '@mui/material';

import { Invoice } from '../models';
import { formatNumber } from '../utils';

type InvoiceTitle = TypographyProps & {
  invoice: Invoice;
};

const InvoiceTitle: React.FC<InvoiceTitle> = ({ invoice, ...props }) => {
  const theme = useTheme();

  return (
    <Typography {...props}>
      <Box color={theme.palette.primary.main} component="span">
        {formatNumber(invoice.amount)}${' '}
      </Box>
      {invoice.ref ? (
        <span> for {invoice.ref}</span>
      ) : (
        <span> transfer request</span>
      )}
    </Typography>
  );
};

export default InvoiceTitle;
