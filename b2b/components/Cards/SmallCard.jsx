import React from "react";
import styled from "styled-components";

const SmallCard = ({ img, label, title, buttonText, app }) => {
  return (
    <Wrapper>
      <Img background={img} />
      <Content>
        {label && <img src="/static/b2b/images/cards/smallCard/label.png" alt="label" />}
        <span>{title}</span>
        <button>{buttonText}</button>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  maxWidth: "328px",
  borderRadius: "9px",
  backgroundColor: "#fff",
  overflow: "hidden",
  height: "fit-content",
});

const Content = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexDirection: "column",
  padding: "16px 20px",
  position: "relative",
  img: {
    position: "absolute",
    left: "23px",
    top: "-55px",
  },
  span: {
    fontFamily: "Lato",
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "20px",
    color: "#1D1D1B",
  },
  button: {
    fontFamily: "Lato",
    padding: "11px 0",
    width: "100%",
    border: "none",
    background: "linear-gradient(270deg, #828BDE -0.01%, #6870C2 99.9%)",
    borderRadius: "6px",
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "capitalize",
  },
});

const Img = styled("div")(({ background }) => ({
  background: `url(${background}) center center`,
  height: "109px",
}));
export default SmallCard;
