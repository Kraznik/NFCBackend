const { Contract, Wallet, providers } = require("ethers");
const config = require("../../config");
const ABI = require("./build/DG_ABI.json");

const contractAddress = config.contractAddress;

const rpc = new providers.JsonRpcProvider(config.alchemyUrl);

const wallet = new Wallet(config.privateKey.nfcCreator, rpc);

const Diamond = new Contract(contractAddress, ABI, wallet);

// const createWallet = (privateKey) => {
//   return new Wallet(privateKey, rpc);
// };

// const useDiamond = (wallet) => {
//   return new Contract(contractAddress, ABI, wallet);
// };

module.exports = { Diamond, wallet };
