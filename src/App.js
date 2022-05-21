import { VStack, useDisclosure, Button, HStack } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, deactivate, active } = useWeb3React();

  const getPublicKey = () => {
    if (account) {
      alert(`called ConnectToWalletCallback(${account})`);
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
