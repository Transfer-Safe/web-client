import Image from 'next/image';
import { useMemo } from 'react';

import darkLogo from './logo_dark.svg';
import lightLogo from './logo_light.svg';

export interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number;
}

export const ORIGINAL_LOGO_PROPORTION = 323 / 79;

const Logo: React.FC<LogoProps> = ({ theme = 'dark', width = 200 }) => {
  const height = width / ORIGINAL_LOGO_PROPORTION;
  const logo = useMemo(() => {
    switch (theme) {
      case 'light':
        return lightLogo;
      case 'dark':
        return darkLogo;
      default:
        return darkLogo;
    }
  }, [theme]);

  return (
    <Image width={width} height={height} alt="transfer safe logo" src={logo} />
  );
};

export default Logo;
