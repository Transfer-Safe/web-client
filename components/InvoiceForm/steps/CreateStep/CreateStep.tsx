import { Box, Button, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { HTMLAttributes, useCallback } from 'react';
import { useAccount } from 'wagmi';

import style from './CreateStep.module.scss';

import { useCreateInvoice } from '../../../../hooks';
import AppModal from '../../../AppModal';
import ThrobberSection from '../../../Throbber/ThrobberSection';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const { isConnected } = useAccount();
  const createInvoice = useCreateInvoice();

  const onCreateInvoice = useCallback(async () => {
    createInvoice.write?.();
  }, [createInvoice]);

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
      <AppModal
        open={createInvoice.isLoading}
        title="Please, sign your transaction in your wallet"
      >
        <ThrobberSection
          title="Waiting for you to sign the transaction"
          mt={2}
        />
      </AppModal>
    </div>
  );
};
