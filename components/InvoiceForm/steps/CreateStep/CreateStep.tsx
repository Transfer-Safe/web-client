import { Box, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount } from 'wagmi';

import style from './CreateStep.module.scss';

import { theme } from '../../../../config';
import { useCreateInvoice, useCurrentChain } from '../../../../hooks';
import { useConvertToUsd } from '../../../../hooks/useConvertToUsd';
import { formatTransactionId } from '../../../../utils';
import AppModal from '../../../AppModal';
import FormattedNumber from '../../../FormattedNumber';
import ThrobberSection from '../../../Throbber/ThrobberSection';
import { selectIsEncryptingEmail } from '../../../../store/features/encryptEmail';
import Button from '../../../Button';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const router = useRouter();
  const currentChain = useCurrentChain();
  const [isCreating, setIsCreating] = useState(false);
  const { isConnected } = useAccount();
  const createInvoice = useCreateInvoice();
  const feeInUsd = useConvertToUsd(createInvoice.fee || 0);
  const isEmailEncrypting = useSelector(selectIsEncryptingEmail);

  const isLoading = useMemo(
    () => isEmailEncrypting || !createInvoice.writeAsync,
    [isEmailEncrypting, createInvoice],
  );

  const onCreateInvoice = useCallback(async () => {
    if (isLoading) {
      return;
    }
    createInvoice.write?.();
  }, [createInvoice, isLoading]);

  useEffect(() => {
    if (createInvoice.data) {
      setIsCreating(true);
      createInvoice.data
        ?.wait()
        .then(() => {
          router.push(
            `/invoices/${currentChain.id}/${createInvoice.invoice.id}`,
          );
        })
        .catch(() => {
          setIsCreating(false);
        });
    }
  }, [createInvoice.data, createInvoice.invoice, router, currentChain]);

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
            <Button
              loading={isLoading}
              size="large"
              variant="contained"
              onClick={onCreateInvoice}
              shortcut="enter"
            >
              Create invoice
            </Button>
            <Typography
              variant="caption"
              ml={2}
              color={theme.palette.grey[800]}
            >
              Transaction fee:{' '}
              {createInvoice.fee ? (
                <FormattedNumber prefix="~" value={feeInUsd || 0} suffix=" $" />
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
