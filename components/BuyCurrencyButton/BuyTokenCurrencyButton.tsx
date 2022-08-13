import { Box, Typography, useTheme } from '@mui/material';
import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';

import {
  useCurrencyByAddress,
  useGetInvoiceAmountInCurrency,
  useGetTokenBalance,
  useSendErc20,
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

  const theme = useTheme();

  const tokenBalance = useGetTokenBalance(token);
  const available = tokenBalance.data;

  const sendTokens = useSendErc20(token, data);

  const onTransfer = useCallback(() => {
    sendTokens.write?.();
  }, [sendTokens]);

  return (
    <Button {...props} onClick={onTransfer}>
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
          {available ? formatNumber(available) : '...'} available
        </Typography>
      </Box>
    </Button>
  );
};
