import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import { SnackbarProvider, useSnackbar } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";

import Main from "./components/Main";
import { useCallback } from "react";

const localnet = "http://127.0.0.1:8899";
const wallets = [getPhantomWallet()];

const theme = createTheme({
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: orange[300],
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
        fontWeight: 600,
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
      label: {
        color: "white",
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
        <Main localnet={localnet} />
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
              <Main localnet={localnet} />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
