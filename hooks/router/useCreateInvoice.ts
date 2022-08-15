import { BigNumber, utils } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContractWrite, useFeeData } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

import { CurrencyCode, Invoice } from '../../models';
import { NewInvoiceFormState } from '../../store/newInvoiceForm';
import { RootState } from '../../store/rootReducer';
import { useCurrenciesList } from '../useCurrenciesList';
import { encryptEmailClient } from '../../utils';

export const useCreateInvoice = () => {
  const newInvoice = useSelector<RootState, NewInvoiceFormState>(
    (state) => state.newInvoiceForm,
  );
  const currencies = useCurrenciesList();
  const [encryptedEmail, setEncryptedEmail] = useState<string | undefined>();

  useEffect(() => {
    if (newInvoice.email) {
      encryptEmailClient(newInvoice.email).then(setEncryptedEmail);
    }
  }, [newInvoice.email]);

  const getCurrency = useCallback(
    (code: CurrencyCode) => {
      const currency = currencies.find((currency) => currency.code === code);
      if (!currency) {
        throw new Error(`Currency ${code} not supported`);
      }
      return currency;
    },
    [currencies],
  );

  const invoice = useMemo(() => {
    return new Invoice(
      utils.parseEther(newInvoice.amount.toString()),
      newInvoice.isNativeCurrencyEnabled,
      newInvoice.currencies.map((code) => getCurrency(code).address),
      newInvoice.reference,
      undefined,
      encryptedEmail,
    );
  }, [newInvoice, encryptedEmail, getCurrency]);

  const [fee, setFee] = useState<BigNumber | undefined>();
  const feeData = useFeeData();
  const invoiceData = useMemo(() => invoice.serialize(), [invoice]);
  const {
    config,
    data,
    error: configError,
  } = useWriteRouterFunction('createInvoice', [invoiceData]);

  useEffect(() => {
    if (data?.request.gasLimit && feeData?.data?.gasPrice) {
      const gasLimit = data?.request.gasLimit;
      const gasPrice = feeData?.data?.gasPrice;
      const fee = gasLimit.mul(gasPrice);
      setFee(fee);
    }
  }, [data?.request.gasLimit, feeData?.data?.gasPrice]);

  const result = useContractWrite(config);

  return {
    ...result,
    invoice,
    error: result.error || configError,
    fee,
  };
};
