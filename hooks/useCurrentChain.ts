import { useSelector } from 'react-redux';
import { Chain } from 'wagmi';

import { chains } from '../config';
import { RootState } from '../store/rootReducer';

export const useCurrentChain = (): Chain => {
  const currentChainId = useSelector<RootState, number>(
    (state) => state.settings.chainId,
  );
  const chain = chains.find((c) => c.id === currentChainId);
  if (!chain) {
    throw new Error(`Chain with id ${currentChainId} not found`);
  }
  return chain;
};
