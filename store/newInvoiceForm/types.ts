export enum NewInvoiceFormStep {
  amount,
  reference,
  notifications,
  currency,
  create,
}

export interface NewInvoiceFormState {
  step: NewInvoiceFormStep;
}
