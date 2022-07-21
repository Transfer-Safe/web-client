import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  Loading,
  Spacer,
} from '@nextui-org/react';
import React from 'react';

export type ButtonProps = BaseButtonProps & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <BaseButton {...props} disabled={disabled || loading}>
      {loading && (
        <React.Fragment>
          <Loading type="points-opacity" color="currentColor" size="sm" />
          <Spacer y={0} x={0.25} />
        </React.Fragment>
      )}{' '}
      {children}
    </BaseButton>
  );
};

export default Button;
