import { TransferSafeRouter__factory } from '@transfer-safe/router';

import { handleDeposit } from './handleDeposit';

import { loadTransaction } from '../ethers';

export const handleTransactionWebhook = async (
  txId: string,
  chainId: number,
) => {
  const transaction = await loadTransaction(txId, chainId);
  const router = TransferSafeRouter__factory.createInterface();
  const functionData = router.parseTransaction(transaction);

  switch (functionData.name) {
    case 'deposit':
      return handleDeposit(chainId, txId, functionData);
    default:
      return;
  }
};
