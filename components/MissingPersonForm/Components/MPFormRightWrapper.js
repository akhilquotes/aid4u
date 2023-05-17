import styled from "styled-components";
import { MPFormState } from "../MPForm";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const MPFormRightWrapper = () => {
  const Handler = useContext(MPFormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    debugger;
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.additionalInfo !== "") {
      try {
        var data = JSON.stringify({
          pinataMetadata: {
            name: Handler.form.firstName + "_Desc.json",
          },
          pinataContent: { Description: Handler.form.additionalInfo },
        });
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: data,
          headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
            "Content-Type": "application/json",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        Handler.setAdditionalInfoUrl(ImgHash);
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }

    if (Handler.photo !== null) {
      try {
        const formData = new FormData();
        formData.append("file", Handler.photo);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        Handler.setPhotoUrl(ImgHash);
      } catch (error) {
        toast.warn(`Error Uploading Image`);
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
    toast.success("Files Uploaded Sucessfully");
  };

  return (
    <FormRight>
      <FormInput>
        <label>Additional Information</label>
        <TextArea
          onChange={Handler.FormHandler}
          value={Handler.form.additionalInfo}
          name="additionalInfo"
          placeholder="Provide any additional information"
        ></TextArea>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Upload Photo</label>
        <Image
          alt="dapp"
          onChange={Handler.ImageHandler}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>
      {uploadLoading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded == false ? (
        <Button onClick={uploadFiles}>Upload Files to IPFS</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Sucessfully
        </Button>
      )}
      <Button onClick={Handler.addMissingPerson}>
        Register Missing Person
      </Button>
    </FormRight>
  );
};

const FormRight = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
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
const TextArea = styled.textarea`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  max-width: 100%;
  min-width: 100%;
  overflow-x: hidden;
  min-height: 160px;
`;

export default MPFormRightWrapper;
