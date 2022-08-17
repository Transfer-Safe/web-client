import classNames from 'classnames';
import React, { HTMLAttributes, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import style from './InvoiceForm.module.scss';
import StepContainer from './StepContainer';
import {
  AmountStep,
  ReferenceStep,
  CurrenciesStep,
  NotificationsStep,
  CreateStep,
} from './steps';
import TypeStep from './steps/TypeStep';

import { Invoice } from '../../models';
import {
  NewInvoiceFormState,
  NewInvoiceFormStep,
  newInvoiceNextStep,
  newInvoiceUpdate,
} from '../../store/features/newInvoiceForm';
import { RootState } from '../../store/rootReducer';
import {
  encryptEmail,
  resetEmailEncryption,
} from '../../store/features/encryptEmail';
import { useAppDispatch } from '../../hooks';

type InvoiceFormProps = HTMLAttributes<HTMLDivElement> & {
  onSubmitInvoice?: (invoice: Invoice) => void;
  loading?: boolean;
};

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmitInvoice,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading,
  ...props
}) => {
  const { step: currentStep, email } = useSelector<
    RootState,
    NewInvoiceFormState
  >(({ newInvoiceForm }) => newInvoiceForm);
  const dispatch = useAppDispatch();

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

  const onCurrenciesSubmit = useCallback(
    () => dispatch(newInvoiceNextStep()),
    [dispatch],
  );

  const onTypeSubmit = useCallback(
    (instantTransfer: boolean) => {
      dispatch(newInvoiceUpdate({ instantTransfer }));
      dispatch(newInvoiceNextStep());
    },
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
        return <CurrenciesStep onCurrenciesSubmit={onCurrenciesSubmit} />;
      case NewInvoiceFormStep.type:
        return <TypeStep onTypeSubmit={onTypeSubmit} />;
      case NewInvoiceFormStep.create:
        return <CreateStep />;
    }
  }, [
    currentStep,
    onAmountSubmit,
    onReferenceSubmit,
    onNotificationsSubmit,
    onCurrenciesSubmit,
    onTypeSubmit,
  ]);

  useEffect(() => {
    if (email) {
      dispatch(encryptEmail(email));
    } else {
      dispatch(resetEmailEncryption());
    }
  }, [dispatch, email]);

  return (
    <div className={classNames(className, style.InvoiceForm)} {...props}>
      <div className={style.container}>
        <StepContainer withDetails>{currentStepRender}</StepContainer>
      </div>
      <div className={style.header} />
    </div>
  );
};
