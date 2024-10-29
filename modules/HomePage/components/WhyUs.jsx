import styled from "styled-components";

import Container from "../../../components/ext/Container/Container";
import AdvantageCard from "./AdvantageCard";

const WhyUs = ({ advantages = [] }) => (
  <Wrapper>
    <Container>
      <Title>
        Why <b>JobsBear?</b>
      </Title>
      <Row>
        {advantages?.map((advantage) => (
          <AdvantageCard {...advantage} key={advantage.title + "-advantage"} />
        ))}
      </Row>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 97px 0;
  background: #f0f1f9;
`;

const Row = styled.div`
  column-gap: 73px;
  display: flex;
  margin-top: 55px;
  align-items: stretch;

  & > div {
    flex: 1;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  line-height: 45px;
  color: #3e4598;

  b {
    font-weight: 800;
  }
`;

export default WhyUs;
