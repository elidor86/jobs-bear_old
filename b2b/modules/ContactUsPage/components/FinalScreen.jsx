import React  from "react";
import styled from "styled-components";

const FinalScreen = () => (
  <Wrapper>Thank you for your submission</Wrapper>
);

const Wrapper = styled('div')({
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'center',
  alightContent: 'center',
  alignItems: 'center',
  height: '55vh',
  fontFamily: "Lato",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "40px",
  lineHeight: "45px",
  color: "#3E4598",
  "@media(max-width: 600px)": {
    fontSize: "32px",
    height: '35vh',
  }
})

export default FinalScreen