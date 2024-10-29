import React from "react";
import styled from "styled-components";

import { QuotesIcon, StarIcon } from "../Icons";

const ReviewCard = ({ img, quote, authorName, authorJob, authorAvatar, withQuotes }) => {
  return (
    <Wrapper>
      <ImageSection src={img}>
        <Review>
          {withQuotes && (
            <QuotesLabel>
              <QuotesIcon />
            </QuotesLabel>
          )}
          <AuthorAvatar src={authorAvatar} />
          <StarsGroup>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </StarsGroup>
          <QuoteText>{quote}</QuoteText>
          <Author>{authorName},</Author>
          <Job>{authorJob}</Job>
        </Review>
      </ImageSection>
      <Button>view side hustle jobs now</Button>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "100%",
  maxWidth: "360px",
  padding: "0 0 19px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "17px",
  background: "#FFFFFF",
  borderRadius: "15px",
});

const ImageSection = styled("div")(({ src }) => ({
  borderRadius: "9px 9px 0 0",
  height: "178px",
  width: "100%",
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  padding: "0px 0px 14px 20px",
  display: "flex",
  alignItems: "flex-end",
  position: "relative",
}));

const Review = styled("div")({
  padding: "6px 13px 8px",
  background: "#FFFFFF",
  borderRadius: "6px",
  width: "159px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StarsGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  columnGap: "2px",
});

const QuoteText = styled("p")({
  color: "#414042",
  fontWeight: 300,
  fontSize: "7px",
  lineHeight: "11px",
  textAlign: "center",
  textTransform: "capitalize",
  margin: "10px 0 5px",
});

const Author = styled("p")({
  color: "#414042",
  fontWeight: 700,
  fontSize: "8px",
  lineHeight: "10px",
  textAlign: "center",
});

const Job = styled("p")({
  color: "#414042",
  fontWeight: 300,
  fontSize: "8px",
  lineHeight: "10px",
  textAlign: "center",
});

const AuthorAvatar = styled("img")({
  position: "absolute",
  right: "12px",
  top: "-20px",
  width: "33px",
  height: "33px",
  objectFit: "cover",
  borderRadius: "50%",
});

const QuotesLabel = styled("div")({
  position: "absolute",
  left: "12px",
  top: "-20px",
  width: "33px",
  height: "33px",
  borderRadius: "50%",
  background: "#828BDE",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Button = styled("button")({
  padding: "10px 40px",
  border: "none",
  background: "linear-gradient(270deg, #828BDE -0.01%, #6870C2 99.9%)",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontWeight: 900,
  fontSize: "16px",
  lineHeight: "20px",
  textTransform: "capitalize",
});

export default ReviewCard;
