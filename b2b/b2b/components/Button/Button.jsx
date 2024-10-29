import styled from "styled-components";
import React from "react";

const Button = ({ onClick, active = false, children, variant = "default", ...props }) => {
  const ButtonStyled = styled("button")({
    ...getVariant()[variant],
    display: "block",
    cursor: "pointer",
    background: active ? "#d92cff" : "#D9D9D9",
    border: "none",
    "&:hover": {
      opacity: ".8",
    },

    width: "100%",
    color: active ? "#ffffff" : "#9E9C9E",
  });

  return (
    <ButtonStyled {...props} onClick={onClick}>
      <Text>{children}</Text>
    </ButtonStyled>
  );
};

const getVariant = () => ({
  default: {
    padding: "4px 15px !important",
    borderRadius: "5px",
    maxWidth: "140px",
  },
  rounded: {
    padding: "4px 25px",
    borderRadius: "50px",
    maxWidth: "239px",

    "@media(max-width: 750px)": {
      padding: "0 12px",
    },
  },
});

const Text = styled("h4")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "42px",

  "@media(max-width: 750px)": {
    fontSize: "12px",
    lineHeight: "32px",
  },
});

export default Button;
