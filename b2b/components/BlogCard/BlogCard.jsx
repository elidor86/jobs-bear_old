import Link from "next/link";
import styled from "styled-components";
import { CardImg } from "react-bootstrap";

const BlogCard = ({ image, title, link }) => (
  <Link passHref href={link} legacyBehavior>
    <Wrapper>
      <ImgWrapper image={image} />
      <Title>{title}</Title>
      <Action>READ MORE &nbsp;&gt;</Action>
    </Wrapper>
  </Link>
);

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
`;

const ImgWrapper = styled("div")(({image}) =>({
    background: `url(${image}) center center`,
    width: '290px',
    height: '250px',
    borderRadius: '10px'
  }));

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-transform: capitalize;
  color: #0c264c;
  margin-top: 16px;
  margin-bottom: 30px;
  max-width: 232px;

  @media (max-width: 801px) {
    margin: 15px 0 20px;
    max-width: 100%;
  }
`;

const Action = styled.p`
  margin-top: auto;
  font-weight: 700;
  font-size: 18px;
  line-height: 17px;
  color: #d92cff;
`;

export default BlogCard;
