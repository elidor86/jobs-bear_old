import Link from "next/link";
import styled from "styled-components";

const BlogCard = ({ image, title, link }) => (
  <Link passHref href={link} legacyBehavior>
    <Wrapper>
      <Image src={image} />
      <Title>{title}</Title>
      <Action>READ MORE &nbsp;&gt;</Action>
    </Wrapper>
  </Link>
);

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  border-radius: 10px;
  max-width: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-transform: capitalize;
  color: #0c264c;
  margin-top: 16px;
  margin-bottom: 30px;
  max-width: 232px;
`;

const Action = styled.p`
  margin-top: auto;
  font-weight: 700;
  font-size: 18px;
  line-height: 17px;
  color: #d92cff;
`;

export default BlogCard;