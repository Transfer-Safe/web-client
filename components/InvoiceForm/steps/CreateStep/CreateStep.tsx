import { Box, Button, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import style from './CreateStep.module.scss';

import { theme } from '../../../../config';
import { useCreateInvoice } from '../../../../hooks';
import { useConvertToUsd } from '../../../../hooks/useConvertToUsd';
import { formatTransactionId } from '../../../../utils';
import AppModal from '../../../AppModal';
import FormattedNumber from '../../../FormattedNumber';
import ThrobberSection from '../../../Throbber/ThrobberSection';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const { isConnected } = useAccount();
  const createInvoice = useCreateInvoice();
  const feeInUsd = useConvertToUsd(createInvoice.fee || 0)?.toNumber();

  const onCreateInvoice = useCallback(async () => {
    createInvoice.write?.();
  }, [createInvoice]);

  useEffect(() => {
    if (createInvoice.data) {
      setIsCreating(true);
      createInvoice.data
        ?.wait()
        .then((receipt) => {
          console.log('===> receipt', receipt);
        })
        .finally(() => {
          setIsCreating(false);
        });
    }
  }, [createInvoice.data]);

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
          <Box display="flex" alignItems="center">
            <Button size="large" variant="contained" onClick={onCreateInvoice}>
              Create invoice
            </Button>
            <Typography
              variant="caption"
              ml={2}
              color={theme.palette.grey[800]}
            >
              Transaction fee:{' '}
              {createInvoice.fee ? (
                <FormattedNumber prefix="~" value={feeInUsd} suffix=" $" />
              ) : (
                '...'
              )}
            </Typography>
          </Box>
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
      <AppModal open={isCreating} title="Creating invoice">
        <ThrobberSection
          title="Waiting for your transaction to be mined"
          subtitle={
            createInvoice.data && (
              <span>
                Transaction number:{' '}
                {formatTransactionId(createInvoice.data.hash)}
              </span>
            )
          }
          mt={2}
        />
      </AppModal>
    </div>
  );
};
