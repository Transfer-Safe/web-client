import Image from 'next/image';
import { useMemo } from 'react';

import darkLogo from './logo_dark.svg';
import lightLogo from './logo_light.svg';
import evmosLogo from './logo_evmos.svg';

import { useCurrentChain } from '../../hooks';

interface Logo {
  light: any;
  dark: any;
}

const LOGOS = {
  EVMOS: {
    light: evmosLogo,
    dark: evmosLogo,
  },
  POLYGON: {
    light: lightLogo,
    dark: darkLogo,
  },
};

export interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number;
}

export const ORIGINAL_LOGO_PROPORTION = 323 / 79;

const Logo: React.FC<LogoProps> = ({ theme = 'dark', width = 200 }) => {
  const currentChain = useCurrentChain();
  const height = width / ORIGINAL_LOGO_PROPORTION;
  const logo = useMemo(() => {
    switch (currentChain.id) {
      case 9000:
        return LOGOS.EVMOS;
      default:
        return LOGOS.POLYGON;
    }
  }, [currentChain.id]);

  return (
    <Image
      width={width}
      height={height}
      alt="transfer safe logo"
      src={theme === 'dark' ? logo.dark : logo.light}
    />
  );
};

export default Logo;
