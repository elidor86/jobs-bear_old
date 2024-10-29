import React, { Component } from "react";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import config from "../config/styleConsts";
import IconOk from "./Icon";
import logEvent from "../../lib/logEvent";

const { mobileMaxWidth } = config;

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #606fc7 0%, #5865c1 100%);
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const ContentDiv = styled.div`
  max-width: 452px;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 16px;
  text-align: center;
  @media (max-width: ${mobileMaxWidth}) {
    text-align: left;
  }
`;

const Button = styled.button`
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
  padding-left: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    padding: 11px 20px;
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
  color: #666a88;
  padding-left: 18px;
  padding-right: 4px;
  ::placeholder {
    color: #5c6ac4;
    /* font-weight: 500; */
    font-size: 16px;
    /* line-height: 19px; */
  }
`;

const ButtonImg = styled.img`
  margin-left: 5px;
  @media (max-width: ${mobileMaxWidth}) {
    margin-left: 0px;
  }
`;

const InputGroupForm = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  position: relative;
`;

const Email = styled.div``;

const ConfirmationDiv = styled.div`
  height: 46px;
  border-radius: 5px;
  background: #00d26c;
  color: white;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

const Text = styled.div`
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  opacity: 0.6;
  color: white;
  @media (max-width: ${mobileMaxWidth}) {
    text-align: left;
  }
`;

const ButtonTitle = styled.div`
  white-space: nowrap;
`;

class EmailSmallCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: true,
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
          logEvent("track-email_success", {
            origin: this.props.origin || "email_small_card",
            content: email
          });
          this.setState({ showConfirm: true });
        },
        message => {
          this.setState({ error: true, errorMessage: message });
        }
      );
    }
    logEvent("click-email_submit", { origin: "email_card_small" });
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
            origin: "email_card_small",
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
      placeholder,
      disclaimerText,
      successText,
      buttonTitle
    } = this.props;
    const { error, email, errorMessage, showConfirm } = this.state;
    return (
      <ContainerDiv>
        <ContentDiv>
          {showConfirm ? <Title>{successText}</Title> : <Title>{title}</Title>}
          {!showConfirm ? (
            <InputGroupForm onSubmit={this.submit} error={error}>
              <Input
                onChange={e => {
                  this.setState({ email: e.target.value, error: false });
                }}
                value={email}
                placeholder={placeholder}
              />
              <Button>
                <ButtonTitle className="desktop">{buttonTitle}</ButtonTitle>
                <ButtonImg src="/static/images/arrow-right.svg" />
              </Button>
              {error ? (
                <ErrorMessage position="bottom" message={errorMessage} />
              ) : null}
            </InputGroupForm>
          ) : (
            <ConfirmationDiv>
              <Email>{email}</Email>
              <IconOk />
            </ConfirmationDiv>
          )}
          <Text dangerouslySetInnerHTML={{ __html: disclaimerText }}>
            {/* {disclaimerText} */}
          </Text>
        </ContentDiv>
      </ContainerDiv>
    );
  }
}

EmailSmallCard.defaultProps = {
  title: "Get The Latest [keyword] Job Offers!",
  placeholder: "Enter Your Email",
  disclaimerText:
    "By enterting your email you agree to our privacy policy and terms of use and aware that your email would be shared with [PARTNER NAME], [PARTNER NAME], [PARTNER NAME].",
  successText: "We’ll send you job offers soon!",
  buttonTitle: "Get Offers",
  validate: (values, onError) => {
    onError(null);
  },
  onSubmit: (data, onSuccess, onError) => {
    onSuccess();
  }
};

export default EmailSmallCard;
