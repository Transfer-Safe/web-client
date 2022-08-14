import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import React, { AnchorHTMLAttributes } from 'react';

export type ButtonProps = LoadingButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    loading?: boolean;
  };

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <LoadingButton {...props}>{children}</LoadingButton>;
};

export default Button;
