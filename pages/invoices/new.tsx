import { Container, Spacer, Text } from '@nextui-org/react';
import { NextPage } from 'next';
import { useCallback, useMemo } from 'react';

import style from './new.module.scss';

import InvoiceForm from '../../components/InvoiceForm';
import { SignIn } from '../../components/signin';
import { useCreateInvoice } from '../../hooks';
import { Invoice } from '../../models';

const NewInvoice: NextPage = () => {
  const createInvoice = useCreateInvoice();
  const isLoading = useMemo(
    () => ['PendingSignature', 'Mining'].includes(createInvoice.state.status),
    [createInvoice.state.status],
  );

  const onCreate = useCallback(
    async (invoice: Invoice) => {
      await createInvoice.create(invoice);
    },
    [createInvoice],
  );

  return (
    <Container xs className={style.NewInvoicePage}>
      <Text h2>New invoice</Text>
      <Spacer />
      <SignIn />
      <Spacer />
      <InvoiceForm loading={isLoading} onSubmit={onCreate} />
    </Container>
  );
};

export default NewInvoice;
