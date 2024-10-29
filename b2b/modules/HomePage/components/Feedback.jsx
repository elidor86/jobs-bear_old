import styled from "styled-components";
import Carousel from "../../../components/Carousel/Carousel";

import Container from "../../../components/Container/Container";
import FeedbackCard from "./FeedbackCard";

const Feedback = ({ feedback }) => {
  return (
    <Wrapper>
      <Container>
        <DesktopOnly>
          <Title>Here's what people say about us</Title>
          <Row>
            {feedback.map((feedback) => (
              <FeedbackCard {...feedback} key={feedback.image + "-desktop-feedback"} />
            ))}
          </Row>
        </DesktopOnly>
        <MobileOnly>
          <Title>What people say about us</Title>
          <Carousel
            cards={feedback.map((feedback) => (
              <FeedbackCard {...feedback} key={feedback.image + "-mobile-feedback"} />
            ))}
            buttonsPosition="bottom"
            showNeighbors
          />
        </MobileOnly>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 97px 0;
  padding-bottom: 139px;
  background: #ffffff;
  position: relative;

  &::after {
    content: "";
    background-image: url("/static/b2b/images/homepage/feedback/bg.png");
    height: 279px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-size: cover;
  }

  & > div {
    position: relative;
    z-index: 3;
  }

  @media (max-width: 801px) {
    padding: 40px 0 80px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  line-height: 45px;
  color: #3e4598;

  @media (max-width: 801px) {
    font-size: 24px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    max-width: 267px;
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
`;

export default Feedback;
