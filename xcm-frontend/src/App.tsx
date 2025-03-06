import "./App.css";
import { TransferrableBalance } from "./TransferrableBalance";
import { BlockNumbers } from "./BlockNumbers";
import { ChainProvider, MainProvider } from "./context";
import { Teleport } from "./Teleport";
import {
  paseoAssetHubChainApi,
  paraChain,
  relayChain,
  paseoRelayChainApi,
  paseoRelayChainApi as paseoPeopleChainApi,
} from "./api";
import { ReserveTransfer } from "./ReserveTransfer";

function App() {
  return (
    <MainProvider>
      <ChainProvider value={{ client: relayChain, api: paseoRelayChainApi }}>
        <h3>From: Paseo Relay Chain</h3> <BlockNumbers />
        <TransferrableBalance />
      </ChainProvider>
      <Teleport />
      <ChainProvider value={{ client: paraChain, api: paseoAssetHubChainApi }}>
        <h3>To:Paseo AssetHub</h3> <BlockNumbers />
        <TransferrableBalance />
      </ChainProvider>
      <ReserveTransfer />
      <ChainProvider value={{ client: relayChain, api: paseoPeopleChainApi }}>
        <h3>From: Paseo People Chain</h3> <BlockNumbers />
        <TransferrableBalance />
      </ChainProvider>
    </MainProvider>
  );
}

export default App;
