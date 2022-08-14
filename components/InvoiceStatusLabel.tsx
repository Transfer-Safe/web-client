import { Box, BoxProps, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

import { Invoice } from '../models';

type InvoiceStatusLabelProps = BoxProps & {
  invoice: Invoice;
};

const InvoiceStatusLabel: React.FC<InvoiceStatusLabelProps> = ({
  invoice,
  ...props
}) => {
  const account = useAccount();

  const backgroundColor = useMemo(() => {
    if (invoice.paid) {
      return '#9fe34f';
    }
    if (invoice.deposited) {
      return '#ffcf00';
    }
    return '#d2c2ff';
  }, [invoice]);

  const invoiceStatus = useMemo(() => {
    if (invoice.paid) {
      return 'Transfer completed';
    }

    if (invoice.deposited) {
      if (invoice.senderAddress === account.address) {
        return 'Waiting for your confirmation';
      }
      return 'Waiting for confirmation';
    }

    return 'Waiting for transfer';
  }, [invoice, account.address]);

  const Icon = useMemo(() => {
    if (invoice.paid) {
      return DoneIcon;
    }
    if (invoice.deposited) {
      return AccessTimeIcon;
    }
  }, [invoice]);

  return (
    <Box
      {...props}
      display="flex"
      width="fit-content"
      alignItems="center"
      bgcolor={backgroundColor}
      px={2}
      py={0.5}
      borderRadius={8}
    >
      {Icon && (
        <React.Fragment>
          <Icon
            sx={{
              width: 20,
              height: 20,
            }}
          />
          <Box mr={1} />
        </React.Fragment>
      )}
      <Typography fontWeight="600" variant="caption">
        {invoiceStatus}
      </Typography>
    </Box>
  );
};

export default InvoiceStatusLabel;
