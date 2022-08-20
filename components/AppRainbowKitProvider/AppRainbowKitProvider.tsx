import { useTheme } from '@mui/material';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitProviderProps } from '@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitProvider';
import { chain } from 'wagmi';

import { chains } from '../../config';

type AppRainbowKitProviderProps = Omit<
  RainbowKitProviderProps,
  'chains' | 'theme' | 'initialChain'
>;

const AppRainbowKitProvider: React.FC<AppRainbowKitProviderProps> = (props) => {
  const theme = useTheme();

  return (
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({
        accentColor: theme.palette.primary.main,
        borderRadius: 'small',
      })}
      // TODO: proper chain
      initialChain={chain.polygonMumbai}
      {...props}
    />
  );
};

export default AppRainbowKitProvider;
