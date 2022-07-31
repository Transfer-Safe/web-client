import { useEthers } from '@usedapp/core';
import React, { useCallback } from 'react';

import Button from './Button';

export const SignIn: React.FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const onActivate = useCallback(async () => {
    activateBrowserWallet();
  }, [activateBrowserWallet]);

  const onDeactivate = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return (
    <div>
      {!account && <Button onClick={onActivate}>Activate</Button>}
      {account && (
        <div>
          <Button onClick={onDeactivate}>Sign out</Button>
        </div>
      )}
    </div>
  );
};
