export interface AccountState {
  networkType: string;
}

export const CHANGE_NETWORK_TYPE = 'CHANGE_NETWORK_TYPE';

export type ChangeNetworkTypeAction = (networkType: string) => {
  type: typeof CHANGE_NETWORK_TYPE;
};
