import styled from "styled-components";

import Container from "../../../components/Container/Container";
import StatisticsItem from "../../AboutUsPage/components/StatisticsItem";

const Statistics = ({ statistics }) => (
  <Wrapper>
    <Container>
      <Row>
        <Left>
          <Title>
            Join one of the world's <br /> fastest-growing Jobs Aggregator
          </Title>
          {statistics.map((item) => (
            <StatisticsItem changeLabelColor {...item} key={item.value + "statistic-item"} />
          ))}
        </Left>
        <Right>
          <img src="/static/b2b/images/homepage/statistics/app-image.png" alt="Jobs Bear app image" />
        </Right>
      </Row>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 141px 0;
  background-color: #ffffff;

  @media (max-width: 901px) {
    padding: 100px 0 17px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  line-height: 45px;
  color: #3e4598;
  margin-bottom: 44px;

  @media (max-width: 1401px) {
    font-size: 38px;
  }

  @media (max-width: 1201px) {
    font-size: 34px;
  }

  @media (max-width: 801px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  column-gap: 80px;
  justify-content: space-between;

  @media (max-width: 901px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Left = styled.div``;

const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 23px;
`;

const ImageWrapper = styled.div`
  height: 429px;
  overflow: hidden;

  @media (max-width: 1101px) {
    & > img {
      width: 290px;
    }
  }

  @media (max-width: 901px) {
    height: 300px;
    width: 100%;
    margin-bottom: 32px;
    & > img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Right = styled.div`
  width: 210px;
  min-width: 210px;
  overflow: hidden;

  & > img {
    max-width: 100%;
    display: block;
  }

  @media (max-width: 901px) {
    height: 335px;
    width: 100%;
    margin-bottom: 19px;
    & > img {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      max-width: 200px;
    }
  }
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 60px;
  line-height: 1px;
  color: #5c6ac3;
`;

const Label = styled.div`
  font-weight: 900;
  font-size: 18px;
  line-height: 1px;
  color: #000000;
`;

export default Statistics;
