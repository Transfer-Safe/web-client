export enum ConfirmInvoiceStatus {
  IDLE = 'idle',
  SIGNING = 'signing',
  CONFIRMING = 'confirming',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface ConfirmInvoiceState {
  status: ConfirmInvoiceStatus;
  error: string | null;
  txid?: string;
}
