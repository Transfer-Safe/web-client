import classNames from 'classnames';
import React, { HTMLAttributes, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './InvoiceForm.module.scss';
import StepContainer from './StepContainer';
import {
  AmountStep,
  ReferenceStep,
  CurrenciesStep,
  NotificationsStep,
} from './steps';

import { Invoice } from '../../models';
import {
  NewInvoiceFormState,
  NewInvoiceFormStep,
} from '../../store/newInvoiceForm';
import { newInvoiceNextStep } from '../../store/newInvoiceForm/actions';
import { RootState } from '../../store/rootReducer';

type InvoiceFormProps = HTMLAttributes<HTMLDivElement> & {
  onSubmitInvoice?: (invoice: Invoice) => void;
  loading?: boolean;
};

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  className,
  onSubmitInvoice,
  loading,
  ...props
}) => {
  const { step: currentStep } = useSelector<RootState, NewInvoiceFormState>(
    ({ newInvoiceForm }) => newInvoiceForm,
  );
  const dispatch = useDispatch();

  const onAmountSubmit = useCallback(
    () => dispatch(newInvoiceNextStep()),
    [dispatch],
  );

  const onReferenceSubmit = useCallback(
    () => dispatch(newInvoiceNextStep()),
    [dispatch],
  );

  const onNotificationsSubmit = useCallback(
    () => dispatch(newInvoiceNextStep()),
    [dispatch],
  );

  const currentStepRender = useMemo(() => {
    switch (currentStep) {
      case NewInvoiceFormStep.amount:
        return <AmountStep onAmountSubmit={onAmountSubmit} />;
      case NewInvoiceFormStep.reference:
        return <ReferenceStep onReferenceSubmitted={onReferenceSubmit} />;
      case NewInvoiceFormStep.notifications:
        return (
          <NotificationsStep onNotificationsSubmit={onNotificationsSubmit} />
        );
      case NewInvoiceFormStep.currency:
        return <CurrenciesStep />;
    }
  }, [currentStep, onAmountSubmit, onReferenceSubmit, onNotificationsSubmit]);

  return (
    <div className={classNames(className, style.InvoiceForm)} {...props}>
      <div className={style.container}>
        <StepContainer withDetails={currentStep !== NewInvoiceFormStep.amount}>
          {currentStepRender}
        </StepContainer>
      </div>
      <div className={style.header} />
    </div>
  );
};
