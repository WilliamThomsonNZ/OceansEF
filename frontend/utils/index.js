import { providers } from "ethers";
import Web3Modal from "web3modal";

export async function getProviderOrSigner(needSigner = false) {
  const web3modal = new Web3Modal({
    network: "rinkeby",
    providerOptions: {},
    disableInjectedProvider: false,
  });
  const provider = await web3modal.connect();
  const web3Provider = new providers.Web3Provider(provider);
  const { chainId } = await web3Provider.getNetwork();
  if (chainId != 4) {
    window.alert("Change the network to rinkeby");
    throw new Error("Change network to rinkeby");
  }
  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
}

export function readifyAddress(addr) {
  const readableAddr = `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  return readableAddr;
}
