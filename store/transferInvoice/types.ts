export enum TransferInvoiceStatus {
  IDLE = 'idle',
  SIGNING = 'signing',
  TRANSFERRING = 'transferring',
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum TransferInvoiceType {
  NATIVE = 'native_token',
  ERC20 = 'erc20_token',
}

export interface TransferInvoiceState {
  status: TransferInvoiceStatus;
  transferType?: TransferInvoiceType;
  transferError: string | null;
  txId?: string;
}
