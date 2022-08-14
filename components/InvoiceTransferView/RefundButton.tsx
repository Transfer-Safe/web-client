import { Typography, useTheme } from '@mui/material';
import React from 'react';

import { Invoice } from '../../models';
import Button, { ButtonProps } from '../Button';

type RefundButtonProps = ButtonProps & {
  invoice: Invoice;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RefundButton: React.FC<RefundButtonProps> = ({ invoice, ...props }) => {
  const isDisabled = true;
  const theme = useTheme();

  return (
    <React.Fragment>
      <Button disabled={isDisabled} {...props}>
        Refund
      </Button>
      {isDisabled && (
        <Typography
          component="div"
          color={theme.palette.grey[600]}
          textAlign="center"
          variant="caption"
        >
          Refund will be available in 14 days
        </Typography>
      )}
    </React.Fragment>
  );
};

export default RefundButton;
