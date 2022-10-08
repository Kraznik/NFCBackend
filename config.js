const config_testnet = {
  chainId: 80001,
  contractAddress: "0x4137cF37598EE871d1F4A6DEE9188217Ed40c649",
  alchemyUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_KEY}`,
  dgApiBaseUrl: `https://api-main.doingud.work`,
  mnemonic: process.env.MNEMONIC,
  hunts: {
    murals: {
      1: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000067",
      2: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000068",
      3: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000069",
    },
  },
  privateKey: {
    nfcCreator: process.env.CREATOR_PRIVATE_KEY,
  },
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};

const config_mainnet = {
  chainId: 137,
  contractAddress: "0xE3A161EdD679fC5ce2dB2316a4B6f7ab33a8eD6A",
  alchemyUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.MAINNET_ALCHEMY_KEY}`,
  dgApiBaseUrl: `https://api.doingud.com`,
  hunts: {
    murals: {
      1: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000067",
      2: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000068",
      3: "0x66dc3bfcd29e24fddee7f405c705220e6142e4cd000000000069",
    },
  },
  mnemonic: process.env.MNEMONIC,
  privateKey: {
    nfcCreator: process.env.CREATOR_PRIVATE_KEY,
  },
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};

const config =
  process.env.NETWORK === "testnet" ? config_testnet : config_mainnet;

module.exports = config;

// url = `
// https://api.polygonscan.com/api?module=logs&action=getLogs&fromBlock=30323943&toBlock=30323944&address=0xE3A161EdD679fC5ce2dB2316a4B6f7ab33a8eD6A&topic0=0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62&apikey=TJA1U28PDEZQ2IVKYQI4B51GT9HXX7W64I
// `;
