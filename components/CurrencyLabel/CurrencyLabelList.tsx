import React from 'react';

import CurrencyLabel from './CurrencyLabel';

import { CurrencyCode } from '../../models';

interface CurrencyLabelListProps {
  light?: boolean;
  isNative?: boolean;
  currencies?: CurrencyCode[];
}

export const CurrencyLabelList: React.FC<CurrencyLabelListProps> = ({
  light,
  isNative = false,
  currencies = [],
}) => {
  return (
    <React.Fragment>
      {isNative && <CurrencyLabel light={light} nativeCurrency />}
      {currencies.map((currency, index) => (
        <React.Fragment key={currency}>
          {(isNative || index > 0) && <span>, </span>}
          <CurrencyLabel light={light} currency={currency} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
