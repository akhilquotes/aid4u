import MPForm from "../../components/MissingPersonForm/MPForm";
import { ethers } from "ethers";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";

const addMissingPerson = ({ Data }) => {
  return (
    <div>
      <MPForm address={Data.address} />
    </div>
  );
};

export default addMissingPerson;
export async function getStaticPaths() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  // const getAllCampaigns = contract.filters.campaignCreated();
  // const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllCampaigns = await contract.listCampaigns();
  return {
    paths: AllCampaigns.map((e) => ({
      params: {
        address: e.campaignAddress.toString(),
      },
    })),
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    context.params.address,
    Campaign.abi,
    provider
  );
  const Data = {
    address: context.params.address,
  };
  return {
    props: {
      Data,
    },
    revalidate: 10,
  };
}
