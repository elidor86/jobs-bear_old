import React from "react";
import styled from "styled-components";
import { ArrowRight } from "../Icons";

const AdvertismentSolidCard = ({ img, largeText, label, buttonBackground, handleButtonClick, app }) => {
  return (
    <Wraper background={img}>
      <Content largeText={largeText}>
        <Label largeText={largeText}>{label}</Label>
        <Button largeText={largeText} buttonBackground={buttonBackground} onClick={handleButtonClick}>
          <ButtonText>learn More</ButtonText>
          <ArrowRight />
        </Button>
      </Content>
    </Wraper>
  );
};

const Wraper = styled("div")(({ background }) => ({
  background: `url(${background}) center center`,
  backgroundSize: "cover",
  borderRadius: "10px",
  maxWidth: "360px",
  width: "100%",
  height: "246px",
  overflow: "hidden",
  padding: "0 28px",
  display: "flex",
  alignItems: "center",
}));

const Content = styled("div")(({ largeText }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: largeText ? "20px" : "25px",
  maxWidth: largeText ? "255px" : "210px",
}));

const Label = styled("div")(({ largeText }) => ({
  color: "#FFFFFF",
  fontWeight: 900,
  fontSize: largeText ? "30px" : "25px",
  lineHeight: largeText ? "40px" : "32px",
  textTransform: "capitalize",
}));

const Button = styled("button")(({ largeText, buttonBackground }) => ({
  width: largeText ? "224px" : "196px",
  display: "flex",
  alignItems: "center",
  padding: "10px 0",
  justifyContent: "center",
  columnGap: "10px",
  border: "none",
  borderRadius: "7px",
  background: buttonBackground ? buttonBackground : "linear-gradient(91.42deg, #7955FF 1.21%, #4624C3 99.24%)",
  boxShadow: "0px 4px 13px rgba(0, 0, 0, 0.15)",

  "& svg > path": {
    fill: "#FFFFFF",
  },
}));

const ButtonText = styled("div")({
  color: "#FFFFFF",
  textTransform: "capitalize",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "21px",
});

export default AdvertismentSolidCard;
