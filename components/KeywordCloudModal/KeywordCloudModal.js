import React, {Component} from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import config from "../config/styleConsts";
import logEvent from "../../lib/logEvent";
import Router from "next/router";
import buildJobSearchQueryString from "../../lib/buildJobSearchQueryString";

const {mobileMaxWidth} = config;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  max-width: 375px;
  max-height: 450px;
  /* height: 427px; */
  width: 374px;
  @media (max-width: ${mobileMaxWidth}) {
    /* height: 427px; */
    width: 90%;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  text-align: center;
  color: white;
  padding: 0px 16px;
  margin: 46px 0px 16px 0px;
  @media (max-width: ${mobileMaxWidth}) {
    margin: 46px 0px 16px 0px;
  }
`;
const ButtonGroup = styled.div`
  width: 270px;
  margin: 0px auto 26px auto;
  text-align: center;
`;

const ProminentCTA = styled.button`
  min-width: 70px;
  padding: 8px 14px 8px 14px;
  background: linear-gradient(92.79deg, #fe909c 0.65%, #ff6c98 96.18%);
  box-shadow: 0px 1px 4px rgba(77, 77, 77, 0.24);
  border-radius: 5px;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  text-align: center;
  color: white;
  cursor: pointer;
  margin: 5px;
`;

const SecondaryCTA = styled.button`
  font-size: 16px;
  line-height: 19px;
  text-decoration: underline;
  font-weight: bold;
  text-align: center;
  background: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  margin: 0px auto 28px auto;
  /* padding: 46px 16px 16px 16px; */
`;

export default class KeywordCloudModal extends React.Component {
    componentDidMount() {

        // console.log("KeywordCloudModal componentDidMount")

        if (this.props.isOpen) {
            logEvent("show-missing_keywords_popup");
        }
    }

    render() {
        const {
            isOpen,
            onRequestClose,
            onSelectKeyword,
            onOpenSearchModal,
            app
        } = this.props;
        const keywordCloudArray = app.i18n.keywordCloudArray;
        return (
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={onRequestClose}
                style={{
                    overlay: {
                        background: "linear-gradient(121.33deg, #5C6AC4 0%, #202E78 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 999999999
                    },
                    content: {
                        background: "none",
                        border: "none",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        inset: "auto",
                        padding: 0,
                        margin: "auto",
                        position: "relative",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }}
            >
                <CloseIcon
                    onClick={() => {
                        onRequestClose();
                        logEvent("click-dismiss_keyword_cloud_popup", {origin: "cloud_popup"});
                    }}
                    src="/static/images/icon-close.svg"
                />
                <Container>
                    <Title
                        dangerouslySetInnerHTML={{
                            __html: `We have <b>736</b> jobs available ${
                                app.getLocation() !== "" && app.getLocation()
                                    ? "in " + app.getLocation()
                                    : ""
                            }. What type of work are you looking for?`
                        }}
                    ></Title>
                    <ButtonGroup>
                        {keywordCloudArray.map(keyword => {
                            return (
                                <ProminentCTA
                                    key={keyword}
                                    onClick={() => {
                                        app.setKeyword(keyword);
                                        onRequestClose();
                                        app.showLoader();
                                        logEvent("click-keyword", {content: keyword});
                                        let params;
                                        params = Router.query;
                                        window.location.href = `jobs?${buildJobSearchQueryString({
                                            ...params,
                                            keyword
                                        })}`;
                                    }}
                                >
                                    {keyword}
                                </ProminentCTA>
                            );
                        })}
                    </ButtonGroup>
                    <SecondaryCTA
                        onClick={() => {
                            onRequestClose();
                            onOpenSearchModal();
                            logEvent("click-other", {origin: "keywords_popup"});
                            // open search modal if possible
                        }}
                    >
                        I’m looking for something else
                    </SecondaryCTA>
                </Container>
            </Modal>
        );
    }
}
