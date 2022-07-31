import { Box, Button, Typography } from '@mui/material';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import style from './CurrenciesStep.module.scss';

type CurrenciesStepProps = HTMLAttributes<HTMLDivElement>;

export const CurrenciesStep: React.FC<CurrenciesStepProps> = ({
  className,
  ...props
}) => {
  return (
    <div {...props} className={classNames(style.CurrenciesStep, className)}>
      <Typography variant="h1">What currencies do you prefer?</Typography>
      <Box mt={2}>
        <Button variant="contained">Continue</Button>
      </Box>
    </div>
  );
};
