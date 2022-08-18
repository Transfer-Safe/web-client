import { getEthersProvider } from '../../config';

export const loadTransaction = async (
  transactionId: string,
  chainId: number,
) => {
  const provider = getEthersProvider(chainId);
  const transaction = await provider.getTransaction(transactionId);
  return transaction;
};
