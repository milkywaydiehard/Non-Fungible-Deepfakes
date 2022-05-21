import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
  rpcUrl:
    "https://matic-mumbai--rpc.datahub.figment.io/apikey/b6cb15f624a2a2f329af7e72c31ddacf",
  // bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  // url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  url:
    "https://matic-mumbai--rpc.datahub.figment.io/apikey/b6cb15f624a2a2f329af7e72c31ddacf",
  appName: "web3-react-demo"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
