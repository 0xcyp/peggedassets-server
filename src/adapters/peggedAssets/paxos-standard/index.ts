const chainContracts = {
  ethereum: {
    issued: ["0x8E870D67F660D95d5be530380D0eC0bd388289E1"],
  },
  bsc: {
    bridgedFromETH: ["0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F"],
  },
};
import { addChainExports } from "../helper/getSupply";
const adapter = addChainExports(chainContracts);
export default adapter;
