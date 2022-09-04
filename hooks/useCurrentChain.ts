import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';

import { useChains } from './useChains';

import { changeChain } from '../store/features/settings';
import { RootState } from '../store/rootReducer';

export const useCurrentChain = (): Chain => {
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();

  const chains = useChains();

  const currentChainId = useSelector<RootState, number>(
    (state) => state.settings.chainId,
  );

  const chain = useMemo(() => {
    let lookupChain = chains.find((c) => c.id === currentChainId);

    if (!lookupChain) {
      lookupChain = chains[0];
    }
    return lookupChain;
  }, [currentChainId, chains]);

  const { chain: connectedChain } = useNetwork();

  useEffect(() => {
    if (connectedChain?.id) {
      if (!chains.find((c) => c.id === connectedChain.id)) {
        switchNetwork?.(currentChainId);
        return;
      }
      if (connectedChain.id !== currentChainId) {
        dispatch(changeChain(connectedChain.id));
      }
    }
  }, [connectedChain?.id, currentChainId, dispatch, switchNetwork]);

  return chain;
};
