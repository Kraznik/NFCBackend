const config_testnet = {
  chainId: 80001,
  contractAddress: "0x4137cF37598EE871d1F4A6DEE9188217Ed40c649",
  alchemyUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_KEY}`,
  dgApiBaseUrl: `https://api-main.doingud.work`,
  mnemonic: process.env.MNEMONIC,
  privateKey: {
    creator: process.env.CREATOR_PRIVATE_KEY,
    ethBcnMoments: process.env.MOMENTS_TEST_PRIVATE_KEY,
    dgMoments: process.env.DG_MOMENTS_TEST_PRIVATE_KEY,
    ethCcMoments: process.env.ETHCC_MOMENTS_TEST_PRIVATE_KEY,
  },
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};

const config_mainnet = {
  chainId: 137,
  contractAddress: "0xE3A161EdD679fC5ce2dB2316a4B6f7ab33a8eD6A",
  alchemyUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.MAINNET_ALCHEMY_KEY}`,
  dgApiBaseUrl: `https://api.doingud.com`,
  mnemonic: process.env.MNEMONIC,
  privateKey: {
    creator: process.env.CREATOR_PRIVATE_KEY,
    ethBcnMoments: process.env.ETH_BCN_MOMENTS_PRIVATE_KEY,
    dgMoments: process.env.DG_MOMENTS_PRIVATE_KEY,
    ethCcMoments: process.env.ETHCC_MOMENTS_PRIVATE_KEY,
  },
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
};

const config =
  process.env.NETWORK === "testnet" ? config_testnet : config_mainnet;

module.exports = config;

// url = `
// https://api.polygonscan.com/api?module=logs&action=getLogs&fromBlock=30323943&toBlock=30323944&address=0xE3A161EdD679fC5ce2dB2316a4B6f7ab33a8eD6A&topic0=0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62&apikey=TJA1U28PDEZQ2IVKYQI4B51GT9HXX7W64I
// `;
