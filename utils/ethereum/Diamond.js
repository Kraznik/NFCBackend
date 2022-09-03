const { Contract, Wallet, providers } = require("ethers");
const config = require("../../config");
const ABI = require("./build/DG_ABI.json");

const contractAddress = config.contractAddress;

const rpc = new providers.JsonRpcProvider(config.alchemyUrl);

const wallet1 = new Wallet(config.privateKey.ethBcnMoments, rpc);
const wallet2 = new Wallet(config.privateKey.dgMoments, rpc);
const wallet3 = new Wallet(config.privateKey.creator, rpc);

const Diamond1 = new Contract(contractAddress, ABI, wallet1);
const Diamond2 = new Contract(contractAddress, ABI, wallet2);
const Diamond3 = new Contract(contractAddress, ABI, wallet3);

module.exports = { Diamond1, wallet1, Diamond2, wallet2, Diamond3, wallet3 };
