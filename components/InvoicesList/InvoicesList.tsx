import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useAccount } from 'wagmi';

import assert from 'assert';

import InvoiceListItem from './InvoiceListItem';
import InvoiceListItemSkeleton from './InvoiceListItemSkeleton';

import { useInvoicesList } from '../../hooks/router/useInvoicesList';
import Button from '../Button';

export const InvoicesList: React.FC = () => {
  const account = useAccount();
  assert(account.address, 'Not connected');

  const invoices = useInvoicesList(account.address, 100, 0, { watch: true });

  const isLoading = useMemo(() => {
    if (invoices.isLoading) {
      return true;
    }
    if (!invoices.data && !invoices.error) {
      return true;
    }
    return false;
  }, [invoices.isLoading, invoices.data, invoices.error]);

  return (
    <Box>
      {isLoading && (
        <Box mt={2}>
          <InvoiceListItemSkeleton />
          <InvoiceListItemSkeleton />
        </Box>
      )}
      {invoices.data?.length ? (
        <Box mt={2}>
          {invoices.data.map((invoice) => (
            <InvoiceListItem
              sx={{ mt: 4 }}
              invoice={invoice}
              key={invoice.id}
            />
          ))}
        </Box>
      ) : undefined}
      {invoices.data?.length === 0 && (
        <Box mt={2}>
          <Button variant="outlined" href="/invoices/new">
            Create your first invoice
          </Button>
        </Box>
      )}
    </Box>
  );
};
