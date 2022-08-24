import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chain, useNetwork } from 'wagmi';

import { chains } from '../config';
import { changeChain } from '../store/features/settings';
import { RootState } from '../store/rootReducer';

export const useCurrentChain = (): Chain => {
  const dispatch = useDispatch();
  const currentChainId = useSelector<RootState, number>(
    (state) => state.settings.chainId,
  );
  const chain = chains.find((c) => c.id === currentChainId);
  if (!chain) {
    throw new Error(`Chain with id ${currentChainId} not found`);
  }

  const { chain: connectedChain } = useNetwork();

  useEffect(() => {
    if (connectedChain?.id) {
      if (connectedChain.id !== currentChainId) {
        dispatch(changeChain(connectedChain.id));
      }
    }
  }, [connectedChain?.id, currentChainId, dispatch]);

  return chain;
};
