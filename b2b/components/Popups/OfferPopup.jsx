import React from "react";
import styled from "styled-components";

import Popup from "./Popup";
import { CloseDialogIcon, ShopIcon } from "../Icons";

const OfferPopup = ({
  open,
  handleClose,
  shopChipPosition,
  title,
  subtitle,
  compareText,
  caption,
  img,
  buttonText,
  app
}) => {
  return (
    <Popup open={open} handleClose={handleClose}>
      <Wrapper>
        <CloseButton onClick={handleClose}>
          <CloseDialogIcon />
        </CloseButton>
        <Title>{title}</Title>
        <Divider />
        <Subtitle>{subtitle}</Subtitle>
        <CompareText>{compareText}</CompareText>
        <ImageWrapper>
          <Img src={img} />
          <ShopChip shopChipPosition={shopChipPosition}>
            <ShopIcon />
            Shop This Item
          </ShopChip>
        </ImageWrapper>
        <Caption>{caption}</Caption>
        <Button>{buttonText}</Button>
      </Wrapper>
    </Popup>
  );
};

const Wrapper = styled("div")({
  borderRadius: "20px",
  background: "#FFFFFF",
  position: "relative",
  width: "325px",
  padding: "16px 27px 22px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CloseButton = styled("button")({
  position: "absolute",
  top: "18px",
  right: "20px",
  border: "none",
  background: "transparent",
  width: "14px",
  height: "14px",
  boxShadow: "none",
  cursor: "pointer",

  "& svg": {
    fill: "#70718E",
  },
});

const Title = styled("div")({
  maxWidth: "185px",
  fontWeight: 800,
  fontSize: "32px",
  lineHeight: "38px",
  textAlign: "center",
  textTransform: "capitalize",
  margin: 0,
});

const Divider = styled("div")({
  width: "100%",
  height: "2px",
  background: "#E4E6F0",
});

const Subtitle = styled("div")({
  marginTop: "11px",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "28px",
  textAlign: "center",
  textTransform: "capitalize",
});

const CompareText = styled("div")({
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center",
  textTransform: "capitalize",
});

const ImageWrapper = styled("div")({
  padding: "10px 0 15px",
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const ShopChip = styled("div")(({ shopChipPosition }) => ({
  position: "absolute",
  left: shopChipPosition?.x ? `${shopChipPosition?.x}px` : "10px",
  top: shopChipPosition?.y ? `${shopChipPosition?.y}px` : "10px",
  display: "flex",
  alignItems: "center",
  columnGap: "7px",
  borderRadius: "44px",
  background: "#05FFD5",
  padding: "4px 9px 6px 9px",
  fontWeight: 900,
  fontSize: "12px",
  lineHeight: "16px",
}));

const Img = styled("img")({
  maxHeight: "95px",
});

const Caption = styled("div")({
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "19px",
  textAlign: "center",
  textTransform: "capitalize",
  marginBottom: "13px",
});

const Button = styled("button")({
  width: "100%",
  border: "none",
  background: "#D92CFF",
  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  color: "#FFFFFF",
  fontWeight: 800,
  fontSize: "16px",
  lineHeight: "20px",
  display: "flex",
  justifyContent: "center",
  padding: "12px 0",
});

export default OfferPopup;
