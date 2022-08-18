export interface AlchemyTransactionWebhookBody {
  webhookId: string;
  id: string;
  createdAt: string;
  type: 'MINED_TRANSACTION';
  event: {
    appId: string;
    network: string;
    transaction: {
      hash: string;
      accessList: string[];
      blockHash: string;
      blockNumber: string;
      chainId: string;
      from: string;
      gas: string;
      gasPrice: string;
      input: string;
      maxFeePerGas: string;
      maxPriorityFeePerGas: string;
      nonce: string;
      r: string;
      s: string;
      to: string;
      transactionIndex: string;
      type: string;
      v: string;
      value: string;
    };
  };
}
