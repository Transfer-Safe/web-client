import { MenuItem, Select } from '@mui/material';

const currencies = ['ETH'];

export interface CurrencySelectorProps {
  currency: string;
  onChange?: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
}) => {
  return (
    <Select label="Select currency" value={currency}>
      {currencies.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};
