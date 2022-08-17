import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

import Button from '../../Button';

interface TypeStepProps {
  onTypeSubmit: (isInstant: boolean) => void;
}

const TypeStep: React.FC<TypeStepProps> = ({ onTypeSubmit }) => {
  const onEnable = useCallback(() => {
    onTypeSubmit(false);
  }, [onTypeSubmit]);

  const onSkip = useCallback(() => {
    onTypeSubmit(true);
  }, [onTypeSubmit]);

  return (
    <Box>
      <Typography variant="h1">Enable two-step transfer?</Typography>
      <Typography mt={2}>
        With a two-step transfer enabled, TransferSafe will first ask the sender
        for a deposit. The sender will then have to confirm the transfer so you
        can receive it.
      </Typography>
      <Typography mt={1}>
        If the sender changes their mind, they can return the deposit, but not
        before{' '}
        <Typography component="span" fontWeight={500}>
          two weeks
        </Typography>
        .
      </Typography>
      <Box
        display="flex"
        mt={4}
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Button
          shortcut="enter"
          size="large"
          variant="contained"
          onClick={onEnable}
        >
          Enable two-step
        </Button>
        <Button
          size="large"
          variant="outlined"
          sx={{ ml: { md: 2 }, mt: { xs: 1, md: 0 } }}
          onClick={onSkip}
        >
          Maybe next time
        </Button>
      </Box>
    </Box>
  );
};

export default TypeStep;
