import React, { Component } from "react";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import config from "../config/styleConsts";
import IconOk from "./Icon";
import logEvent from "../../lib/logEvent";

const {mobileMaxWidth, purple} = config;

const SigUpDiv = styled.div`
  position: sticky;
  position: -webkit-sticky;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  background: rgb(92, 106, 196);
  background: linear-gradient(
    0.44deg,
    #5c6ac4 93.44%,
    rgba(255, 255, 255, 0) 99.63%
  );
  width: 100%;
  z-index: 100;
  min-height: 288px;
`;

const FooterDiv = styled.div`
  padding: 16px 12px;
  background: #eff1f9;
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  color: #8f93ac;
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  ${props => props.hide && "visibility: hidden;"}
`;

const ContentDiv = styled.div`
  padding: 34px 33px 20px 33px;
  box-sizing: border-box;
  min-height: 245px;
  max-width: 460px;
  margin: 0 auto;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: ${mobileMaxWidth}) {
    justify-content: space-between;
  }
`;

const Email = styled.div``;

const Button = styled.button`
  ${props => props.hide && "visibility: hidden;"}
  margin: 0;
  height: 46px;
  background: linear-gradient(93.27deg, #fe909c 0.65%, #ff6c98 96.18%);
  border: none;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: white;
  cursor: pointer;
  padding: 11px 10px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    justify-content: center;
    border-radius: 5px;
    text-align: center;
    margin-top: 5px;
    box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 0;
  height: 46px;
  border: none;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000639;
  padding-left: 18px;
  padding-right: 4px;
  ${props => props.hide && "visibility: hidden;"}
  ::placeholder {
    color: #5c6ac4;
    font-size: 16px;
    font-weight: 500;
  }
  @media (max-width: ${mobileMaxWidth}) {
    border-radius: 5px;
    padding-left: 4px;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  }
`;

const Img = styled.img`
  margin-left: 8px;
`;

const LinkDivBack = styled.div`
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 0.8);
  ${props => props.hide && "visibility: hidden;"}
`;

const ConfirmationDiv = styled.div`
  height: 46px;
  border-radius: 5px;
  background: #00d26c;
  color: white;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  padding-right: 37px;
  padding-left: 16px;
  box-sizing: border-box;
  font-weight: 500;
`;

const InputGroupForm = styled.form`
  ${props => props.hide && "visibility: hidden;"}
  position: relative;
  display: flex;
  @media (max-width: ${mobileMaxWidth}) {
    flex-direction: column;
  }
`;

const TextDiv = styled.div`
  width: 100%;
  position: relative;
`;

const TextSuccess = styled.div`
  position: flex;
  flex-direction: column;
  justify-content: space-around;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 16px;
  width: 100%;
`;

class EmailPromptBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: false,
      showConfirm: false,
      errorMessage: ""
    };
  }

  triggerOnSubmit = () => {
    const { onSubmit, distinationRedirect } = this.props;
    const { email } = this.state;

    if (typeof onSubmit === "function") {
      onSubmit(
        { email },
        () => {
          logEvent("track-email_success", {
            origin: this.props.origin || "email_popup",
            content: email
          });
          if (typeof distinationRedirect == "function") {
            distinationRedirect();
          }

          // NOTE: This might cause some browsers to detect the new window as a popup
          // this.setState({showConfirm: true}, () => {
          //   setTimeout(() => {
          //     this.setState({showConfirm: false});
          //     if(typeof distinationRedirect == 'function'){
          //       distinationRedirect();
          //     }
          //   }, 1500);
          // });
        },
        message => {
          this.setState({ error: true, errorMessage: message });
        }
      );
    }
  };

  submit = e => {
    e.preventDefault();
    const { validate } = this.props;
    const email = this.state.email.trim();

    if (typeof validate === "function") {
      validate({ email }, errors => {
        if (errors && errors.email) {
          this.setState({
            error: true,
            errorMessage: errors.email
          });
          logEvent("show-email_error", {
            origin: "email_prompt_bar",
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
    const { error, email, showConfirm, errorMessage } = this.state;
    const {
      show,
      disclaimerText,
      successText,
      closeModal,
      text,
      placeholder,
      secondaryCTA,
      CTA,
      origin
    } = this.props;
    return (
      <SigUpDiv>
        <ContentDiv>
          <TextDiv>
            <Text hide={showConfirm}>{text}</Text>
            {showConfirm && <TextSuccess>{successText}</TextSuccess>}
          </TextDiv>

          <InputGroupForm onSubmit={this.submit} error={error}>
            {error && <ErrorMessage position="top" message={errorMessage} />}
            {showConfirm ? (
              <ConfirmationDiv>
                <Email>{email}</Email>
                <IconOk />
              </ConfirmationDiv>
            ) : null}
            <Input
              hide={showConfirm}
              onChange={e => {
                this.setState({ email: e.target.value, error: false });
              }}
              onFocus={() => {
                logEvent("click-email_input", { origin: "email_prompt_bar" });
              }}
              value={email}
              placeholder={placeholder}
            />
            <Button hide={showConfirm}>
              {CTA}
              <Img src="/static/images/arrow-right.svg" />
            </Button>
          </InputGroupForm>
          <LinkDivBack hide={showConfirm} onClick={closeModal}>
            {secondaryCTA}
          </LinkDivBack>
        </ContentDiv>
        <FooterDiv dangerouslySetInnerHTML={{ __html: disclaimerText }} />
      </SigUpDiv>
    );
  }
}

export default EmailPromptBar;
