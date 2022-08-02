import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './InvoiceFormDetails.module.scss';
import InvoiceFormDetailsCard from './InvoiceFormDetailsCard';

import { theme } from '../../../config';
import {
  NewInvoiceFormState,
  NewInvoiceFormStep,
} from '../../../store/newInvoiceForm';
import { newInvoiceGoToStep } from '../../../store/newInvoiceForm/actions';
import { NEW_INVOICES_STEPS_ORDER } from '../../../store/newInvoiceForm/reducer';
import { RootState } from '../../../store/rootReducer';
import CurrencyLabel from '../../CurrencyLabel';

const InvoiceFormDetails: React.FC = () => {
  const creatingInvoice = useSelector<RootState, NewInvoiceFormState>(
    (state) => state.newInvoiceForm,
  );
  const dispatch = useDispatch();

  const goToStep = useCallback(
    (step: NewInvoiceFormStep) => {
      dispatch(newInvoiceGoToStep(step));
    },
    [dispatch],
  );

  const isReached = useCallback(
    (step: NewInvoiceFormStep) => {
      const currentIndex = NEW_INVOICES_STEPS_ORDER.indexOf(
        creatingInvoice.step,
      );
      const searchedIndex = NEW_INVOICES_STEPS_ORDER.indexOf(step);
      console.log('===> isReached', {
        currentIndex,
        searchedIndex,
        step,
        currentStep: creatingInvoice.step,
      });
      return searchedIndex <= currentIndex;
    },
    [creatingInvoice.step],
  );

  return (
    <Box width={380} className={style.InvoiceFormDetails}>
      <Typography mb={4} variant="h2">
        Your invoice
      </Typography>

      <InvoiceFormDetailsCard
        title="Amount"
        placeholder="No amount specified"
        active={creatingInvoice.step === NewInvoiceFormStep.amount}
        onEdit={() => goToStep(NewInvoiceFormStep.amount)}
        visible={isReached(NewInvoiceFormStep.amount)}
      >
        <Typography variant="subtitle1" component="span">
          {creatingInvoice.amount} $
        </Typography>
        <Typography color={theme.palette.disabled.main} variant="caption">
          {' '}
          1$ fee
        </Typography>
      </InvoiceFormDetailsCard>
      <Box mt={1} />
      <InvoiceFormDetailsCard
        title="Reference"
        placeholder="No reference given"
        active={creatingInvoice.step === NewInvoiceFormStep.reference}
        onEdit={() => goToStep(NewInvoiceFormStep.reference)}
        visible={isReached(NewInvoiceFormStep.reference)}
      >
        {creatingInvoice.reference}
      </InvoiceFormDetailsCard>
      <Box mt={1} />
      <InvoiceFormDetailsCard
        title="Email notifications"
        placeholder="Disabled"
        active={creatingInvoice.step === NewInvoiceFormStep.notifications}
        onEdit={() => goToStep(NewInvoiceFormStep.notifications)}
        visible={isReached(NewInvoiceFormStep.notifications)}
      >
        {creatingInvoice.email}
      </InvoiceFormDetailsCard>
      <Box mt={1} />
      <InvoiceFormDetailsCard
        title="Currencies"
        placeholder="No currencies selected"
        active={creatingInvoice.step === NewInvoiceFormStep.currency}
        onEdit={() => goToStep(NewInvoiceFormStep.currency)}
        visible={isReached(NewInvoiceFormStep.currency)}
      >
        {creatingInvoice.isNativeCurrencyEnabled ||
        creatingInvoice.currencies.length ? (
          <React.Fragment>
            {creatingInvoice.isNativeCurrencyEnabled && (
              <CurrencyLabel nativeCurrency />
            )}
            {creatingInvoice.currencies.map((c) => (
              <CurrencyLabel key={c.toString()} currency={c} />
            ))}
          </React.Fragment>
        ) : undefined}
      </InvoiceFormDetailsCard>
    </Box>
  );
};

export default InvoiceFormDetails;
