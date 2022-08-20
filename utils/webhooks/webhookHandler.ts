import {
  TransferSafeRouter,
  TransferSafeRouter__factory,
} from '@transfer-safe/router';

import { handleDeposit } from './handleDeposit';
import { handleConfirm } from './handleConfirm';

import { loadTransaction } from '../ethers';

export const handleTransactionWebhook = async (
  txId: string,
  chainId: number,
) => {
  const transaction = await loadTransaction(txId, chainId);
  const router = TransferSafeRouter__factory.createInterface();
  const functionData = router.parseTransaction(transaction);

  switch (functionData.name as keyof TransferSafeRouter['functions']) {
    case 'deposit':
      return handleDeposit(chainId, txId, functionData);
    case 'confirmInvoice':
      return handleConfirm(chainId, txId, functionData);
    default:
      return;
  }
};
