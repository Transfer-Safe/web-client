import { chains } from '../config';

export const linkToTransaction = (
  txId: string,
  chainId: number,
): string | undefined => {
  const chain = chains.find((c) => c.id === chainId);
  if (!txId || !chain) {
    return;
  }
  return chain.blockExplorers?.default?.url + '/tx/' + txId;
};

export function linkToAddress(
  address: string,
  chainId: number,
): string | undefined {
  const chain = chains.find((c) => c.id === chainId);
  if (!address || !chain) {
    return;
  }
  return chain.blockExplorers?.default?.url + '/address/' + address;
}
