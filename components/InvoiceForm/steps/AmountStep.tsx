import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEventHandler, useCallback, useState } from 'react';

import style from './AmountStep.module.scss';

interface AmountStepProps {
  onAmountSubmit: (amount: number) => void;
}

export const AmountStep: React.FC<AmountStepProps> = ({ onAmountSubmit }) => {
  const [amountValue, setAmountValue] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onAmountSubmit(Number(amountValue));
      return true;
    },
    [amountValue, onAmountSubmit],
  );

  return (
    <div className={style.AmountStep}>
      <form onSubmit={onSubmit}>
        <Typography variant="h1">
          How much money are you going to receive?
        </Typography>
        <Box mt={4} sx={{ display: 'flex' }}>
          <TextField
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
            type="text"
            autoFocus
            variant="outlined"
            placeholder="100$"
            sx={{ flex: '1' }}
          />
          <Box mr={2} />
          <Button variant="contained">Continue</Button>
        </Box>
      </form>
    </div>
  );
};
