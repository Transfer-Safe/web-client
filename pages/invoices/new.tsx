import { Container, Spacer, Text } from '@nextui-org/react';
import { NextPage } from 'next';

import style from './new.module.scss';

import InvoiceForm from '../../components/InvoiceForm';

const NewInvoice: NextPage = () => {
  return (
    <Container xs className={style.NewInvoicePage}>
      <Text h2>New invoice</Text>
      <Spacer />
      <InvoiceForm />
    </Container>
  );
};

export default NewInvoice;
