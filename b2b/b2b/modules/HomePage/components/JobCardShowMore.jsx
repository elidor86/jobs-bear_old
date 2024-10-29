import styled from "styled-components";

const JobCardShowMore = ({ title, link }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Action>VIEW ALL &nbsp;&gt;</Action>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Lato";
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #3e4598;
`;

const Action = styled.p`
  font-family: "Lato";
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.02em;
  color: #d92cff;
`;

export default JobCardShowMore;
