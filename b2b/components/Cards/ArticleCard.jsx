import React from "react";
import styled from "styled-components";

import { ArticleIcon } from "../Icons";

const ArticleCard = ({ img, title, date, readingTime, app }) => {
  return (
    <Wrapper>
      <ImageSection src={img}>
        <Top>
          <ArticleIcon />
          <CardLabel>Article</CardLabel>
        </Top>
        <Bottom>
          <Title>{title}</Title>
          <Subtitle>
            {date} / Reading time {readingTime}
          </Subtitle>
        </Bottom>
        <Fade />
      </ImageSection>
      <Button>View Article about Gig Jobs </Button>
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
  padding: "17px 12px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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

const Top = styled("div")({
  display: "flex",
  alignItems: "center",
  columnGap: "8px",
  position: "relative",
  zIndex: 1,
});

const Bottom = styled("div")({
  maxWidth: "193px",
  display: "flex",
  flexDirection: "column",
  rowGap: "12px",
  position: "relative",
  zIndex: 1,
});

const CardLabel = styled("p")({
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
});

const Title = styled("p")({
  color: "#FFFFFF",
  fontWeight: 900,
  fontSize: "20px",
  lineHeight: "23px",
});

const Subtitle = styled("p")({
  color: "#FFFFFF",
  fontWeight: 400,
  fontSize: "7px",
  lineHeight: "10px",
});

export default ArticleCard;
