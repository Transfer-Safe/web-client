import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useConfirmInvoice } from '../../hooks';
import { Invoice } from '../../models';
import {
  failedConfirmInvoice,
  signedConfirmInvoice,
  startConfirmInvoice,
  successConfirmInvoice,
} from '../../store/confirmInvoice';
import Button, { ButtonProps } from '../Button';

type ConfirmButtonProps = ButtonProps & {
  invoice: Invoice;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ invoice, ...props }) => {
  const confirm = useConfirmInvoice(invoice.id);
  const dispatch = useDispatch();

  const onConfirm = useCallback(() => {
    if (confirm.writeAsync) {
      dispatch(startConfirmInvoice());
      confirm
        .writeAsync()
        .then((data) => dispatch(signedConfirmInvoice({ txid: data.hash })))
        .catch((err) => dispatch(failedConfirmInvoice(err)));
    }
  }, [confirm, dispatch]);

  useEffect(() => {
    switch (confirm.status) {
      case 'success':
        dispatch(successConfirmInvoice());
        break;
      case 'error':
        dispatch(failedConfirmInvoice(confirm.error));
        break;
      default:
        return;
    }
  }, [confirm.status, confirm.error, dispatch]);

  return (
    <Button onClick={onConfirm} disabled={!confirm.write} {...props}>
      Confirm
    </Button>
  );
};

export default ConfirmButton;
