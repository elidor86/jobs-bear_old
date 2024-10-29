import React, { useState } from "react";
import styled from "styled-components";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const Form = ({ formData }) => {
  const [data, setData] = useState(defaultData);

  const handleChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data", data);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Your Details</Title>
      <Content>
        {formData.map(({ title, placeholder, type, variant, name }) => (
          <Input
            value={data[name]}
            title={title}
            placeholder={placeholder}
            type={type}
            name={name}
            key={placeholder}
            variant={variant}
            onChange={handleChange}
          />
        ))}
        <Button active>Send</Button>
      </Content>
    </FormContainer>
  );
};

const Title = styled("h2")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "75px",
});

const Content = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "24px",
});

const FormContainer = styled("form")({
  padding: "37px 0 59px",
  backgroundColor: "#FFFFFF",

  button: {
    margin: "0 auto",
    marginTop: "28px",
    padding: "16px 45px",
  },

  "@media(max-width: 900px)": {
    padding: "20px 0 46px",
  },

  "@media(max-width: 600px)": {
    button: {
      margin: "37px 0 0 auto",
    },
  },
});

export default Form;
