import { Box, Button, Typography } from '@mui/material';
import classNames from 'classnames';
import { FormEventHandler, HTMLAttributes, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './CurrenciesStep.module.scss';
import { CurrencyButton } from './CurrencyButton';

import { useCurrenciesList, useCurrentChain } from '../../../../hooks';
import { CurrencyCode } from '../../../../models';
import { NewInvoiceFormState } from '../../../../store/newInvoiceForm';
import { newInvoiceUpdate } from '../../../../store/newInvoiceForm/actions';
import { RootState } from '../../../../store/rootReducer';

type CurrenciesStepProps = HTMLAttributes<HTMLFormElement> & {
  onCurrenciesSubmit: () => void;
};

export const CurrenciesStep: React.FC<CurrenciesStepProps> = ({
  className,
  onCurrenciesSubmit,
  ...props
}) => {
  const dispatch = useDispatch();
  const availableCurrencies = useCurrenciesList();
  const currentChain = useCurrentChain();

  const {
    isNativeCurrencyEnabled: isNativeEnabled,
    currencies: enabledCurrencies,
  } = useSelector<RootState, NewInvoiceFormState>(
    (state) => state.newInvoiceForm,
  );

  const isActive = useCallback(
    (code: CurrencyCode) => enabledCurrencies.includes(code),
    [enabledCurrencies],
  );

  const switchNativeCurrency = useCallback(() => {
    dispatch(newInvoiceUpdate({ isNativeCurrencyEnabled: !isNativeEnabled }));
  }, [isNativeEnabled, dispatch]);

  const switchCurrency = useCallback(
    (code: CurrencyCode) => {
      let newCurrencies: CurrencyCode[] = [];
      if (isActive(code)) {
        newCurrencies = enabledCurrencies.filter((c) => c !== code);
      } else {
        newCurrencies = [...enabledCurrencies, code];
      }
      dispatch(newInvoiceUpdate({ currencies: newCurrencies }));
    },
    [enabledCurrencies, isActive, dispatch],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      onCurrenciesSubmit();
      return true;
    },
    [onCurrenciesSubmit],
  );

  return (
    <form
      {...props}
      className={classNames(style.CurrenciesStep, className)}
      onSubmit={onSubmit}
    >
      <Typography variant="h1">What currencies do you prefer?</Typography>
      <Box mt={2} display="flex" flexWrap="wrap">
        <CurrencyButton
          mb={2}
          onClick={switchNativeCurrency}
          active={isNativeEnabled}
          name={currentChain.nativeCurrency?.name || 'MATIC'}
        />
        {availableCurrencies.map((currency) => (
          <CurrencyButton
            onClick={() => switchCurrency(currency.code)}
            active={isActive(currency.code)}
            key={currency.code}
            name={currency.code}
          />
        ))}
      </Box>
      <Box mt={2}>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </Box>
    </form>
  );
};
