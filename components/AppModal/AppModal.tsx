import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogProps,
  IconButton,
  Typography,
} from '@mui/material';
import classNames from 'classnames';

import style from './AppModal.module.scss';

import { theme } from '../../config';

type AppModalProps = DialogProps & {
  title: string;
  onClose?: () => void;
};

const AppModal: React.FC<AppModalProps> = ({
  className,
  children,
  title,
  onClose,
  ...props
}) => {
  return (
    <Dialog
      className={classNames(style.AppModal, className)}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            md: 'auto',
          },
        },
      }}
      {...props}
    >
      <Box display="flex" justifyContent="flex-end" pr={3} pt={1}>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ padding: theme.spacing(0) }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Box
        p={3}
        minWidth={{
          md: 600,
        }}
      >
        <Box>
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Box mt={2}>{children}</Box>
      </Box>
    </Dialog>
  );
};

export default AppModal;
