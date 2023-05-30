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
  etherscan: {
    apiKey: "OKLINK",
    customChains: [
      {
        network: "okx",
        chainId: 65,
        urls: {
          apiURL:
            "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/okctest",
          browserURL: "https://www.oklink.com/zh-cn/okc-test/",
        },
      },
    ],
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
