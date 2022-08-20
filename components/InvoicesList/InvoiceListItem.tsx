import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useCurrentChain } from '../../hooks';
import { Invoice } from '../../models';
import InvoiceStatusLabel from '../InvoiceStatusLabel';
import InvoiceTitle from '../InvoiceTitle';

type InvoiceListItemProps = CardProps & {
  invoice: Invoice;
};

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  invoice,
  ...props
}) => {
  const theme = useTheme();
  const router = useRouter();
  const chain = useCurrentChain();

  const onClick = useCallback(() => {
    router.push(`/invoices/${chain.id}/${invoice.id}`);
  }, [invoice.id, chain.id, router]);

  return (
    <Card {...props}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <InvoiceStatusLabel invoice={invoice} />
            <Typography
              ml={2}
              variant="caption"
              color={theme.palette.grey[600]}
            >
              {invoice.createdDate.toLocaleString()}
            </Typography>
          </Box>
          <InvoiceTitle variant="h2" invoice={invoice} mt={2} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InvoiceListItem;
