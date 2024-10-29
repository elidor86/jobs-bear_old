import React, { Component } from "react";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import config from "../config/styleConsts";
import IconOk from "./Icon";
import logEvent from "../../lib/logEvent";

const { mobileMaxWidth } = config;

const ContainerDiv = styled.div`
  display: flex;
  background: linear-gradient(169.81deg, #5c6ac4 0%, #202e78 100%);
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  color: white;
  overflow: hidden;
`;

const ContentDiv = styled.div`
  /* padding: 32px 0; */
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

const ContentDivEmail = styled.div`
  width: 100%;
  display: flex;
  /* position: absolute; */
  justify-content: center;
  z-index: 9;
`;

const BearIcon = styled.img`
  position: absolute;
  bottom: 0;
`;

const BearIconMobile = styled.img`
  width: 324px;
  margin-bottom: 20px;
`;

const NeverMissContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 32px;
  margin-top: 38px;
  margin-bottom: 40px;
  align-items: center;
  min-height: 211px;
  width: 296px;
  box-sizing: border-box;
`;

const NeverMissTitle = styled.div`
  ${props => props.hide && "visibility: hidden;"}
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
`;

const NeverMissText = styled.div`
  font-style: normal;
  ${props => props.hide && "visibility: hidden;"}
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding-top: 16px;
  /* max-width: 80%; */
`;

const Form = styled.form`
  padding-top: 20px;
  position: relative;
`;

const NeverMissFooterDiv = styled.div`
  background: #eff1f9;
  min-height: 52px;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;
  color: #8f93ac;
  padding: 12px 32px;
  text-align: center;
  box-sizing: border-box;
`;

const InputBlock = styled.div`
  ${props => props.hide && "visibility: hidden;"}
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 5px;
  position: relative;
  background: #ffffff;
  min-width: 296px;
  border: none;
  font-size: 16px;
  box-sizing: border-box;
  text-align: center;
  padding: 0px 16px;
  height: 46px;
  ::placeholder {
    color: #606fc7;
    font-size: 16px;
  }
`;

const Button = styled.button`
  min-height: 47px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  background: linear-gradient(94.2deg, #fe909c 0.65%, #ff6c98 96.18%);
  padding: 0px 50px;
  align-items: center;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonIcon = styled.img`
  margin-left: 6px;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
`;

const ButtonDesctop = styled(Button)`
  ${props => props.hide && "visibility: hidden;"}
  background: linear-gradient(94.2deg, #FE909C 0.65%, #FF6C98 96.18%);
  border: none;
  border-radius: 5px;
  margin-top: 16px;
  min-width: 296px;
  display: flex;
  justify-content: center;
`;

const ConfirmationDiv = styled.div`
  height: 46px;
  border-radius: 5px;
  background: #00d26c;
  color: white;
  position: absolute;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 296px;
  padding-right: 37px;
  padding-left: 16px;
  font-weight: 500;
`;

const TextDiv = styled.div`
  width: 100%;
  position: relative;
`;

const TextSuccess = styled.div`
  position: absolute;
  bottom: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
`;

class EmailBigCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: false,
      errorMessage: "",
      showConfirm: false
    };
  }

  triggerOnSubmit = () => {
    const { onSubmit } = this.props;
    const email = this.state.email.trim();

    if (typeof onSubmit === "function") {
      onSubmit(
        { email },
        () => {
          this.setState({ showConfirm: true });
          logEvent("track-email_success", {
            origin: this.props.origin || "email_card_large",
            content: email
          });
        },
        message => {
          this.setState({ error: true, errorMessage: message });
        }
      );
    }
    logEvent("click-email_submit", {
      origin: this.props.origin || "email_card_large"
    });
  };

  submit = e => {
    e.preventDefault();
    const { validate } = this.props;
    const { email } = this.state;

    if (typeof validate === "function") {
      validate({ email }, errors => {
        if (errors && errors.email) {
          this.setState({
            error: true,
            errorMessage: errors.email
          });
          logEvent("show-email_error", {
            origin: "email_card_large",
            content: email
          });
        } else {
          this.triggerOnSubmit();
        }
      });
    } else {
      this.triggerOnSubmit();
    }
  };

  render() {
    const {
      title,
      text,
      placeholder,
      CTA,
      disclaimerText,
      imageLeft,
      image,
      imageRight,
      successText
    } = this.props;
    const { error, email, errorMessage, showConfirm } = this.state;
    return (
      <ContainerDiv>
        <ContentDiv>
          {imageLeft && (
            <BearIcon
              style={{ left: 0 }}
              className="desktop"
              src={imageLeft}
              alt=""
            />
          )}
          <NeverMissContent>
            {image && <BearIconMobile className="mobile" src={image} alt="" />}
            <TextDiv>
              <NeverMissTitle hide={showConfirm}>{title}</NeverMissTitle>
              <NeverMissText hide={showConfirm}>{text}</NeverMissText>
              {showConfirm && <TextSuccess>{successText}</TextSuccess>}
            </TextDiv>
            <Form onSubmit={this.submit}>
              {showConfirm && (
                <ConfirmationDiv>
                  {email}
                  <IconOk />
                </ConfirmationDiv>
              )}
              <InputBlock hide={showConfirm}>
                <Input
                  placeholder={placeholder}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  onFocus={() => {
                    logEvent("click-email_input", {
                      origin: this.props.origin || "email_card_large"
                    });
                  }}
                />
                {error ? (
                  <ErrorMessage position="top" message={errorMessage} />
                ) : null}
              </InputBlock>
              <ButtonDesctop hide={showConfirm}>
                {CTA}
                <ButtonIcon src="/static/images/arrow-right-icon.svg" />
              </ButtonDesctop>
            </Form>
          </NeverMissContent>
          {imageRight && (
            <BearIcon
              className="desktop"
              style={{ right: 0 }}
              src={imageRight}
              alt=""
            />
          )}
        </ContentDiv>
        <NeverMissFooterDiv
          dangerouslySetInnerHTML={{ __html: disclaimerText }}
        />
      </ContainerDiv>
    );
  }
}

export default EmailBigCard;
