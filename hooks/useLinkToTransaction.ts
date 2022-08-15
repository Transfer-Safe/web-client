import { useCurrentChain } from '.';

export const useLinkToTransaction = (txId?: string) => {
  const currentChain = useCurrentChain();
  if (!txId) {
    return;
  }
  return currentChain.blockExplorers?.default?.url + '/tx/' + txId;
};

export function useLinkToAddress(address?: string) {
  const currentChain = useCurrentChain();
  if (!address) {
    return;
  }
  return currentChain.blockExplorers?.default?.url + '/address/' + address;
}
