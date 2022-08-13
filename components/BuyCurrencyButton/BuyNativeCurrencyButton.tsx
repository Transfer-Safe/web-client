import { Box, Typography, useTheme } from '@mui/material';
import { useCallback } from 'react';
import { useAccount, useBalance } from 'wagmi';

import {
  useCurrentChain,
  useDepositInvoice,
  useGetInvoiceAmountInNativeCurrency,
} from '../../hooks';
import { formatNumber } from '../../utils';
import Button, { ButtonProps } from '../Button';

type BuyNativeCurrencyButtonProps = ButtonProps & {
  invoiceId: string;
};

export const BuyNativeCurrencyButton: React.FC<
  BuyNativeCurrencyButtonProps
> = ({ invoiceId, ...props }) => {
  const chain = useCurrentChain();
  const { data } = useGetInvoiceAmountInNativeCurrency(invoiceId);
  const account = useAccount();
  const balance = useBalance({
    addressOrName: account.address,
  });
  const theme = useTheme();

  const deposit = useDepositInvoice(invoiceId, data);

  const onDeposit = useCallback(() => {
    deposit.write?.();
  }, [deposit]);

  return (
    <Button {...props} onClick={onDeposit}>
      <Box
        display="flex"
        justifyContent="space-between"
        width={1}
        alignItems="center"
      >
        <Typography>
          Send {data ? formatNumber(data) : '...'}{' '}
          {chain?.nativeCurrency?.name || 'ETH'}
        </Typography>
        <Typography color={theme.palette.grey[600]} variant="body2">
          {balance.data ? formatNumber(balance.data.value) : '...'} available
        </Typography>
      </Box>
    </Button>
  );
};
