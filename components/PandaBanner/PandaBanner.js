import React, { Component } from "react";
import styled from "styled-components";
import logEvent from "../../lib/logEvent";

const BannerContainer = styled.div`
  position: fixed;
  bottom: 0px;
  min-height: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px -2px 10px #d2d2d2;
  ${props => props.hide && `display: none`}
`;

const Subtitle = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* or 114% */
  display: flex;
  align-items: center;
  margin-bottom: auto;
  /* Black */
  color: #000639;
  margin-top: 8px;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  justify-content: center;
`;

const Image = styled.img`
  height: 88px;
  width: auto;
  object-fit: cover;
`;

const Title = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  /* or 114% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  color: #4a58ad;
  margin: 3px auto;
`;

const Subheader = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* or 114% */
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  color: rgba(0, 6, 57, 0.6);
`;

const BottomText = styled.div`
  margin: auto;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* or 150% */
  display: flex;
  align-items: center;
  text-align: center;
  /* Black */
  color: #000639;
  margin: 6px auto 10px auto;
`;

export default class PandaBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
  }

  render() {
    return (
      <BannerContainer hide={this.state.hide}>
        <CloseIcon
          onClick={() => {
            this.setState({ hide: true });
            logEvent("click-dismiss_panda_banner", {
              origin: "click-close_whatsapp_banner"
            });
          }}
          src="/static/icons/close_circle_purple.svg"
        />
        <Image src="/static/images/panda_image.png"></Image>
        <Title>YOU APPLY TO JOBS, WE SAVE PANDAS</Title>
        <Subheader>
          Jobs Bear is like any other job board, with one major difference: we
          use our profits save panda bears.
        </Subheader>
        <BottomText>APPLY TO&nbsp;<b>5</b>&nbsp;JOBS TO MAKE AN IMPACT</BottomText>
      </BannerContainer>
    );
  }
}
