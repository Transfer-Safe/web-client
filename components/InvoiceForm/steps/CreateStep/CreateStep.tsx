import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useEthers } from '@usedapp/core';
import classNames from 'classnames';
import { HTMLAttributes, useCallback } from 'react';

import style from './CreateStep.module.scss';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const { account, activateBrowserWallet } = useEthers();

  const onConnect = useCallback(() => {
    activateBrowserWallet();
  }, [activateBrowserWallet]);

  const onCreateInvoice = useCallback(() => {
    console.log('===> on create invoice');
  }, []);

  return (
    <div className={classNames(style.CreateStep, className)} {...props}>
      <Typography variant="h1">And one more thing</Typography>
      <Typography>
        Please connect, using your favorite wallet, to create the invoice
      </Typography>
      <Box mt={2}>
        {!account && (
          <Button
            size="large"
            variant="contained"
            onClick={onConnect}
            startIcon={<AccountBalanceWalletOutlinedIcon />}
          >
            Connect wallet
          </Button>
        )}
        {account && (
          <Button size="large" variant="contained" onClick={onCreateInvoice}>
            Create invoice
          </Button>
        )}
      </Box>
    </div>
  );
};
