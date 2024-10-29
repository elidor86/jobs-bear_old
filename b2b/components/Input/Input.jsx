import React from "react";
import styled from "styled-components";

const Input = ({
  forgotPassword,
  title,
  className,
  placeholder = null,
  type = "text",
  value,
  onChange = null,
  variant,
  name,
  ...rest
}) => {
  return (
    <InputWrapper variant={!!variant}>
      <InputTitle className="customInputTitle">{title}</InputTitle>
      {variant === "textarea" ? (
        <TextArea
          className={"customInput"}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      ) : (
        <CustomInput
          required
          className={"customInput"}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    </InputWrapper>
  );
};

const InputTitle = styled("h3")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "45px",
  color: "#000000",
});

const InputWrapper = styled("div")(({ variant }) => ({
  display: "flex",
  flexDirection: "column",
  width: variant ? "100%" : "calc(50% - 12px)",
  "@media(max-width: 600px)": {
    width: "100%",
  },
}));

const CustomInput = styled("input")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#828282",
  padding: "9px 14px",
  border: "1px solid #181718",
  borderRadius: "6px",
  marginBottom: "5px",
  "@media(max-width: 600px)": {
    marginBottom: "8px",
  },
});

const TextArea = styled("textarea")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "20px",
  color: "#828282",
  padding: "18px 14px",
  border: "1px solid #181718",
  borderRadius: "6px",
  resize: "none",
  height: "126px",
  marginTop: "26px",
});

export default Input;
