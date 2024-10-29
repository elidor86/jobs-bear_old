import styled from "styled-components";
import React from "react";

const Button = ({ onClick, color = "default", active = false, children, variant = "default", ...props }) => {
  const ButtonStyled = styled("button")({
    ...getVariant()[variant],
    ...getColor(active)[variant],
    display: "block",
    cursor: "pointer",
    border: "none",
    "&:hover": {
      opacity: ".8"
    },
    width: "100%",
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
    maxWidth: "140px"
  },
  rounded: {
    padding: "4px 25px",
    borderRadius: "50px",
    maxWidth: "239px",

    "@media(max-width: 750px)": {
      padding: "0 12px"
    }
  },
});

const getColor = ({ active }) => ({
  default: {
    background: active ? "#d92cff" : "#D9D9D9",
    color: active ? "#ffffff" : "#9E9C9E"
  }
});

const Text = styled("h4")({
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "42px",

  "@media(max-width: 750px)": {
    fontSize: "12px",
    lineHeight: "32px"
  }
});

export default Button;
