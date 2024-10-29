import styled from "styled-components";
import logEvent from "../../lib/logEvent";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(128.31deg, #459a18 0.98%, #3fa714 100%);
  box-shadow: 0px 0px 6px #41a316;
  border-radius: 10px;
  padding: 16px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;

`;

const Image = styled.img`
  width: 42px;
  height: 48px;
  margin: auto 0px;
`;
const Title = styled.h2`
margin: auto 0px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */
  display: flex;
  align-items: center;
margin-left: 6px;
  color: #ffffff;
`;

const Description = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */
  display: flex;
  align-items: center;

  color: #ffffff;
`;
const Button = styled.button`
  background: linear-gradient(98.07deg, #a12a7a 2.55%, #cb2996 98.48%);
  border: 2px solid rgba(255, 255, 255, 0.7);
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
cursor: pointer;
@media (max-width: 500px) {
    width: 100%;
  }
`;

const TARGET_URL = `https://www.mb102.com/lnk.asp?o=6748&c=918277&a=191204&k=D7BE26224E1B481001D31D7F23E962C8&l=5460`;
export default function LinkToSurveyCard() {
  return (
    <Container>
      <Row>
        <Image src="static/images/pound_symbol.png" />
        <Title>Need quick cash?</Title>
      </Row>
      <Description>
        Earn cash for taking surveys, reading emails and playing online games.
      </Description>
      <Button
        onClick={() => {
          logEvent("click-survey_quick_cash");
          window.open(TARGET_URL, "_blank");
        }}
      >
        Get £1 Signup Bonus | Join Now!
      </Button>
    </Container>
  );
}
