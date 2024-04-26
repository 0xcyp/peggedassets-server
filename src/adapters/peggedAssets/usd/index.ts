const sdk = require("@defillama/sdk");
import { sumSingleBalance } from "../helper/generalUtil";
import {
  ChainBlocks,
  PeggedIssuanceAdapter,
  Balances,
} from "../peggedAsset.type";

type ChainContracts = {
  [chain: string]: {
    [contract: string]: string[];
  };
};

const chainContracts: ChainContracts = {
  polygon: {
    issued: ["0x236eec6359fb44cce8f97e99387aa7f8cd5cde1f"],
  },
  bsc: {
    issued: ["0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65"],
  },
  arbitrum: {
    issued: ["0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65"],
  },
  optimism: {
    issued: ["0x73cb180bf0521828d8849bc8CF2B920918e23032"],
  },
  era: {
    issued: ["0x8E86e46278518EFc1C5CEd245cBA2C7e3ef11557"],
  },
  avax: {
    issued: ["0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65"],
  },
  linea: {
    issued: ["0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376"],
  },
  base: {
    issued: ["0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376"],
  },
  blast: {
    issued: [
      "0x4fEE793d435c6D2c10C135983BB9d6D4fC7B9BBd",
      "0x870a8F46b62B8BDeda4c02530C1750CddF2ED32e",
    ],
  },
};

async function chainMinted(chain: string, decimals: number) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    for (let issued of chainContracts[chain].issued) {
      const totalSupply = (
        await sdk.api.abi.call({
          abi: "erc20:totalSupply",
          target: issued,
          block: _chainBlocks?.[chain],
          chain: chain,
        })
      ).output;
      sumSingleBalance(
        balances,
        "peggedUSD",
        totalSupply / 10 ** decimals,
        "issued",
        false
      );
    }
    return balances;
  };
}

const adapter: PeggedIssuanceAdapter = {
  polygon: {
    minted: chainMinted("polygon", 6),
  },
  bsc: {
    minted: chainMinted("bsc", 6),
  },
  arbitrum: {
    minted: chainMinted("arbitrum", 6),
  },
  optimism: {
    minted: chainMinted("optimism", 6),
  },
  era: {
    minted: chainMinted("era", 6),
  },
  avalanche: {
    minted: chainMinted("avax", 6),
  },
  linea: {
    minted: chainMinted("linea", 6),
  },
  base: {
    minted: chainMinted("base", 6),
  },
  blast: {
    minted: chainMinted("blast", 18),
  },
};

export default adapter;
