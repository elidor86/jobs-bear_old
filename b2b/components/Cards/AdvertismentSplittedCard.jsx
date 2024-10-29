import React from "react";
import styled from "styled-components";

const AdvertismentSplittedCard = ({ img, label, buttonText, handleButtonClick, isGradientImg, app }) => {
  return (
    <Wrapper>
      <Img background={img}>
        <LabelWrapper isGradientImg={isGradientImg}>
          <Label>{label}</Label>
        </LabelWrapper>
      </Img>
      <Action>
        <button onClick={handleButtonClick}>{buttonText}</button>
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  maxWidth: "328px",
  width: "100%",
  borderRadius: "9px",
  backgroundColor: "#fff",
  overflow: "hidden",
  height: "fit-content",
});

const Img = styled("div")(({ background }) => ({
  background: `url(${background}) center center`,
  height: "174px",
}));

const LabelWrapper = styled("div")(({ isGradientImg }) => ({
  height: "100%",
  width: "100%",
  background: isGradientImg
    ? "linear-gradient(62.56deg, rgba(0, 0, 0, 0.6) 4.84%, rgba(0, 0, 0, 0) 88.71%)"
    : "transparent",
  padding: "11px 12px",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-start",
}));

const Label = styled("div")({
  color: "#FFFFFF",
  maxWidth: "179px",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "27px",
  textTransform: "capitalize",
});

const Action = styled("div")({
  padding: "11px 20px 14px",
  button: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0 12px",
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

export default AdvertismentSplittedCard;
