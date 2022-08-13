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

  // return (
  //   <Button
  //     className={classNames(style.BuyCurrencyButton, className)}
  //     {...props}
  //   >
  //     <Box
  //       display="flex"
  //       justifyContent="space-between"
  //       width="100%"
  //       alignItems="center"
  //     >
  //       <Box>
  //         <Typography component="span" fontWeight="500">
  //           Send {formatNumber(value)} {currencyCode}{' '}
  //         </Typography>
  //       </Box>
  //       <Box>
  //         <Typography
  //           component="span"
  //           variant="body2"
  //           color={theme.palette.grey[600]}
  //         >
  //           {formatNumber(balance.data?.value || 0)} {currencyCode} available
  //         </Typography>
  //       </Box>
  //     </Box>
  //   </Button>
  // );
};
