import React, {Component} from "react";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import config from "../config/styleConsts";
import logEvent from "../../lib/logEvent";

const {mobileMaxWidth} = config;

const ContainerDiv = styled.div`
  min-width: 330px;
  min-height: 366px;
  display: flex;
  padding: 32px 16px;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: ${mobileMaxWidth}) {
    width: 300px;
  }
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
  text-decoration: underline;
  margin-top: 10px;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

const Header = styled.h1`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  margin: 0px 0px 16px 0px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Title = styled.h2`
  color: #1d1b9f;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  margin: 0px 0px 3px 0px;
`;
const Subtitle = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  margin: 0px 0px 3px 0px;
  color: #0b6427;
`;
const Description = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin: 0px;
  color: #222222;
`;

class ExitIntentV2 extends Component {
    componentDidUpdate() {
        if (this.props.show) {

        }
    }

    render() {
        const {show, onClose, serpClick, skipOfferAction, keyword, location} = this.props;

        let Display = false;

        try {
            if (window.location.href.search("/jobs") > -1 && show == true) {
                Display = true
            } else {
                Display = false
            }
        } catch (e) {

        }


        return (
            <Modal isOpen={Display}>
                <ContainerDiv>
                    <CloseIcon
                        onClick={() => {
                            onClose();
                        }}
                        src="/static/images/icon-close.svg"
                    />
                    <ContentDiv>

                        <Header>Don’t Miss These Job Offers</Header>

                        <Card onClick={serpClick}>
                            <Title>{`${
                                keyword ? keyword : ""
                            } | Competitive Salary & Great Benefits | ${
                                location ? location : ""
                            }`}</Title>
                            <Subtitle>Posted by HR solutions ltd.</Subtitle>
                            <Description>{`Immediate start - Employees urgently needed. Looking for ${
                                keyword ? keyword : ""
                            } employee...`}</Description>
                        </Card>

                        <Card onClick={serpClick}>
                            <Title>{`Hiring Now! ${keyword ? keyword : ""} ${
                                location ? `in` : ""
                            } ${location ? location : ""}`}</Title>
                            <Subtitle>Posted by JobNow</Subtitle>
                            <Description>{`Join our ${
                                keyword ? keyword : ""
                            } team. Apply today - start tomorrow. Click for more details.`}</Description>
                        </Card>

                    </ContentDiv>
                    <BottomButton
                        onClick={() => {
                            logEvent("click-card", {origin: "click-skip_offer"});
                            serpClick(true);
                        }}
                    >
                        No thanks, continue to jobs
                    </BottomButton>
                </ContainerDiv>
            </Modal>
        );
    }
}

export default ExitIntentV2;
