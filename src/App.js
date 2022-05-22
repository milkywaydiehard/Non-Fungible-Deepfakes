import { VStack, useDisclosure, Button, HStack } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "unity/unity.loader.js",
  dataUrl: "unity/unity.data",
  frameworkUrl: "unity/unity.framework.js",
  codeUrl: "unity/unity.wasm",
});

function callUnityFn(account) {
  // unityContext.send("ConnectToWalletCallback", "callUnityFn", 100);
  unityContext.send("Web3Controller", "ConnectToWalletCallback", account);
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, deactivate, active } = useWeb3React();


  unityContext.on("ConnectToWallet", (objectName, callback) => {
    console.log("UNITY: ConnectToWallet")
    console.log("objectName: " + objectName + " -- callback: " + callback);
    // loginHandler();
    onOpen();
  });

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

        {!active && (
          <HStack>

            <Unity
                unityContext={unityContext}
                style={{
                height: 700,
                width: 1280,
                border: "2px solid black",
                background: "grey",
                }}
            />

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
