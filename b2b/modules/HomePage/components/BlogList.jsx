import { useState } from "react";
import styled from "styled-components";
import BlogLogo from "../../../components/Logo/BlogLogo";
import BlogCard from "../../../components/BlogCard/BlogCard";
import Container from "../../../components/Container/Container";
import Button from "../../../components/Button/Button";
import useWindowDimensions from "../../../lib/useWindowDimensions";

const BlogList = ({ posts, country }) => {
  const [showMore, setShowMore] = useState(false);
  const { width } = useWindowDimensions();
  let iteration = 1
  const handleShowMore = () => setShowMore(true);
  const currentPosts = width > 801 || showMore ? posts : posts.slice(0, 2);

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <BlogLogo />
          <Row>
            {currentPosts.map((post) => {
              if(post.country.includes(country) && iteration <= 3 && iteration++) return (
                <BlogCard {...post} key={post.link + "-post"} />
              )
            })}
          </Row>
          <MobileOnly>
            {!showMore && (
              <ButtonWrapper>
                <Button onClick={handleShowMore}>
                  <ButtonText>VIEW ALL ARTICLES</ButtonText>
                </Button>
              </ButtonWrapper>
            )}
          </MobileOnly>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 49px 0;
  padding-top: 50px;
  background: #f0f1f9;

  @media (max-width: 601px) {
    padding: 40px 0 34px;
  }
`;

const InnerWrapper = styled.div`
  @media (max-width: 601px) {
    & svg {
      width: 267px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  column-gap: 76px;
  margin-top: 24px;

  > a {
    width: 290px;
  }

  @media (max-width: 801px) {
    flex-direction: column;
    row-gap: 30px;
    width: 100%;
    margin-top: 26px;

    > a {
      width: 100%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 28px;
`;

const ButtonText = styled.p`
  font-family: "Lato";
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  margin: 0 5px;
`;

const MobileOnly = styled.div`
  @media (min-width: 802px) {
    display: none;
  }
`;

export default BlogList;
