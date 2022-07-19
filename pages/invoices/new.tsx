import { Container, Spacer, Text } from '@nextui-org/react';
import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';
import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';

import style from './new.module.scss';

import InvoiceForm from '../../components/InvoiceForm';
import { SignIn } from '../../components/signin';
import { useCreateInvoice } from '../../hooks';

const NewInvoice: NextPage = () => {
  const createInvoice = useCreateInvoice();

  const onCreate = useCallback(
    async (invoice: InvoiceStruct) => {
      await createInvoice.send(invoice);
    },
    [createInvoice],
  );

  useEffect(() => {
    console.log('Create invoice state', createInvoice.state);
  }, [createInvoice.state]);

  return (
    <Container xs className={style.NewInvoicePage}>
      <Text h2>New invoice</Text>
      <Spacer />
      <SignIn />
      <Spacer />
      <InvoiceForm onSubmit={onCreate} />
    </Container>
  );
};

export default NewInvoice;
