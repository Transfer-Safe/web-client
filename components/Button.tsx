import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import React from 'react';

export type ButtonProps = LoadingButtonProps & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <LoadingButton {...props}>{children}</LoadingButton>;
};

export default Button;
