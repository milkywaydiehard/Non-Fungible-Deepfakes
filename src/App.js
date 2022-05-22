// import { VStack, useDisclosure, Button, HStack } from "@chakra-ui/react";

import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import Unity, { UnityContext } from "react-unity-webgl";
import { useState } from "react";

const unityContext = new UnityContext({
  loaderUrl: "unity/myunityapp.loader.js",
  dataUrl: "unity/myunityapp.data",
  frameworkUrl: "unity/myunityapp.framework.js",
  codeUrl: "unity/myunityapp.wasm"
});

function callUnityFn(account) {
  console.log(account);
  // unityContext.send("ConnectToWalletCallback", "callUnityFn", 100);
  unityContext.send("Web3Controller", "ConnectToWalletCallback", account);
}

export default function Home() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const { account, deactivate, active } = useWeb3React();

  const getPublicKey = () => {
    if (account) {
      // alert(`called ConnectToWalletCallback(${account})`);
      callUnityFn(account);
    }
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <>
      {!active ? (
        <button onClick={onOpen}>Connect Wallet</button>
      ) : (
        <button onClick={disconnect}>Disconnect</button>
      )}
      <br />
      {active && (
        <button onClick={getPublicKey}>Get Coinbase Wallet Public Key</button>
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}
