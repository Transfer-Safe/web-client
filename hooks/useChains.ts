import { useEffect, useMemo, useState } from 'react';
import { Chain } from 'wagmi';

import { getWagmiConfig } from '../config';

export const useChains = (): Chain[] => {
  const [hostName, setHostname] = useState<string | undefined>();
  useEffect(() => {
    setHostname(window.location.hostname);
  }, [setHostname]);
  const { chains } = useMemo(() => getWagmiConfig(hostName), [hostName]);
  return chains;
};
