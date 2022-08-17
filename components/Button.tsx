import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useMediaQuery, useTheme } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { AnchorHTMLAttributes, useMemo } from 'react';

import { useOnKey } from '../hooks';

export type ButtonProps = LoadingButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    loading?: boolean;
    shortcut?: 'enter';
    onClick?: () => void;
  };

const Button: React.FC<ButtonProps> = ({
  children,
  shortcut,
  onClick = () => undefined,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const Icon = useMemo(() => {
    if (!isDesktop) {
      return;
    }
    switch (shortcut) {
      case 'enter':
        return KeyboardReturnIcon;
      default:
        return;
    }
  }, [shortcut, isDesktop]);

  const shortcutKey = useMemo(() => {
    if (disabled) {
      return 'no-key';
    }
    switch (shortcut) {
      case 'enter':
        return 'Enter';
      default:
        return 'no-key';
    }
  }, [shortcut, disabled]);

  useOnKey(shortcutKey, onClick);

  return (
    <LoadingButton
      disabled={disabled}
      onClick={onClick}
      startIcon={Icon && <Icon sx={{ mt: '6px', mr: '2px' }} />}
      {...props}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
