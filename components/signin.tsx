import { Button } from '@nextui-org/react';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import React, { useCallback } from 'react';

export const SignIn: React.FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

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
          <p>{account}</p>
          <p>{etherBalance && utils.formatEther(etherBalance)} ETH</p>
          <Button onClick={onDeactivate}>Sign out</Button>
        </div>
      )}
    </div>
  );
};
