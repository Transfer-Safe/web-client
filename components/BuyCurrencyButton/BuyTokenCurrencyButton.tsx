import { Box, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
  useCurrencyByAddress,
  useGetInvoiceAmountInCurrency,
  useGetTokenBalance,
  useSendErc20,
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

type BuyTokenCurrencyButtonProps = ButtonProps & {
  invoiceId: string;
  token: string;
};

export const BuyTokenCurrencyButton: React.FC<BuyTokenCurrencyButtonProps> = ({
  invoiceId,
  token,
  ...props
}) => {
  const getCurrency = useCurrencyByAddress();
  const currency = useMemo(() => getCurrency(token), [getCurrency, token]);
  const dispatch = useDispatch();

  const { data } = useGetInvoiceAmountInCurrency(invoiceId, token);

  const theme = useTheme();

  const tokenBalance = useGetTokenBalance(token);
  const available = tokenBalance.data;

  const sendTokens = useSendErc20(token, data);

  const onTransfer = useCallback(() => {
    if (sendTokens.writeAsync) {
      dispatch(startTransferInvoice(TransferInvoiceType.ERC20));
      sendTokens
        .writeAsync()
        .then(({ hash }) => dispatch(signedTransferInvoice({ txId: hash })))
        .catch((err) => dispatch(failedTransferInvoice(err)));
    }
  }, [sendTokens, dispatch]);

  useEffect(() => {
    switch (sendTokens.status) {
      case 'success':
        dispatch(successTransferInvoice());
        break;
      case 'error':
        dispatch(failedTransferInvoice(sendTokens.error));
        break;
      default:
        return;
    }
  }, [dispatch, sendTokens.status, sendTokens.error]);

  return (
    <Button {...props} onClick={onTransfer}>
      <Box
        display="flex"
        justifyContent="space-between"
        width={1}
        alignItems="center"
      >
        <Typography>
          Send {data ? formatNumber(data) : '...'} {currency?.code}
        </Typography>
        <Typography ml={1} variant="body2" color={theme.palette.grey[600]}>
          {available ? formatNumber(available) : '...'} available
        </Typography>
      </Box>
    </Button>
  );
};
