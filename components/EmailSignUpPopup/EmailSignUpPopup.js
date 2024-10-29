import React, {Component} from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import config from "../config/styleConsts";
import IconOk from "./Icon";
import logEvent from "../../lib/logEvent";

const {mobileMaxWidth} = config;

const SigUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 460px;
`;

const FooterDiv = styled.div`
  padding: 16px 12px;
  background: #eff1f9;
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  color: #8f93ac;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 16px;
  ${props => props.hide && "visibility: hidden;"}
`;

const Text = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 20px;
  ${props => props.hide && "visibility: hidden;"}
`;

const ContentDiv = styled.div`
  padding-top: 34px;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  width: 100%;
  color: white;
  text-align: center;
`;

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
    margin-top: 10px;
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
  min-height: 36px;
  font-size: 16px;
  line-height: 36px;
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
  /* margin-bottom: 65px; */
`;

const InputGroupForm = styled.form`
  ${props => props.hide && "visibility: hidden;"}
  position: relative;
  display: flex;
  @media (max-width: ${mobileMaxWidth}) {
    flex-direction: column;
  }
  margin-bottom: 20px;
`;

const Email = styled.div``;

const TextDiv = styled.div`
  width: 100%;
  position: relative;
`;

const TextSuccess = styled.div`
  position: absolute;
  bottom: 0;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 16px;
  width: 100%;
`;

class EmailSignUpPopup extends Component {

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
        const {onSubmit, distinationRedirect} = this.props;
        const {email} = this.state;

        if (typeof onSubmit === "function") {
            onSubmit(
                {email},
                () => {
                    logEvent("track-email_success", {
                        origin: this.props.origin || "email_popup",
                        content: email
                    });
                    this.setState({showConfirm: true}, () => {
                        if (typeof distinationRedirect == "function") {
                            distinationRedirect();
                        }
                        // setTimeout(() => { // NOTE: This might cause some browsers to detect the new window as a popup
                        //   this.setState({showConfirm: false});
                        //   if(typeof distinationRedirect == 'function'){
                        //     distinationRedirect();
                        //   }
                        // }, 300);
                    });
                },
                message => {
                    this.setState({error: true, errorMessage: message});
                }
            );
        }
    };

    submit = e => {
        e.preventDefault();
        const {validate} = this.props;
        const email = this.state.email.trim();

        if (typeof validate === "function") {
            validate({email}, errors => {
                if (errors && errors.email) {
                    this.setState({
                        error: true,
                        errorMessage: errors.email
                    });
                    logEvent("show-email_error", {
                        origin: "email_popup",
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
        const {error, email, showConfirm, errorMessage} = this.state;
        const {
            show,
            disclaimerText,
            successText,
            title,
            closeModal,
            text,
            placeholder,
            secondaryCTA,
            CTA,
            origin
        } = this.props;

        return (
            <Modal isOpen={show}>
                <SigUpDiv>
                    <CloseIcon
                        onClick={() => {
                            closeModal();
                            logEvent("click-dismiss_email_popup", {origin: "popup"});
                        }}
                        src="/static/images/icon-close.svg"
                    />

                    <ContentDiv>
                        <TextDiv>
                            <Title hide={showConfirm}>{title}</Title>
                            <Text hide={showConfirm}>{text}</Text>
                            {showConfirm && <TextSuccess>{successText}</TextSuccess>}
                        </TextDiv>

                        <InputGroupForm onSubmit={this.submit} error={error}>
                            {/* {error && <ErrorMessage position="toptop" message={errorMessage} />} */}
                            {showConfirm ? (
                                <ConfirmationDiv>
                                    <Email>{email}</Email>
                                    <IconOk/>
                                </ConfirmationDiv>
                            ) : null}
                            <Input
                                hide={showConfirm}
                                onChange={e => {
                                    this.setState({email: e.target.value, error: false});
                                }}
                                onFocus={() => {
                                    logEvent("click-email_input", {origin: "email_popup"});
                                }}
                                value={email}
                                placeholder={placeholder}
                                autoComplete="email"
                                type="email"
                            />
                            {error && <ErrorMessage position="toptop" message={errorMessage}/>}
                            <Button hide={showConfirm}>
                                {CTA}
                                <Img src="/static/images/arrow-right.svg"/>
                            </Button>
                        </InputGroupForm>
                        <LinkDivBack hide={showConfirm} onClick={closeModal}>
                            {secondaryCTA}
                        </LinkDivBack>
                    </ContentDiv>
                    <FooterDiv dangerouslySetInnerHTML={{__html: disclaimerText}}>
                        {/* {disclaimerText} */}
                    </FooterDiv>

                </SigUpDiv>
            </Modal>
        );
    }
}

export default EmailSignUpPopup;
