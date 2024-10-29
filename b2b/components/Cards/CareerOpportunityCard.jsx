import React from "react";
import styled from "styled-components";

const CareerOpportunityCard = ({ img, isGradientImg, app }) => {
  return (
    <Wrapper>
      <ImageSection src={img}>
        {isGradientImg && <Fade />}
        <Label src="static/b2b/images/cards/CareerOpportunityCard/label.png" />
      </ImageSection>
      <Button>View side hustle Careers</Button>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "100%",
  maxWidth: "360px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "14px",
  background: "#FFFFFF",
  borderRadius: "10px",
  boxShadow: "0px 8.00487px 8.00487px #E4E6F0",
});

const ImageSection = styled("div")(({ src }) => ({
  borderRadius: "9px 9px 0 0",
  height: "174px",
  width: "100%",
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  padding: "0px 16px 15px",
  display: "flex",
  alignItems: "flex-end",
  position: "relative",
}));

const Fade = styled("div")({
  width: "200px",
  background: "linear-gradient(89.73deg, rgba(0, 0, 0, 0.6) 0.26%, rgba(0, 0, 0, 0) 99.79%)",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
});

const Button = styled("button")({
  padding: "9px 37px 12px",
  border: "none",
  background: "linear-gradient(270deg, #828BDE -0.01%, #6870C2 99.9%)",
  borderRadius: "6px",
  color: "#FFFFFF",
  fontWeight: 900,
  fontSize: "16px",
  lineHeight: "20px",
  textTransform: "capitalize",
});

const Label = styled("img")({
  position: "relative",
  zIndex: 1,
});

export default CareerOpportunityCard;
