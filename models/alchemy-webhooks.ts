export interface AlchemyAcitivty {
  fromAddress: string;
  toAddress: string;
  blockNum: string;
  hash: string;
  value: number;
  typeTraceAddress: string;
  asset: string;
  category: string;
  rawContract: {
    rawValue: string;
    decimals: number;
  };
}
export interface AlchemyTransactionWebhookBody {
  webhookId: string;
  id: string;
  createdAt: string;
  type: 'ADDRESS_ACTIVITY';
  event: {
    network: string;
    activity: AlchemyAcitivty[];
  };
}
