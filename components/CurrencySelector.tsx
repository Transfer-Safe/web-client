import { Dropdown } from '@nextui-org/react';

const currencies = ['ETH'];

export interface CurrencySelectorProps {
  currency: string;
  onChange?: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
}) => {
  return (
    <Dropdown>
      <Dropdown.Button light>{currency}</Dropdown.Button>
      <Dropdown.Menu>
        {currencies.map((item) => (
          <Dropdown.Item key={item}>{item}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
