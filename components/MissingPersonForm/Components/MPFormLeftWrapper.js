import styled from "styled-components";
import { MPFormState } from "../MPForm";
import { useContext } from "react";

const MPFormLeftWrapper = () => {
  const Handler = useContext(MPFormState);

  return (
    <FormLeft>
      <FormInput>
        <label>First Name</label>
        <Input
          onChange={Handler.FormHandler}
          value={Handler.form.firstName}
          placeholder="First Name"
          name="firstName"
        ></Input>
      </FormInput>
      <FormInput>
        <label>Last Name</label>
        <Input
          onChange={Handler.FormHandler}
          value={Handler.form.lastName}
          placeholder="Last Name"
          name="lastName"
        ></Input>
      </FormInput>
      <FormInput>
        <label>Age</label>
        <Input
          onChange={Handler.FormHandler}
          value={Handler.form.age}
          placeholder="Age"
          name="age"
        ></Input>
      </FormInput>
      <FormInput>
        <label>Contact Number</label>
        <Input
          onChange={Handler.FormHandler}
          value={Handler.form.contactNumber}
          placeholder="Contact Number"
          name="contactNumber"
        ></Input>
      </FormInput>
    </FormLeft>
  );
};

const FormLeft = styled.div`
  width: 48%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
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

export default MPFormLeftWrapper;
