import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEventHandler, HTMLAttributes, useCallback, useState } from 'react';

import style from './ReferenceStep.module.scss';

type ReferenceStepProps = HTMLAttributes<HTMLDivElement> & {
  onReferenceSubmitted: (reference: string) => void;
};

export const ReferenceStep: React.FC<ReferenceStepProps> = ({
  onReferenceSubmitted,
  ...props
}) => {
  const [reference, setReference] = useState('');

  const onChange = useCallback(
    (value: string) => setReference(value),
    [setReference],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onReferenceSubmitted(reference);
      return true;
    },
    [onReferenceSubmitted, reference],
  );

  return (
    <div className={style.ReferenceStep} {...props}>
      <Typography variant="h1">What are you receiving money for?</Typography>
      <Typography mt={2}>
        This reference name will be visible to anyone you send the link to. You
        can leave it blank
      </Typography>
      <form onSubmit={onSubmit}>
        <Box mt={4} sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            autoFocus
            value={reference}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. — iPhone from craiglist"
            variant="outlined"
            sx={{ flex: '1' }}
          />
          <Box mr={2} />
          <Button variant="contained">Continue</Button>
        </Box>
      </form>
    </div>
  );
};
