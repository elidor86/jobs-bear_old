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

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto 10px 10px;
`;
const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: auto;
  margin-top: 18px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: auto;
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

const Button = styled.button`
  width: 120px;
  height: 40px;
  background: linear-gradient(251.34deg, #5fd66a 5.18%, #22b13a 94.82%);
  border-radius: 5px;
  margin: auto 0px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  margin-left: 13px;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6px;
`;

const Image = styled.img`
  height: 30px;
  width: auto;
`;

const Logo = styled.img`
  height: 22px;
  width: 22px;
  margin-right: 3px;
  margin-left: 10px;
`;

const Title = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 13px;
  /* or 108% */
  display: flex;
  align-items: center;

  /* Black */
  color: #000639;
  opacity: 0.4;
  margin-top: auto;
`;

const Subheader = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 13px;
  /* or 108% */
  display: flex;
  align-items: center;

  /* Black */
  color: #000639;
  opacity: 0.6;
  margin-bottom: auto;
`;

const linkToWhatsapp = `https://wa.me/441618503849?text=Hey%20Emily,%20can%20you%20help%20me%20find%20a%20job?`;

export default class WhatsappBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
    this.generateWhatsappLink = this.generateWhatsappLink.bind(this);
  }

  generateWhatsappLink() {
    let url = `https://wa.me/441618503849?`;
    let message = `text=Hey%20Emily,%20can%20you%20help%20me%20find%20a%20job?`;

    const { location, keyword } = this.props;
    if (location && keyword) {
      message = encodeURI(
        `text=Hey Emily can you help me find ${keyword} jobs in ${location}?`
      );
    } else if (location) {
      message = encodeURI(
        `text=Hey Emily can you help me find jobs in ${location}?`
      );
    } else if (keyword) {
      message = encodeURI(
        `text=Hey Emily can you help me find ${keyword} jobs?`
      );
    }

    return url + message;
  }

  render() {
    return (
      <BannerContainer hide={this.state.hide}>
        <CloseIcon
          onClick={() => {
            this.setState({ hide: true });
            logEvent("click-dismiss_premium_flow", {
              origin: "click-close_whatsapp_banner"
            });
          }}
          src="/static/icons/closeIconGrey.svg"
        />
        <Container>
          <ColumnLeft>
            <Container>
              <Image src="/static/images/emilyWhatsapp.png" />
              <HeaderContainer>
                <Title>Emily Southorn</Title>
                <Subheader>Sr. Hiring Manager</Subheader>
              </HeaderContainer>
            </Container>
            <Subtitle>
              I helped more than 736 people get the job they want. I can help
              you too.
            </Subtitle>
          </ColumnLeft>
          <ColumnRight>
            <Button
              onClick={() => {
                logEvent("click-whatsapp_message_banenr");
                this.setState({ hide: true });
                window.open(this.generateWhatsappLink(), "_blank");
              }}
            >
              <Logo src="/static/images/whatsapp.png" />
              Message
            </Button>
          </ColumnRight>
        </Container>
      </BannerContainer>
    );
  }
}
