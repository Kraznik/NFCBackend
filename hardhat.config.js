// require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const config = require("./config");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.5.17",
// };

module.exports = {
  defaultNetwork: process.env.NETWORK === "testnet" ? "mumbai" : "polygon",
  networks: {
    hardhat: {},
    polygon: {
      url: config.alchemyUrl,
      accounts: [
        config.privateKey.creator,
        config.privateKey.ethBcnMoments,
        config.privateKey.dgMoments,
      ],
    },
    mumbai: {
      url: config.alchemyUrl,
      accounts: [
        config.privateKey.creator,
        config.privateKey.ethBcnMoments,
        config.privateKey.dgMoments,
      ],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
