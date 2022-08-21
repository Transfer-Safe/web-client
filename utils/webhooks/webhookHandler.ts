import { TransferSafeRouter__factory } from '@transfer-safe/router';
import { LogDescription } from 'ethers/lib/utils';
import {
  InvoiceConfirmedEvent,
  InvoiceDepositedEvent,
} from '@transfer-safe/router/contracts/TransferSafeRouter';

import { handleDeposit } from './handleDeposit';
import { handleConfirm } from './handleConfirm';

import { loadTransactionReceipt } from '../ethers';
import { getRouterContractAddress } from '../../config';

export const handleTransactionWebhook = async (
  txId: string,
  chainId: number,
) => {
  const contractAddress = getRouterContractAddress(chainId);
  const router = TransferSafeRouter__factory.createInterface();
  const receipt = await loadTransactionReceipt(txId, chainId);
  const logs = receipt.logs.filter(
    (event) =>
      event.address.toLocaleLowerCase() === contractAddress.toLocaleLowerCase(),
  );

  const parsedLogs = logs.map((event) => {
    return router.parseLog(event);
  });
  for (const event of parsedLogs) {
    await handleEvent(event, chainId, txId);
  }
};

const handleEvent = async (
  event: LogDescription,
  chainId: number,
  txId: string,
) => {
  console.log('===> handleEvent', event.name);
  switch (event.name) {
    case 'InvoiceDeposited':
      return handleDeposit(
        chainId,
        txId,
        event as unknown as InvoiceDepositedEvent,
      );
    case 'InvoiceConfirmed':
      return handleConfirm(
        chainId,
        txId,
        event as unknown as InvoiceConfirmedEvent,
      );
    default:
      return;
  }
};
