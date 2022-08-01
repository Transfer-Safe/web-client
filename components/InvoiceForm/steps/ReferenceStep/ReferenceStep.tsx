import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEventHandler, HTMLAttributes, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './ReferenceStep.module.scss';

import { newInvoiceUpdate } from '../../../../store/newInvoiceForm/actions';
import { RootState } from '../../../../store/rootReducer';

type ReferenceStepProps = HTMLAttributes<HTMLDivElement> & {
  onReferenceSubmitted: () => void;
};

export const ReferenceStep: React.FC<ReferenceStepProps> = ({
  onReferenceSubmitted,
  ...props
}) => {
  const dispatch = useDispatch();
  const reference = useSelector<RootState, string>(
    (state) => state.newInvoiceForm.reference || '',
  );

  const onChange = useCallback(
    (value: string) => {
      dispatch(newInvoiceUpdate({ reference: value }));
    },
    [dispatch],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onReferenceSubmitted();
      return true;
    },
    [onReferenceSubmitted],
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
          <Button type="submit" variant="contained">
            Continue
          </Button>
        </Box>
      </form>
    </div>
  );
};
