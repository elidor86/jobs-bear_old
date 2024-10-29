import styled from "styled-components";
import ArticleCard from "../ArticleCard/ArticleCard";

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 32px 16px;
`;

const AudioIcon = styled.img``;

const HeaderTitle = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #5c6ac4;
  padding-left: 9.5px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 5px;
  margin-bottom: 16px;
`;

const ContentBlock = ({ title, key, className, origin, ...articleProps }) => (
  <ContentDiv key={key} className={className}>
    {title && (
      <HeaderDiv>
        <AudioIcon src="/static/images/audio_icon.svg" />
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderDiv>
    )}

    <ArticleCard origin={origin} {...articleProps} />
  </ContentDiv>
);

export default ContentBlock;
