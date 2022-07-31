import { Box, Button, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { FormEventHandler, HTMLAttributes, useCallback, useState } from 'react';

import style from './NotificationsStep.module.scss';

type NotificationsStep = HTMLAttributes<HTMLInputElement> & {
  onNotificationsSubmit: (email: string) => void;
};

export const NotificationsStep: React.FC<NotificationsStep> = ({
  onNotificationsSubmit,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');

  const onChange = useCallback((value: string) => setEmail(value), [setEmail]);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onNotificationsSubmit(email);
      return true;
    },
    [onNotificationsSubmit, email],
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
      <form onSubmit={onSubmit}>
        <Box mt={2} sx={{ display: 'flex' }}>
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
          <Button variant="contained">Continue</Button>
        </Box>
      </form>
    </div>
  );
};
