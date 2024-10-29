import styled from "styled-components";
import Carousel from "../../../components/Carousel/Carousel";

import Container from "../../../components/Container/Container";
import AdvantageCard from "./AdvantageCard";

const WhyUs = ({ advantages = [] }) => (
  <Wrapper>
    <Container>
      <Title>
        Why <b>JobsBear?</b>
      </Title>
      <DesktopOnly>
        <Row>
          {advantages?.map((advantage) => (
            <AdvantageCard {...advantage} key={advantage.title + "-advantage-desktop"} />
          ))}
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <Carousel
          cards={advantages?.map((advantage) => (
            <AdvantageCard {...advantage} key={advantage.title + "-advantage-mobile"} />
          ))}
          showNeighbors={false}
          buttonsPosition="center"
        />
      </MobileOnly>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 97px 0;
  background: #f0f1f9;

  @media (max-width: 801px) {
    padding: 20px 0 47px;
  }
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

  @media (max-width: 801px) {
    font-size: 24px;

    b {
      font-weight: 700;
    }
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 801px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  @media (min-width: 801px) {
    display: none;
  }

  margin-top: 10px;
`;

export default WhyUs;
