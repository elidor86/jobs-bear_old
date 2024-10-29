import React, { Component } from "react";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import ArticleCard from "../ArticleCard/ArticleCard";
import config from "../config/styleConsts";
import logEvent from "../../lib/logEvent";

const { mobileMaxWidth } = config;

const ContainerDiv = styled.div`
  width: 660px;
  display: flex;
  padding: 32px 16px;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: ${mobileMaxWidth}) {
    width: auto;
    padding: 0;
  }
`;

const TopText = styled.div`
  color: white;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  max-width: 443px;
  width: 100%;
  text-align: center;
`;

const ContentDiv = styled.div`
  max-width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media (max-width: ${mobileMaxWidth}) {
    margin: 0;
    padding: 0;
  }
`;

const BottomButton = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const Button = styled.button`
  max-width: 230px;
  width: 100%;
  color: white;
  border-radius: 5px;
  background: linear-gradient(96.69deg, #fe909c 0.65%, #ff6c98 96.18%);
  height: 46px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

class ExitIntent extends Component {
  componentDidUpdate() {
    if (this.props.show) {
      logEvent("show-exit_intent");
    }
  }

  render() {
    const {
      show,
      url,
      coverImage,
      contentTitle,
      authorImage,
      authorName,
      contentText,
      buttonTitle,
      bottomButtonTitle,
      onClose,
      skipOfferAction,
      buttonClick
    } = this.props;
    return (
      <Modal isOpen={show}>
        <ContainerDiv>
          <CloseIcon
            onClick={() => {
              onClose();
            }}
            className="desktop"
            src="/static/images/icon-close.svg"
          />
          <ContentDiv>
            <ArticleCard
              url={url}
              coverImage={coverImage}
              contentTitle={contentTitle}
              authorImage={authorImage}
              authorName={authorName}
              contentText={contentText}
              buttonTitle={buttonTitle}
              buttonClick={buttonClick}
              bottomButtonTitle={bottomButtonTitle}
              skipOfferAction={skipOfferAction}
              origin="exit_intent"
            />
          </ContentDiv>
          <BottomButton
            className="desktop"
            onClick={() => {
              logEvent("click-card", { origin: "click-skip_offer" });
              skipOfferAction();
            }}
          >
            {bottomButtonTitle}
          </BottomButton>
        </ContainerDiv>
      </Modal>
    );
  }
}

export default ExitIntent;
