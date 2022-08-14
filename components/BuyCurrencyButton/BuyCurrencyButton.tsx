import classNames from 'classnames';

import style from './BuyCurrencyButton.module.scss';
import { BuyNativeCurrencyButton } from './BuyNativeCurrencyButton';
import { BuyTokenCurrencyButton } from './BuyTokenCurrencyButton';

import { ButtonProps } from '../Button';

type BuyCurrencyButtonProps = ButtonProps & {
  invoiceId: string;
} & (
    | { tokenAddress: string; isNativeCurrency?: undefined }
    | { isNativeCurrency: boolean; tokenAddress?: undefined }
  );

export const BuyCurrencyButton: React.FC<BuyCurrencyButtonProps> = ({
  tokenAddress,
  className,
  invoiceId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isNativeCurrency,
  ...props
}) => {
  if (tokenAddress) {
    return (
      <BuyTokenCurrencyButton
        invoiceId={invoiceId}
        token={tokenAddress}
        className={classNames(style.BuyCurrencyButton, className)}
        {...props}
      />
    );
  }
  return (
    <BuyNativeCurrencyButton
      invoiceId={invoiceId}
      className={classNames(style.BuyCurrencyButton, className)}
      {...props}
    />
  );
};
