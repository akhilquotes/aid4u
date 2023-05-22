require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "okx",
  networks: {
    hardhat: {},
    okx: {
      url: "https://exchaintestrpc.okex.org",
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
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
