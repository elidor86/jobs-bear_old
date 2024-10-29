import Link from "next/link";
import styled from "styled-components";

import Button from "../../../components/ext/Button/Button";

const AdvantageCard = ({ icon, title, description, link }) => (
  <Wrapper>
    <IconWrapper>{icon}</IconWrapper>
    <Title>{title}</Title>
    <Paragraph>{description}</Paragraph>
    <Link href={link} passHref legacyBehavior>
        <Button>Learn more &gt;</Button>
    </Link>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 146px;
  }

  a {
    margin-top: auto;
  }
`;

const IconWrapper = styled.div`
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    display: block;
    max-width: 100%;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  color: #3e4598;
  margin-bottom: 15px;
  margin-top: 27px;
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #3e4598;
  margin-bottom: 32px;
  max-width: 207px;
`;

export default AdvantageCard;
