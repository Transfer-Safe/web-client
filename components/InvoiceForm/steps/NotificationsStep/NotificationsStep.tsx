import { Box, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { FormEventHandler, HTMLAttributes, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './NotificationsStep.module.scss';

import { newInvoiceUpdate } from '../../../../store/features/newInvoiceForm';
import { RootState } from '../../../../store/rootReducer';
import Button from '../../../Button';

type NotificationsStep = HTMLAttributes<HTMLInputElement> & {
  onNotificationsSubmit: () => void;
};

export const NotificationsStep: React.FC<NotificationsStep> = ({
  onNotificationsSubmit,
  className,
  ...props
}) => {
  const dispatch = useDispatch();
  const initialEmail = useSelector<RootState, string | undefined>(
    (state) => state.newInvoiceForm.email,
  );
  const [email, setEmail] = useState(initialEmail || '');

  const onChange = useCallback(
    (value: string) => {
      setEmail(value);
    },
    [setEmail],
  );

  const onSubmit = useCallback(() => {
    dispatch(newInvoiceUpdate({ email }));
    onNotificationsSubmit();
  }, [dispatch, email, onNotificationsSubmit]);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
      return true;
    },
    [onSubmit],
  );

  return (
    <div className={classNames(style.NotificationsStep, className)} {...props}>
      <Typography variant="h1">
        Do you want to receive payment notifications?
      </Typography>
      <Typography mt={4}>
        You can type in your email here, we&apos;ll use it only for
        notifications regarding your invoice. It won&apos;t be visible to anyone
      </Typography>
      <form onSubmit={onFormSubmit}>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <TextField
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e.target.value)}
            sx={{ flex: '1' }}
            variant="outlined"
            placeholder="muffin@bakery.com"
            type="email"
          />
          <Box mr={2} />
          <Button
            shortcut="enter"
            type="submit"
            variant="contained"
            onClick={onSubmit}
            size="large"
            sx={{
              mt: {
                xs: 1,
                md: 0,
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </form>
    </div>
  );
};
