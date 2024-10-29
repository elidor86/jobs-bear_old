import React from "react";
import logEvent from "../../lib/logEvent";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(125.7deg, #232f3e 0.98%, #0c1118 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const OfferXLogo = styled.img`
  width: auto;
  height: 22px;
  margin: auto auto 5px auto;
`;

const AmazonLogo = styled.img`
  width: auto;
  height: 34px;
  margin: auto auto 15px auto;
`;

const Title = styled.h2`
  margin: auto auto 10px auto;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;

const Description = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  color: rgba(255, 255, 255, 0.6);
`;
const Button = styled.button`
  background: linear-gradient(170.68deg, #fe9a1d 18.55%, #eb8200 81.22%);
  border: 2px solid #ff9a1d;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #EFF1F9;
  width: 296px;
  height: 46px;
  text-align: center;
  max-width: 170px;
  margin: auto auto 15px auto;
  cursor: pointer;
  @media (max-width: 500px) {
    /*width: 100%;*/
  }
`;

const TARGET_URL = `https://www.mb102.com/lnk.asp?o=13230&c=918277&a=191204&k=B6AABF6FAC2B6FE363151B9E398E539B&l=13817`;

export default function OfferX() {
  return (
    <Container
      onClick={() => {
        logEvent("click_cpa-amazon");
        window.open(TARGET_URL, "_blank");
      }}
    >
      <OfferXLogo src="static/images/cpaCards/offerx_logo.png" />
      <Title>Win £250 to spend at</Title>
      <AmazonLogo src="static/images/cpaCards/amazon_logo.png" />
      <Button>Enter Now</Button>
      <Description>Terms and conditions apply</Description>
    </Container>
  );
}
