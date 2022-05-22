import { VStack, useDisclosure, Button, HStack } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "unity/myunityapp.loader.js",
  dataUrl: "unity/myunityapp.data",
  frameworkUrl: "unity/myunityapp.framework.js",
  codeUrl: "unity/myunityapp.wasm"
});

function callUnityFn(account) {
  // unityContext.send("ConnectToWalletCallback", "callUnityFn", 100);
  unityContext.send("Web3Controller", "ConnectToWalletCallback", account);
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <HStack marginBottom="10px"></HStack>
        <HStack>
          {!active ? (
            <Button onClick={onOpen}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </HStack>

        {active && (
          <HStack>
            <Button onClick={getPublicKey}>
              Get Coinbase Wallet Public Key
            </Button>
          </HStack>
        )}
      </VStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}
