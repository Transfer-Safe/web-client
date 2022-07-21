import { Button, Spacer, Text } from '@nextui-org/react';

import styles from './Header.module.scss';

import Logo from '../Logo';

const Header: React.FC = () => {
  return (
    <div className={styles.Header}>
      <Logo />
      <Spacer y={0} x={1} />
      <Button.Group>
        <Button light auto className={styles.buttons}>
          <Text weight="medium">Request payment</Text>
        </Button>
        <Button light auto className={styles.buttons}>
          <Text weight="medium">About</Text>
        </Button>
      </Button.Group>
    </div>
  );
};

export default Header;
