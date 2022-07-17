import { Config, Mainnet } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export const DAPP_CONFIG: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
        [Mainnet.chainId]: getDefaultProvider('mainnet'),
    }
};