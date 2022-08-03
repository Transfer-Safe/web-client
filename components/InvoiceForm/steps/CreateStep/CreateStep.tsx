import { Box, Button, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import classNames from 'classnames';
import { HTMLAttributes, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

import style from './CreateStep.module.scss';

import { useCreateInvoice } from '../../../../hooks';
import { Invoice } from '../../../../models';
import { NewInvoiceFormState } from '../../../../store/newInvoiceForm';
import { RootState } from '../../../../store/rootReducer';

type CreateStepProps = HTMLAttributes<HTMLDivElement>;

export const CreateStep: React.FC<CreateStepProps> = ({
  className,
  ...props
}) => {
  const { isConnected } = useAccount();
  const newInvoice = useSelector<RootState, NewInvoiceFormState>(
    (state) => state.newInvoiceForm,
  );
  const invoice = useMemo(() => {
    return new Invoice(
      newInvoice.amount,
      newInvoice.isNativeCurrencyEnabled,
      newInvoice.currencies,
      newInvoice.reference,
      undefined,
      newInvoice.email,
    ).serialize();
  }, [newInvoice]);

  const createInvoice = useCreateInvoice(invoice);

  const onCreateInvoice = useCallback(async () => {
    // console.log('===> createInvoice', createInvoice);
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
    </div>
  );
};
