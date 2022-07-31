import { NextPage } from 'next';
import { useCallback, useMemo } from 'react';

import style from './new.module.scss';

import Header from '../../components/Header';
import InvoiceForm from '../../components/InvoiceForm';
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
    <div className={style.NewInvoicePage}>
      <Header />
      <InvoiceForm
        className={style.container}
        loading={isLoading}
        onSubmitInvoice={onCreate}
      />
    </div>
  );
};

export default NewInvoice;
