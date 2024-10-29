import React, { Component } from "react";
import styled from "styled-components";
import logEvent from "../../lib/logEvent";

const ContentLink = styled.a` 
text-decoration: none;
`;

const ReadMoreLink = styled.a`
  text-decoration: none;
  color: #5c6ac4;
`;

const ImageDiv = styled.div`
  background-image: ${props =>
    props.coverImage && `url( ${props.coverImage} )`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  padding-top: 47.5%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ContentContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  border-radius: 10px;
  cursor: pointer;
`;

const ContentContainerDiv = styled.div`
  background: white;
  padding: 16px 16px 20px 16px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
`;

const ContentTitle = styled.span`
  position: relative;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  color: #000639;
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
const ContentText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 6, 57, 0.6);
`;

const BottomButton = styled.button`
  border: none;
  background: none;
  text-align: center;
  color: #ff6e99;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  font-size: 16px;
`;
const Button = styled.button`
  /* max-width: 230px; */
  width: 100%;
  color: white;
  border-radius: 5px;
  background: linear-gradient(96.69deg, #fe909c 0.65%, #ff6c98 96.18%);
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  height: 46px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  margin-top: 30px;
`;

const ButtonImg = styled.img`
  margin-left: 6px;
`;

const ArticleCard = ({
  url,
  skipOfferAction,
  coverImage,
  contentTitle,
  authorImage,
  authorName,
  contentText,
  buttonTitle,
  buttonClick,
  bottomButtonTitle,
  origin
}) => (
  <ContentLink
    href={url}
    target="_blank"
    onClick={() => {
      logEvent("click-content", { type: contentTitle, origin: origin });
      //window.open(url, "_blank");
    }}
  >
    <ContentContainer>
      <ImageDiv coverImage={coverImage} />
      <ContentContainerDiv>
        <ContentTitle>{contentTitle}</ContentTitle>
        <AuthorDataDiv>
          <AuthorImage authorImage={authorImage} />
          <AuthorName> {authorName} </AuthorName>
        </AuthorDataDiv>
        <ContentText>
          {contentText}
          {!buttonTitle && (
            <ReadMoreLink href={url} target="_blank">
              Read More
            </ReadMoreLink>
          )}
        </ContentText>
        {buttonTitle && (
          <Button
            onClick={e => {
              buttonClick();
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {buttonTitle}
            <ButtonImg src="/static/images/arrow-right.svg" />
          </Button>
        )}
        {bottomButtonTitle && (
          <BottomButton
            onClick={e => {
              skipOfferAction();
              e.stopPropagation();
              e.preventDefault();
            }}
            className="mobile"
          >
            {bottomButtonTitle}
          </BottomButton>
        )}
      </ContentContainerDiv>
    </ContentContainer>
  </ContentLink>
);

export default ArticleCard;
