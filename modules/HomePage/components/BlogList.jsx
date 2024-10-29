import styled from "styled-components";

import BlogLogo from "../../../components/ext/Logo/BlogLogo";
import BlogCard from "../../../components/ext/BlogCard/BlogCard";
import Container from "../../../components/ext/Container/Container";

const BlogList = ({ posts }) => (
  <Wrapper>
    <Container>
      <BlogLogo />
      <Row>
        {posts.map((post) => (
          <BlogCard {...post} key={post.link + "-post"} />
        ))}
      </Row>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 49px 0;
  padding-top: 50px;
  background: #f0f1f9;
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
`;

export default BlogList;
