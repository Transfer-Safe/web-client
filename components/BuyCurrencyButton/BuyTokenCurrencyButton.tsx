import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import {
  useCurrencyByAddress,
  useGetInvoiceAmountInCurrency,
} from '../../hooks';
import { formatNumber } from '../../utils';
import Button, { ButtonProps } from '../Button';

type BuyTokenCurrencyButtonProps = ButtonProps & {
  invoiceId: string;
  token: string;
};

export const BuyTokenCurrencyButton: React.FC<BuyTokenCurrencyButtonProps> = ({
  invoiceId,
  token,
  ...props
}) => {
  const getCurrency = useCurrencyByAddress();
  const currency = useMemo(() => getCurrency(token), [getCurrency, token]);

  const { data } = useGetInvoiceAmountInCurrency(invoiceId, token);
  const available = 956;

  const theme = useTheme();

  return (
    <Button {...props}>
      <Box
        display="flex"
        justifyContent="space-between"
        width={1}
        alignItems="center"
      >
        <Typography>
          Send {data ? formatNumber(data) : '...'} {currency?.code}
        </Typography>
        <Typography variant="body2" color={theme.palette.grey[600]}>
          available: {available ? formatNumber(available) : '...'}
        </Typography>
      </Box>
    </Button>
  );
};
