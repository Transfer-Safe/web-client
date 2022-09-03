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

  const parsedLogs = logs
    .map((event) => {
      try {
        return {
          description: router.parseLog(event),
          event,
        };
      } catch (err) {
        return;
      }
    })
    .filter(Boolean) as {
    description: LogDescription;
    event: typeof logs[0];
  }[];

  await Promise.all(
    parsedLogs.map((event) => handleEvent(event.description, chainId, txId)),
  );
};

const handleEvent = async (
  event: LogDescription,
  chainId: number,
  txId: string,
) => {
  console.log('===> handleEvent', event.name, event);
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
