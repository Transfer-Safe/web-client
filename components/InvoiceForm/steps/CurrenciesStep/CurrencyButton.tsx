import { Box, Button, Typography } from '@mui/material';
import { BoxProps } from '@mui/system';
import { utils } from 'ethers';
import { useMemo } from 'react';

import { useConvertFromUsd } from '../../../../hooks';
import { CurrencyCode } from '../../../../models';
import { formatNumber } from '../../../../utils';

type CurrencyButtonProps = BoxProps & {
  value: number;
  currency?: CurrencyCode;
  name: string;
  active?: boolean;
  onClick: () => void;
  available?: boolean;
};

export const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  name,
  active = false,
  available = true,
  onClick,
  value,
  currency,
  ...props
}) => {
  const amount = useConvertFromUsd(
    utils.parseEther(value.toString()),
    currency,
  );
  const formattedAmount = useMemo(
    () => (amount ? formatNumber(amount) : undefined),
    [amount],
  );
  return (
    <Box mr={2} {...props}>
      <Button
        onClick={onClick}
        variant="outlined"
        color={active ? 'primary' : 'disabled'}
        disabled={!available}
      >
        <Box
          height={{
            xs: 55,
            md: 110,
          }}
          width={{
            xs: 90,
            md: 180,
          }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="end"
          >
            <Typography fontWeight="500" align="left">
              {name}
            </Typography>
          </Box>
          {!available ? (
            <Typography textAlign="right" variant="caption">
              Soon
            </Typography>
          ) : (
            formattedAmount && (
              <Typography
                variant="caption"
                textAlign={{
                  xs: 'right',
                  md: 'left',
                }}
              >
                ~{formattedAmount}
              </Typography>
            )
          )}
        </Box>
      </Button>
    </Box>
  );
};
