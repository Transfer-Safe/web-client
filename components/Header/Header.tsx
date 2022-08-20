import {
  ConnectButton,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useMemo, useState } from 'react';
import { chain, useAccount } from 'wagmi';

import styles from './Header.module.scss';

import Logo from '../Logo';
import { chains } from '../../config';

interface MenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactElement;
  requireAuth: boolean;
}

const menuItems: MenuItem[] = [
  {
    label: 'Create invoice',
    href: '/invoices/new',
    requireAuth: false,
  },
  {
    label: 'My invoices',
    href: '/invoices/',
    requireAuth: true,
  },
];

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onClose = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);
  const onOpen = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
  const theme = useTheme();
  const account = useAccount();

  const visibleMenuItems = useMemo(
    () => menuItems.filter((item) => account.isConnected || !item.requireAuth),
    [account.isConnected],
  );

  return (
    <AppBar
      color="transparent"
      className={styles.Header}
      position="static"
      sx={{
        paddingY: (theme) => ({
          xs: theme.spacing(3),
          md: theme.spacing(6),
        }),
      }}
    >
      <Drawer anchor="right" open={sidebarOpen} onClose={onClose}>
        <Box
          py={4}
          px={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Box my={1}>
              <Logo width={160} />
            </Box>
            <Box mt={1} />
            <List>
              {visibleMenuItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton>
                    {item.icon && (
                      <ListItemIcon sx={{ minWidth: 'inherit', mr: 1 }}>
                        {item.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText>{item.label}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <RainbowKitProvider
              chains={chains}
              theme={lightTheme({
                accentColor: theme.palette.primary.main,
                borderRadius: 'small',
              })}
              // TODO: proper chain
              initialChain={chain.polygonMumbai}
            >
              <ConnectButton />
            </RainbowKitProvider>
          </Box>
        </Box>
      </Drawer>
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Logo />
            <Box
              display={{
                xs: 'none',
                md: 'inherit',
              }}
            >
              {visibleMenuItems.map((menu) => (
                <Button
                  sx={{ ml: 2 }}
                  key={menu.label}
                  href={menu.href}
                  onClick={menu.onClick}
                >
                  {menu.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            display={{
              xs: 'none',
              md: 'flex',
            }}
          >
            <ConnectButton accountStatus="address" />
          </Box>
          <Box
            display={{
              xs: 'flex',
              md: 'none',
            }}
          >
            <IconButton onClick={onOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
