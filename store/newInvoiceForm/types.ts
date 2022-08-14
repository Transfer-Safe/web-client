import { CurrencyCode } from '../../models';

export enum NewInvoiceFormStep {
  amount,
  reference,
  notifications,
  currency,
  create,
}

export interface NewInvoiceFormState {
  step: NewInvoiceFormStep;
  email?: string;
  reference?: string;
  amount: number;
  isNativeCurrencyEnabled: boolean;
  currencies: CurrencyCode[];
}
