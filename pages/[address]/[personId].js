import styled from "styled-components";
import { ethers } from "ethers";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const PersonDetail = () => {
  const [missingPerson, setMissingPerson] = useState();
  const [info, setInfo] = useState("");
  const router = useRouter();
  const query = router.query;
  const address = query.address;
  const uid = query.personId;
  console.log(query);
  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );

      const contract = new ethers.Contract(address, Campaign.abi, provider);
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
          additionalInfoUrl: e.additionInfoUrl,
        };
      });
      const person = missingPeople.filter(
        (x) => x.personId == parseInt(uid)
      )[0];

      setMissingPerson(person);
      fetch(person.additionalInfoUrl)
        .then((res) => res.json())
        .then((data) => setInfo(data.Description));
    };
    Request();
  }, []);
  return (
    missingPerson && (
      <DetailWrapper>
        <LeftContainer>
          <ImageSection>
            <Image
              alt="crowdfunding dapp"
              layout="fill"
              src={missingPerson.photoUrl}
            />
          </ImageSection>
          <Text>{info}</Text>
        </LeftContainer>
        <RightContainer>
          <FundsData>
            <Funds>
              <FundText>First Name : {missingPerson.firstName}</FundText>
            </Funds>
          </FundsData>
          <FundsData>
            <Funds>
              <FundText>Last Name : {missingPerson.lastName}</FundText>
            </Funds>
          </FundsData>
          <FundsData>
            <Funds>
              <FundText>Age : {missingPerson.age}</FundText>
            </Funds>
          </FundsData>
          <FundsData>
            <Funds>
              <FundText>
                Contact Number : {missingPerson.contactNumber}
              </FundText>
            </Funds>
          </FundsData>
        </RightContainer>
      </DetailWrapper>
    )
  );
};

export default PersonDetail;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 98%;
`;
const LeftContainer = styled.div`
  width: 45%;
`;
const RightContainer = styled.div`
  width: 50%;
`;
const ImageSection = styled.div`
  width: 100%;
  position: relative;
  height: 350px;
`;
const Text = styled.p`
  font-family: "Roboto";
  font-size: large;
  color: ${(props) => props.theme.color};
  text-align: justify;
`;

const FundsData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Funds = styled.div`
  width: 45%;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 3px;
  border-radius: 8px;
  text-align: center;
  height: 30px;
`;
const FundText = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;

const Button = styled.button`
  padding: 8px;
  margin: 2px;
  text-align: center;
  width: 40%;
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
