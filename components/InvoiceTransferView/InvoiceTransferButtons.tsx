import { Box, Typography, useTheme } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { useAccount } from 'wagmi';

import { Invoice } from '../../models';
import { formatTransactionId } from '../../utils';
import BuyCurrencyButton from '../BuyCurrencyButton';

interface InvoiceTransferButtonsProps {
  invoice: Invoice;
}

export const InvoiceTransferButtons: React.FC<InvoiceTransferButtonsProps> = ({
  invoice,
}) => {
  const { isConnected } = useAccount();
  const theme = useTheme();

  return (
    <React.Fragment>
      <Box
        mt={2}
        display="flex"
        flexDirection="column"
        sx={{
          alignItems: {
            xs: 'center',
            md: 'inherit',
          },
        }}
      >
        {!isConnected && <ConnectButton />}
        {isConnected && (
          <React.Fragment>
            {invoice.isNativeToken && (
              <BuyCurrencyButton
                invoiceId={invoice.id}
                variant="outlined"
                isNativeCurrency
                size="large"
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'inherit',
                  },
                  marginTop: 2,
                }}
              />
            )}
            {invoice.availableTokenTypes.map((token) => (
              <BuyCurrencyButton
                invoiceId={invoice.id}
                key={token}
                variant="outlined"
                tokenAddress={token}
                value={10}
                size="large"
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'inherit',
                  },
                  marginTop: 2,
                }}
              />
            ))}
          </React.Fragment>
        )}
      </Box>
      {!invoice.instant && (
        <Typography color={theme.palette.grey[800]} my={4} variant="body2">
          We will hold your transfer until you confirm it by pressing the
          “Confirm” button. If you change your mind you can refund your deposit
          after{' '}
          <Box
            component="span"
            fontWeight="600"
            color={theme.palette.primary.main}
          >
            2 weeks
          </Box>
        </Typography>
      )}
      {invoice.instant && (
        <Typography color={theme.palette.grey[800]} my={4} variant="body2">
          Your transfer will be sent directly to the recipient (wallet{' '}
          {formatTransactionId(invoice.receipientAddress)}).
        </Typography>
      )}
    </React.Fragment>
  );
};
