import { useCurrentChain } from '.';

export const useLinkToTransaction = (txId?: string) => {
  const currentChain = useCurrentChain();
  if (!txId) {
    return;
  }
  return currentChain.blockExplorers?.default?.url + txId;
};
