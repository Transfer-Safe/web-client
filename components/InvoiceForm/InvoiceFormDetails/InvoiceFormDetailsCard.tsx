import { Box, Button, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ReactNode } from 'react';

import style from './InvoiceFormDetailsCard.module.scss';

import { theme } from '../../../config';

interface InvoiceFormDetailsCardProps {
  title: string;
  onEdit: () => void;
  children?: ReactNode | string;
  placeholder?: string;
  active: boolean;
  visible: boolean;
}

const InvoiceFormDetailsCard: React.FC<InvoiceFormDetailsCardProps> = ({
  children,
  title,
  placeholder,
  onEdit,
  active,
  visible,
}) => {
  const content = useMemo(() => {
    if (!children) {
      return (
        <Typography variant="subtitle2" color={theme.palette.disabled.main}>
          {placeholder}
        </Typography>
      );
    }
    if (typeof children === 'string') {
      return <Typography variant="subtitle2">{children}</Typography>;
    }
    return children;
  }, [children, placeholder]);
  return (
    <Box
      className={style.InvoiceFormDetailsCard}
      sx={{
        opacity: visible ? 1 : 0.25,
      }}
    >
      <div className={style.content}>
        <Box display="flex" alignItems="center">
          <Box flex={1}>
            <Typography variant="h3">{title}</Typography>
          </Box>
          <Button variant="text" size="small" onClick={onEdit}>
            Edit
          </Button>
        </Box>
        <Box
          height="1px"
          bgcolor={active ? theme.palette.primary.main : '#eee'}
        />
        <Box mt={2}>{content}</Box>
      </div>
    </Box>
  );
};

export default InvoiceFormDetailsCard;
