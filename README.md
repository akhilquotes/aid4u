# Problem:

  Irrespective of the timing or location, the magnitude of natural disasters is enormous, demanding substantial time, energy, and resources to reconstruct affected communities. Throughout the occurrence and aftermath of such calamities, various entities including businesses, relief agencies, and non-governmental organizations work in conjunction with local, state, and national governments, as well as community residents, to coordinate and administer relief endeavors. These stakeholders frequently encounter diverse operational obstacles throughout the process of disaster management.

# Key Challenges faced are:

- Insufficient trust, transparency, and auditability, hindering the assurance that resources are utilized as intended.
- Complicated registration procedures for volunteers, causing inconvenience and delays.
- Inadequate coordination among organizations involved in the relief efforts.
- Absence of a unified channel or streamlined process for donors and agencies to facilitate their contributions.
- Lack of a proper system to track missing individuals during and after the disaster.
- Incomplete or improper documentation of activities and transactions related to the relief operations.

# Solution:

We provide an integrated solution for Government agencies/ Donors/ Volunteers/ Users. Aid4U aims to solve mentioned challenges by

- Establishing a unified and reliable ledger as a shared platform for collaboration and coordination among all stakeholders, including relief organizations, volunteers, and government agencies.
- Implementing an efficient system to maintain comprehensive information about missing individuals and securely store any pertinent personally identifiable information (PII) documents. This allows agencies and users to easily trace and track progress in locating them.
- Recording all donations collected for the crisis in an immutable ledger to ensure transparency, auditability, and prevent any potential misuse of funds or resources.
- Facilitating anytime, anywhere access through smartphones, enabling individuals to record requests for help or engage in relevant communication conveniently.

# Future Roadmap:

- Add live update for missing people so that all users can track the status seamlessly
- Provide incentives or certificates for volunteers to encourage the active participation
- Enable donors to donate material(food, clothes…) in addition to funds and enter the supplies information in ledger to avoid misuse

# Testing Instructions: 

Navigate to https://aid4u.vercel.app/ or http://rltp13v0lddkpa8j1aklfiod5g.ingress.palmito.duckdns.org/ to test application.

Smart contract deployed on OKTC Testnet: https://www.okx.com/en-in/explorer/oktc-test/address/0xf30046a25F7199CcaDa2f3E5A23b14f04eBE8eF7

`We have deployed our app initially using Spheron Compute to below url http://rltp13v0lddkpa8j1aklfiod5g.ingress.palmito.duckdns.org/ recorded demo and uploaded in youtube, but as free plan is valid for only 15 days, deployed the application using Vercel.`

To run locally:

1. Download git repo 
2. run `npm install`
3. To deploy smart contract to OKT Chain using hardhat, run below command in terminal npx hardhat run scripts/deploy.js --network okx
4. Replace the contract address in .env file with variable name NEXT_PUBLIC_CONTRACT_ADDRESS
5. To view application locally, run below command in terminal npm run dev
6. To test application Connect to OKT Chain using metamask wallet
