require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "okx",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
    sphinx: {
      url: "https://sphinx.shardeum.org/",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
    okx: {
      url: "https://exchaintestrpc.okex.org",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
  // etherscan: {
  //   apiKey: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
  // },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
