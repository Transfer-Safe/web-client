import { Box, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount, useBalance } from 'wagmi';

import {
  useCurrentChain,
  useDepositInvoice,
  useGetInvoiceAmountInNativeCurrency,
} from '../../hooks';
import {
  failedTransferInvoice,
  signedTransferInvoice,
  startTransferInvoice,
  successTransferInvoice,
} from '../../store/transferInvoice/actions';
import { TransferInvoiceType } from '../../store/transferInvoice/types';
import { formatNumber } from '../../utils';
import Button, { ButtonProps } from '../Button';

type BuyNativeCurrencyButtonProps = ButtonProps & {
  invoiceId: string;
};

export const BuyNativeCurrencyButton: React.FC<
  BuyNativeCurrencyButtonProps
> = ({ invoiceId, ...props }) => {
  const chain = useCurrentChain();
  const { data } = useGetInvoiceAmountInNativeCurrency(invoiceId);
  const account = useAccount();
  const balance = useBalance({
    addressOrName: account.address,
  });
  const theme = useTheme();
  const dispatch = useDispatch();

  const deposit = useDepositInvoice(invoiceId, false, data);

  const onDeposit = useCallback(() => {
    if (deposit.writeAsync) {
      dispatch(startTransferInvoice(TransferInvoiceType.NATIVE));
      deposit
        .writeAsync()
        .then(({ hash }) => dispatch(signedTransferInvoice({ txId: hash })))
        .catch((err) => dispatch(failedTransferInvoice(err)));
    }
  }, [deposit, dispatch]);

  useEffect(() => {
    switch (deposit.status) {
      case 'success':
        dispatch(successTransferInvoice());
        break;
      default:
        return;
    }
  }, [dispatch, deposit.status]);

  return (
    <Button {...props} onClick={onDeposit}>
      <Box
        display="flex"
        justifyContent="space-between"
        width={1}
        alignItems="center"
      >
        <Typography>
          Send {data ? formatNumber(data) : '...'}{' '}
          {chain?.nativeCurrency?.name || 'ETH'}
        </Typography>
        <Typography ml={1} color={theme.palette.grey[600]} variant="body2">
          {balance.data ? formatNumber(balance.data.value) : '...'} available
        </Typography>
      </Box>
    </Button>
  );
};
