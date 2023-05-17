import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";
import CampaignFactory from "../../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

export default function ListMissingPerson({ Data }) {
  const [missingPeople, setMissingPeople] = useState([]);
  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const contract = new ethers.Contract(
        Data.address,
        Campaign.abi,
        provider
      );
      const allPersons = await contract.listMissingPersons();
      const missingPeople = allPersons.map((e) => {
        console.log(e);
        return {
          personId: e.personId,
          firstName: e.firstName,
          lastName: e.lastName,
          age: parseInt(e.age),
          contactNumber: e.contactNumber,
          photoUrl: e.photoUrl,
        };
      });
      setMissingPeople(missingPeople);
    };
    Request();
  }, []);
  return (
    <HomeWrapper>
      {/* Cards Container */}
      <CardsWrapper>
        {/* Card */}
        {missingPeople.map((e) => {
          return (
            <Card key={e.firstName}>
              <CardImg>
                <Image alt="crowdfunding dapp" layout="fill" src={e.photoUrl} />
              </CardImg>
              <CardData>
                <Text>
                  <AccountBoxIcon />
                  Name
                </Text>
                <Text>
                  {e.firstName} {e.lastName}
                </Text>
              </CardData>
              <CardData>
                <Text>
                  <PersonIcon />
                  Age
                </Text>
                <Text>{e.age}</Text>
              </CardData>
              <CardData>
                <Text>
                  <PhoneIcon />
                  Contact Number
                </Text>
                <Text>{e.contactNumber}</Text>
              </CardData>
              <Link href={"/" + Data.address + "/" + e.personId}>
                <Button>View complete details</Button>
              </Link>
            </Card>
          );
        })}
        {/* Card */}
      </CardsWrapper>
    </HomeWrapper>
  );
}
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
  debugger;
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
  // const persons = contract.filters.missingPersonAdded();
  // const allPersons = await contract.queryFilter(persons);

  return {
    props: {
      Data,
    },
    revalidate: 10,
  };
}
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`;
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  margin-right: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`;
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;
const Title = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
