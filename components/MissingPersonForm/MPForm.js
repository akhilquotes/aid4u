import styled from "styled-components";
import FormLeftWrapper from "./Components/MPFormLeftWrapper";
import FormRightWrapper from "./Components/MPFormRightWrapper";
import { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import Campaign from "../../artifacts/contracts/Campaign.sol/Campaign.json";
import Link from "next/link";

const MPFormState = createContext();

const MPForm = ({ address }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    contactNumber: "",
    additionalInfo: "",
  });

  const [completed, setCompleted] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [additionalInfoUrl, setAdditionalInfoUrl] = useState();
  const [photoUrl, setPhotoUrl] = useState();

  const FormHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [photo, setPhoto] = useState(null);

  const ImageHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const addMissingPerson = async (e) => {
    debugger;
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner();

    if (form.firstName === "") {
      toast.warn("FirstName Field Is Empty");
    } else if (form.age === "") {
      toast.warn("Age Field Is Empty");
    } else if (form.contactNumber === "") {
      toast.warn("Contact Number Field Is Empty");
    } else if (uploaded == false) {
      toast.warn("Files Upload Required");
    } else {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(address, Campaign.abi, signer);

      const personData = await contract.addMissingPerson(
        form.firstName,
        form.lastName,
        parseInt(form.age),
        form.contactNumber,
        photoUrl,
        additionalInfoUrl
      );

      await personData.wait();
      setCompleted("Added");
    }
  };

  return (
    <MPFormState.Provider
      value={{
        form,
        setForm,
        photo,
        setPhoto,
        ImageHandler,
        FormHandler,
        setPhotoUrl,
        setAdditionalInfoUrl,
        addMissingPerson,
        setUploaded,
      }}
    >
      <FormWrapper>
        <FormMain>
          {loading == true ? (
            completed == "" ? (
              <Spinner>
                <TailSpin height={60} />
              </Spinner>
            ) : (
              <Address>
                <h1>Registered missing person sucessfully!</h1>
                <Link passHref href={"/" + address + "/listMissingPerson"}>
                  <Button>View complete list</Button>
                </Link>
              </Address>
            )
          ) : (
            <FormInputsWrapper>
              <FormLeftWrapper />
              <FormRightWrapper />
            </FormInputsWrapper>
          )}
        </FormMain>
      </FormWrapper>
    </MPFormState.Provider>
  );
};

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormMain = styled.div`
  width: 80%;
`;

const FormInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Address = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.bgSubDiv};
  border-radius: 8px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default MPForm;
export { MPFormState };
