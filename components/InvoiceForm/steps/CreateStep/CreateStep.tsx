import { Box, Button, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { HTMLAttributes, useCallback } from 'react';
import { useAccount } from 'wagmi';

import style from './CreateStep.module.scss';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const { isConnected } = useAccount();

  const onCreateInvoice = useCallback(() => {
    console.log('===> on create invoice');
  }, []);

  return (
    <div className={classNames(style.CreateStep, className)} {...props}>
      <Typography variant="h1">And one more thing</Typography>
      {!isConnected && (
        <Typography>
          Please connect, using your favorite wallet, to create the invoice
        </Typography>
      )}
      {isConnected && <Typography>Lets create the invoice</Typography>}
      <Box mt={2}>
        {!isConnected && <ConnectButton />}
        {isConnected && (
          <Button size="large" variant="contained" onClick={onCreateInvoice}>
            Create invoice
          </Button>
        )}
      </Box>
    </div>
  );
};
