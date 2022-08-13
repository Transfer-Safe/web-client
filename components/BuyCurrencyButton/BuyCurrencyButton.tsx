import { Box, Typography, useTheme } from '@mui/material';
import classNames from 'classnames';
import { BigNumberish } from 'ethers';
import { useMemo } from 'react';
import { useAccount, useBalance } from 'wagmi';

import style from './BuyCurrencyButton.module.scss';

import { useCurrencyByAddress, useCurrentChain } from '../../hooks';
import { formatNumber } from '../../utils';
import Button, { ButtonProps } from '../Button';

type BuyCurrencyButtonProps = ButtonProps & {
  value: BigNumberish;
} & (
    | { tokenAddress: string; isNativeCurrency?: undefined }
    | { isNativeCurrency: boolean; tokenAddress?: undefined }
  );

export const BuyCurrencyButton: React.FC<BuyCurrencyButtonProps> = ({
  tokenAddress,
  className,
  value,
  ...props
}) => {
  const chain = useCurrentChain();
  const account = useAccount();
  const balance = useBalance({
    enabled: true,
    chainId: chain.id,
    addressOrName: account.address,
  });

  const currencyByAddress = useCurrencyByAddress();
  const currency = useMemo(() => {
    if (tokenAddress) {
      return currencyByAddress(tokenAddress);
    }
  }, [tokenAddress, currencyByAddress]);

  const currencyCode = currency?.code || chain.nativeCurrency?.name || 'ETH';
  const theme = useTheme();

  return (
    <Button
      className={classNames(style.BuyCurrencyButton, className)}
      {...props}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Box>
          <Typography component="span" fontWeight="500">
            Send {formatNumber(value)} {currencyCode}{' '}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            variant="body2"
            color={theme.palette.grey[600]}
          >
            {formatNumber(balance.data?.value || 0)} {currencyCode} available
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};
