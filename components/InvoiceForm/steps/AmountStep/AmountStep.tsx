import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEventHandler, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './AmountStep.module.scss';

import { newInvoiceUpdate } from '../../../../store/features/newInvoiceForm';
import { RootState } from '../../../../store/rootReducer';
import FormattedNumber from '../../../FormattedNumber';
import Button from '../../../Button';

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

  const onSubmit = useCallback(() => {
    onAmountSubmit();
  }, [onAmountSubmit]);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
      return true;
    },
    [onSubmit],
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
      <form onSubmit={onFormSubmit}>
        <Typography variant="h1">
          How much money do you want to receive?
        </Typography>
        <Box
          mt={4}
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
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
                placeholder="e.g. 100 $"
                autoFocus
                inputProps={{ inputMode: 'decimal', pattern: '[0-9\\.,]*' }}
                sx={{ flex: '1' }}
              />
            )}
          />
          <Box mr={2} />
          <Button
            size="large"
            sx={{
              mt: {
                xs: 1,
                md: 0,
              },
            }}
            shortcut="enter"
            disabled={disabled}
            type="submit"
            variant="contained"
            onClick={onSubmit}
          >
            Continue
          </Button>
        </Box>
      </form>
    </div>
  );
};
