import { Typography } from '@mui/material';

import style from './CurrencyLabel.module.scss';

import { useCurrentChain } from '../../hooks';
import { CurrencyCode } from '../../models';

type CurrencyLabelProps = {
  light?: boolean;
} & (
  | {
      currency: CurrencyCode;
      nativeCurrency?: undefined;
    }
  | {
      currency?: undefined;
      nativeCurrency: true;
    }
);

const CurrencyLabel: React.FC<CurrencyLabelProps> = ({ light, currency }) => {
  const currentChain = useCurrentChain();
  const currencyCode = currency || currentChain.nativeCurrency?.name;
  if (light) {
    return <Typography component="span">{currencyCode}</Typography>;
  }
  return (
    <div className={style.CurrencyLabel}>
      <Typography fontWeight="400" className={style.content}>
        {currencyCode}
      </Typography>
    </div>
  );
};

export default CurrencyLabel;
