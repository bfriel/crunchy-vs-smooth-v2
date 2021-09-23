import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
} from "@solana/wallet-adapter-wallets";
import { SnackbarProvider, useSnackbar } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

import Main from "./Main";
import { useCallback } from "react";

const localnet = "http://127.0.0.1:8899";
const wallets = [getPhantomWallet()];

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: deepPurple[700],
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

function RoutesWithWalletProvider() {
  const { enqueueSnackbar } = useSnackbar();

  const onWalletError = useCallback(
    (error) => {
      enqueueSnackbar(
        error.message ? `${error.name}: ${error.message}` : error.name,
        { variant: "error" }
      );
      console.error(error);
    },
    [enqueueSnackbar]
  );
  return (
    <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
      <WalletDialogProvider>
        <Main />
      </WalletDialogProvider>
    </WalletProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConnectionProvider endpoint={localnet}>
          {/* <RoutesWithWalletProvider /> */}
          <WalletProvider wallets={wallets} autoConnect>
            <WalletDialogProvider>
              <Main />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
