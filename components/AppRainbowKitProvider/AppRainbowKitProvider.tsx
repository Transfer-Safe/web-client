import { useTheme } from '@mui/material';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';

import { useChains, useCurrentChain } from '../../hooks';

type AppRainbowKitProviderProps = Omit<
  RainbowKitProviderProps,
  'chains' | 'theme' | 'initialChain'
>;

const AppRainbowKitProvider: React.FC<AppRainbowKitProviderProps> = ({
  ...props
}) => {
  const theme = useTheme();
  const currentChain = useCurrentChain();
  const chains = useChains();

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
