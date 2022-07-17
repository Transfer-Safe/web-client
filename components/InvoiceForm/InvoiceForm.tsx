import { Button, Card, gray, Input, Spacer, Text } from '@nextui-org/react';
import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';

import style from './InvoiceForm.module.scss';

import { CurrencySelector } from '../CurrencySelector';

export const InvoiceForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return false;
    },
    [],
  );

  const [referenceName, setReferenceName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <Card className={style.InvoiceForm}>
      <form onSubmit={onSubmit} ref={(ref) => (formRef.current = ref)}>
        <Card.Body>
          <Input
            value={referenceName}
            onChange={(event) => setReferenceName(event.target.value)}
            className={style.input}
            size="lg"
            label="Transfer reference"
            aria-label="Transfer reference"
            placeholder="e.g. — Used iPhone"
          />
          <Text color={gray.gray700} size="0.75em">
            So the payer will know what he&apos;s transfering for
          </Text>
          <Spacer />
          <Input
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            className={style.input}
            size="lg"
            label="Your name"
            aria-label="Your name"
            placeholder="Helen"
            autoComplete="name"
          />
          <Text color={gray.gray700} size="0.75em">
            So the payer will know who&apos;s transfering
          </Text>
          <Spacer />
          <Input
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            className={style.input}
            size="lg"
            label="Your email"
            aria-label="Your email"
            placeholder="Helen"
            autoComplete="email"
            type="email"
          />
          <Text color={gray.gray700} size="0.75em">
            So we can email you when the transfer is received
          </Text>
          <Spacer />
          <Input
            type="number"
            contentLeftStyling={false}
            contentLeft={
              <div>
                <CurrencySelector currency="ETH" />
              </div>
            }
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            contentRight={
              <div>
                <Text color={gray.gray700}>100$</Text>
              </div>
            }
            label="Transfer amount"
            aria-label="Transfer amount"
            contentRightStyling={false}
          />
          <Spacer />
          <Button size="lg" type="submit" aria-label="Create invoice">
            Create
          </Button>
        </Card.Body>
      </form>
    </Card>
  );
};
