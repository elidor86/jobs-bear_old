import styled from "styled-components";
import config from "../../components/config/styleConsts";
const { mobileMaxWidth, purple, black } = config;

const Container = styled.div`
  background: linear-gradient(262.41deg, #5a68c1 0.88%, #25337e 99.45%);
  border-radius: 5px;
  color: white;
  padding: 10px;
  height: 76px;
  @media (max-width: ${mobileMaxWidth}) {
    height: 90px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
`;

const Image = styled.img`
  height: 26px;
  width: 26px;
  margin-right: 10px;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 17px;
  margin-top: 10px;
`;

const ProTip = ({ content }) => (
  <Container>
    <Header>
      <Image src="../../static/images/logo_image.svg" />
      PRO TIP
    </Header>
    <Content dangerouslySetInnerHTML={{ __html: content }} />
  </Container>
);

export default ProTip;
