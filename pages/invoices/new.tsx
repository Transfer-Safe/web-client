import { NextPage } from 'next';

import style from './new.module.scss';

import Header from '../../components/Header';
import InvoiceForm from '../../components/InvoiceForm';

const NewInvoice: NextPage = () => {
  // const createInvoice = useCreateInvoice();
  // const isLoading = useMemo(
  //   () => ['PendingSignature', 'Mining'].includes(createInvoice.state.status),
  //   [createInvoice.state.status],
  // );

  // const onCreate = useCallback(
  //   async (invoice: Invoice) => {
  //     await createInvoice.create(invoice);
  //   },
  //   [createInvoice],
  // );

  return (
    <div className={style.NewInvoicePage}>
      <Header />
      <InvoiceForm
        className={style.container}
        loading={false}
        onSubmitInvoice={() => undefined}
      />
    </div>
  );
};

export default NewInvoice;
