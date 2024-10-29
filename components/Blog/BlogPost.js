import React, { Component } from "react";
import styled from "styled-components";
import config from "../../components/config/styleConsts";
const { mobileMaxWidth, purple, black } = config;
//import "./styles.scss";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 19px 19px 30px 16px;
`;
const CoverImage = styled.img`
  width: 100%;
  height: 205px;
  object-fit: cover;
`;

const PostBody = styled.div`
  color: ${black};
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  line-height: 34px;
  display: flex;
  align-items: center;
  color: ${black};
  margin-top: 0px;
  margin-bottom: 8px;
`;

const AuthorDataDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AuthorImage = styled.div`
  width: 32px;
  height: 32px;
  background-image: ${props =>
    props.authorImage && `url( ${props.authorImage} )`};
  background-size: 32px 32px;
  border-radius: 50%;
  margin: 10px 10px 10px 0;
`;
const AuthorName = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #000639;
  opacity: 0.4;
`;

const BlogPost = ({ coverImage, authorName, authorImage, title, children }) => (
  <PostContainer>
    <CoverImage src={coverImage} />
    <Content>
      <Title>{title}</Title>
      <AuthorDataDiv>
        <AuthorImage authorImage={authorImage} />
        <AuthorName>{authorName}</AuthorName>
      </AuthorDataDiv>
      <PostBody className="postBody">{children}</PostBody>
    </Content>
  </PostContainer>
);

export default BlogPost;
