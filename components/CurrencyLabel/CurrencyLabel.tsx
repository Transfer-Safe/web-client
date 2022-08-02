import { Typography } from '@mui/material';

import style from './CurrencyLabel.module.scss';

import { useCurrentChain } from '../../hooks';
import { CurrencyCode } from '../../models';

type CurrencyLabelProps =
  | {
      currency: CurrencyCode;
      nativeCurrency?: undefined;
    }
  | {
      currency?: undefined;
      nativeCurrency: true;
    };

const CurrencyLabel: React.FC<CurrencyLabelProps> = ({ currency }) => {
  const currentChain = useCurrentChain();
  return (
    <div className={style.CurrencyLabel}>
      <Typography fontWeight="200" className={style.content}>
        {currency || currentChain.nativeCurrency?.name}
      </Typography>
    </div>
  );
};

export default CurrencyLabel;
