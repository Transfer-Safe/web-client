import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEventHandler, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './AmountStep.module.scss';

import { newInvoiceUpdate } from '../../../../store/newInvoiceForm/actions';
import { RootState } from '../../../../store/rootReducer';
import FormattedNumber from '../../../FormattedNumber';

interface AmountStepProps {
  onAmountSubmit: () => void;
}

export const AmountStep: React.FC<AmountStepProps> = ({ onAmountSubmit }) => {
  const dispatch = useDispatch();
  const currentAmount = useSelector<RootState, number>(
    (state) => state.newInvoiceForm.amount,
  );
  const [amountValue, setAmountValue] = useState(
    currentAmount ? currentAmount.toString() : '',
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onAmountSubmit();
      return true;
    },
    [onAmountSubmit],
  );

  const onChange = useCallback(
    (v: string) => {
      setAmountValue(v);
      dispatch(newInvoiceUpdate({ amount: Number(v) }));
    },
    [dispatch],
  );

  const disabled = !amountValue;

  return (
    <div className={style.AmountStep}>
      <form onSubmit={onSubmit}>
        <Typography variant="h1">
          How much money are you going to receive?
        </Typography>
        <Box mt={4} sx={{ display: 'flex' }}>
          <FormattedNumber
            value={amountValue}
            onValueChange={(v) => onChange(v.value)}
            suffix=" $"
            displayType="input"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            customInput={({ color, size, ...props }) => (
              <TextField
                {...props}
                variant="outlined"
                type="text"
                autoFocus
                sx={{ flex: '1' }}
              />
            )}
          />
          <Box mr={2} />
          <Button disabled={disabled} type="submit" variant="contained">
            Continue
          </Button>
        </Box>
      </form>
    </div>
  );
};
