import { Box, Button, Typography } from '@mui/material';

interface CurrencyButtonProps {
  name: string;
  active?: boolean;
  onClick: () => void;
}

export const CurrencyButton: React.FC<CurrencyButtonProps> = ({
  name,
  active = false,
  onClick,
}) => {
  return (
    <Box mr={2}>
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
