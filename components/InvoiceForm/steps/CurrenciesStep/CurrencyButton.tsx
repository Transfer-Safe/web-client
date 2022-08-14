import { Box, Button, Typography } from '@mui/material';
import { BoxProps } from '@mui/system';

type CurrencyButtonProps = BoxProps & {
  name: string;
  active?: boolean;
  onClick: () => void;
};

export const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  name,
  active = false,
  onClick,
  ...props
}) => {
  return (
    <Box mr={2} {...props}>
      <Button
        onClick={onClick}
        variant="outlined"
        color={active ? 'primary' : 'disabled'}
      >
        <Box height={110} width={180}>
          <Typography fontWeight="500" align="left">
            {name}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};
