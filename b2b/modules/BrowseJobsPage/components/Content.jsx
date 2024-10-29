import React from "react";
import styled from "styled-components";
import ListOfItems from "./ListOfItems";


const Content = ({data}) => {
  return (
    <Wrapper>
      <Container>
        <ListOfItems {...data}/>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled("div")({
  padding: "52px 0",
  display: "flex",
  flexDirection: "column",
  gap: "47px",
  "@media(max-width: 750px)": {
    gap: "55px"
  }
});
const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "70px",
  "@media(max-width: 750px)": {
    gap: "55px"
  }
});


export default Content;