import { TransferSafeRouter__factory } from '@transfer-safe/router';

import { getEthersProvider, getRouterContractAddress } from '../../config';
import { Invoice } from '../../models';

export const loadInvoice = async (
  invoiceId: string,
  chainId: number,
): Promise<Invoice> => {
  const provider = getEthersProvider(chainId);
  const address = getRouterContractAddress(chainId);
  const routerContract = TransferSafeRouter__factory.connect(address, provider);
  const invoiceData = await routerContract.getInvoice(invoiceId);
  return Invoice.deserialize(invoiceData);
};
