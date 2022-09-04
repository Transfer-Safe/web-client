import { useTheme } from '@mui/material';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import { useMemo } from 'react';

import { getWagmiConfig } from '../../config';
import { useCurrentChain } from '../../hooks';

type AppRainbowKitProviderProps = Omit<
  RainbowKitProviderProps,
  'chains' | 'theme' | 'initialChain'
> & {
  hostname: string;
};

const AppRainbowKitProvider: React.FC<AppRainbowKitProviderProps> = ({
  hostname,
  ...props
}) => {
  const theme = useTheme();
  const currentChain = useCurrentChain();
  const { chains } = useMemo(() => getWagmiConfig(hostname), [hostname]);

  return (
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({
        accentColor: theme.palette.primary.main,
        borderRadius: 'small',
      })}
      // TODO: proper chain
      initialChain={currentChain}
      {...props}
    />
  );
};

export default AppRainbowKitProvider;
