import { SS58String, Enum, AccountId, Binary } from "polkadot-api";
import {
  XcmV3Junctions,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetFungibility,
  XcmV3WeightLimit,
  XcmV3Junction,
} from "@polkadot-api/descriptors"

import { paseoRelayChainApi } from "./relay-chain";
import { PASEO_PEOPLE_CHAIN_ID, paseoPeopleChainApi } from "./people-chain";
import { paseoAssetHubChainApi } from "./asset-hub-chain";
const encodeAccount = AccountId().enc;

const getReceiver = (address: SS58String) =>
  Enum("V3", {
    parents: 0,
    interior: XcmV3Junctions.X1(
      XcmV3Junction.AccountId32({
        network: undefined,
        id: Binary.fromBytes(encodeAccount(address)),
      }),
    ),
  })

const getAsset = (amount: bigint, parents: 1 | 0) =>
  Enum("V3", [{
    id: XcmV3MultiassetAssetId.Concrete({
      parents,
      interior: XcmV3Junctions.Here(),
    }),
    fun: XcmV3MultiassetFungibility.Fungible(amount),
  }])


export const reserveTransferToParachain = (
  address: SS58String,
  amount: bigint,
): any => {
  // TODO: Implement a logic to reserve transfer to parachain

  paseoAssetHubChainApi.tx.PolkadotXcm.limited_reserve_transfer_assets({
    dest: Enum("V3", {
      parents: 0,
      interior: XcmV3Junctions.X1(XcmV3Junction.Parachain(PASEO_PEOPLE_CHAIN_ID)),
    }),
    beneficiary: getReceiver(address),
    assets: getAsset(amount, 0),
    fee_asset_item: 0,
    weight_limit: XcmV3WeightLimit.Unlimited(),
  });

};

export const teleportToParaChain = (address: SS58String, amount: bigint) => {
  // TODO: Implement a logic to teleport to parachain
  paseoRelayChainApi.tx.XcmPallet.limited_teleport_assets({
    dest: Enum("V3", {
      parents: 0,
      interior: XcmV3Junctions.X1(
        XcmV3Junction.Parachain(PASEO_PEOPLE_CHAIN_ID)
      ),
    }),
    beneficiary: getReceiver(address),
    assets: getAsset(amount, 0),
    fee_asset_item: 0,
    weight_limit: XcmV3WeightLimit.Unlimited(),
  });
};

export const teleportToRelayChain = (
  address: SS58String,
  amount: bigint,
): any => {
  // TODO: Implement a logic to teleport to relaychain

  paseoPeopleChainApi.tx.PolkadotXcm.limited_teleport_assets({
    dest: Enum("V3", {
      parents: 1,
      interior: XcmV3Junctions.Here(),
    }),
    beneficiary: getReceiver(address),
    assets: getAsset(amount, 1),
    fee_asset_item: 0,
    weight_limit: XcmV3WeightLimit.Unlimited(),
  });

};
