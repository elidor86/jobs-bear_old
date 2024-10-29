import React from "react";
import logEvent from "../../lib/logEvent";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: linear-gradient(126.76deg, #043676 0.98%, #05589E 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px;
  position: relative;
`;

const CVLibraryLogo = styled.img`
  width: auto;
  height: 26px;
  margin: auto auto 6px 0px;
`;

const OwlImage = styled.img`
  width: auto;
  height: 88px;
  position: absolute;
  bottom: -8px;
  right: 10px;
`;

const Title = styled.h2`
  margin: auto auto 10px 0px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 24px;
  /* identical to box height */
  display: flex;
  color: #ffffff;
`;

const Description = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
font-size: 16px;
line-height: 20px;
  margin: auto auto 12px 0px;
  color: #ffffff;
`;
const Button = styled.button`
background: linear-gradient(94.47deg, #358D2E 0%, #358D2E 97.41%);
border: 2px solid #1C6440;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  width: 296px;
  height: 46px;
  text-align: center;
  max-width: 170px;
  margin: auto auto 15px 0px;
  cursor: pointer;
  @media (max-width: 500px) {
    /*width: 100%;*/
  }
`;


const TARGET_URL = `https://www.cv-library.co.uk/aff/103466`;


export default function CVLibrary() {
  return (
    <Container
      onClick={() => {
        logEvent("click_cpa-cvl");
        window.open(TARGET_URL, "_blank");
      }}
    >
      <CVLibraryLogo src="static/images/cpaCards/cvl_logo.png" />
      <Title>Looking for your next job?</Title>
      <Description>Companies are looking for you! 195,000 jobs available.</Description>
      <Button>Register CV</Button>
      <OwlImage src="static/images/cpaCards/cvl_owl.png" />
    </Container>
  );
}
