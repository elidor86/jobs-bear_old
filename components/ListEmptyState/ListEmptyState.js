import React, { Component } from "react";
import styled from "styled-components";
import EmailPromptBar from "../EmailPromptBar/EmailPromptBar";
import validateEmailForm from "../../lib/validateEmailForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import config from "../config/styleConsts";
import IconOk from "./Icon";
import logEvent from "../../lib/logEvent";
import _ from "underscore";
import Router from "next/router";
import buildJobSearchQueryString from "../../lib/buildJobSearchQueryString";
import DisplayAd from "../DisplayAd/DisplayAd";

const { mobileMaxWidth, purple } = config;

const Container = styled.div`
  ${props =>
    props.white ? "background-color: white;" : "background-color: #eff1f9;"}

  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 16px 32px;
  @media (max-width: ${mobileMaxWidth}) {
    padding: 16px 16px;
  }
`;

const EmptyStateCard = styled.div`
  background: #5c6ac4;
  box-shadow: 0px 2px 4px rgba(0, 6, 57, 0.05);
  border-radius: 10px;
  padding: 0px 32px 29px 32px;
  @media (max-width: ${mobileMaxWidth}) {
    padding: 0px 16px 29px 16px;
  }
`;

const SecondaryTitle = styled.h1`
  color: #000639;
  opacity: 0.6;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 16px;
`;

const RunningText = styled.h2`
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
  color: #ffffff;
  margin: 16px 0px;
  ${props => props.hide && "visibility: hidden;"}
`;

const Dropdown = styled.select`
  -webkit-appearance: none;
  background: url(static/images/apply-arrow-down.svg) no-repeat right white;
  background-position-x: 270px;
  ${props => props.hide && "visibility: hidden;"}
  /* background: #ffffff; */
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  border-radius: 5px;
  height: 46px;
  width: 296px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #5c6ac4;
  /* padding-left: 18px; */
  border: none;
  text-align: center;
  text-align-last: center;
  @media (max-width: 400px) {
    width: 100%;
  }

`;

const Option = styled.option`
  text-align: center;
  text-align-last: center;
`;

const SecondayAction = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  text-decoration-line: underline;
  color: #5c6ac4;
  cursor: pointer;
  background: none;
  margin: auto;
  margin-bottom: 20px;
`;

const Text = styled.div`
  text-align: center;
  font-size: 11px;
  line-height: 14px;
  color: #000639;
  opacity: 0.4;
  margin: 16px 0px;
`;

const Email = styled.div``;

const Button = styled.button`
  ${props => props.hide && "visibility: hidden;"}
  margin: 0;
  height: 46px;
  width: 296px;
  margin: auto;
  background: linear-gradient(93.27deg, #fe909c 0.65%, #ff6c98 96.18%);
  border: none;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: white;
  cursor: pointer;
  padding: 11px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  margin-top: 5px;
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  margin: 0;
  height: 46px;
  width: 296px;
  margin: auto;
  border: none;
  box-sizing: border-box;
  /* border-top-left-radius: 5px;
  border-bottom-left-radius: 5px; */
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000639;
  padding-left: 18px;
  padding-right: 4px;
  border-radius: 5px;
  ${props => props.hide && "visibility: hidden;"}
  padding-left: 4px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  ::placeholder {
    color: #5c6ac4;
    font-size: 16px;
    font-weight: 500;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const Img = styled.img`
  margin-left: 8px;
`;

const ConfirmationDiv = styled.div`
  height: 46px;
  width: 296px;
  border-radius: 5px;
  background: #00d26c;
  color: white;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  padding-right: 37px;
  padding-left: 16px;
  box-sizing: border-box;
  font-weight: 500;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const InputGroupForm = styled.form`
  ${props => props.hide && "visibility: hidden;"}
  position: relative;
  display: flex;
  flex-direction: column;
  width: 296px;
  margin: auto;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const TextDiv = styled.div`
  width: 100%;
  position: relative;
`;

const FollowupAction = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-decoration-line: underline;
  color: rgba(255, 255, 255, 0.8);
  background: none;
  cursor: pointer;
  margin: auto;
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

export default class ListEmptyState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providedEmail: this.props.providedEmail,
      email: "",
      error: false,
      showConfirm: false,
      errorMessage: "",
      selectInputValue: "Right Now"
    };
  }

  handleSelectInputChange(event) {
    this.setState({ selectInputValue: event.target.value });
  }

  triggerOnSubmit = () => {
    const { app } = this.props;
    const { email } = this.state;
    this.setState({ showConfirm: true });
    app.setProvidedEmail(email);
    logEvent("click-email_submit", {
      origin: "list_empty_state"
    });
    logEvent("track-email_success", {
        origin: "list_empty_state",
        content: email
      });
  };

  getPageTitle() {
    let title = "";
    const { app } = this.props;
    const keyword = app.state.keyword;
    const formattedAddress = app.state.location.formattedAddress;

    if (this.state.providedEmail) {
      if (keyword && formattedAddress) {
        title = `We couldn’t find anything for <strong>${keyword}</strong> in ${formattedAddress}. Select a different type of work you are interested in:`;
      } else if (keyword && !formattedAddress) {
        title = `We couldn’t find anything for <strong>${keyword}</strong>. Select a different type of work you are interested in:`;
      } else if (keyword && !formattedAddress) {
        title = `We couldn’t find anything in ${formattedAddress}. Select a different type of work you are interested in:`;
      }
    } else {
      if (keyword && formattedAddress) {
        title = `We’ve found top 10 <strong>${keyword}</strong> jobs in ${formattedAddress}!`;
      } else if (keyword && !formattedAddress) {
        title = `We’ve found <strong>${keyword}</strong> jobs!`;
      } else if (keyword && !formattedAddress) {
        title = `We’ve foundjobs in ${formattedAddress}!`;
      }
    }
    return title;
  }

  submit = e => {
    e.preventDefault();
    const email = this.state.email.trim();

    validateEmailForm({ email }, errors => {
      if (errors && errors.email) {
        this.setState({
          error: true,
          errorMessage: errors.email
        });
        logEvent("show-email_error", {
          origin: "list_empty_state",
          content: email
        });
      } else {
        this.triggerOnSubmit();
      }
    });
  };

  render() {
    const { error, email, showConfirm, errorMessage } = this.state;
    const { app } = this.props;
    return (
      <>
        {this.state.providedEmail ? (
          <Container white={true}>
            <SecondaryTitle
              dangerouslySetInnerHTML={{
                __html: this.getPageTitle()
              }}
            />
            <ButtonGroup>
              {app.i18n.keywordCloudArray.map(keyword => {
                return (
                  <ProminentCTA
                    key={keyword}
                    onClick={() => {
                      app.showLoader();
                      logEvent("click-keyword_empty_state", {
                        content: keyword
                      });
                      let params = Router.query;
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
            <SecondayAction
              onClick={() => {
                logEvent("click-im_looking_for_something_else", {
                  origin: "list_empty_state_has_email"
                });
                const params = Router.query;
                window.location.href = `jobs?${buildJobSearchQueryString(
                  _.omit(params, "keyword")
                )}`;
              }}
            >
              I’m looking for something else
            </SecondayAction>
          </Container>
        ) : (
          <Container>
            <SecondaryTitle
              dangerouslySetInnerHTML={{
                __html: this.getPageTitle()
              }}
            />
            <EmptyStateCard>
              {!showConfirm && (
                <RunningText hide={showConfirm}>
                  How soon can you start?
                </RunningText>
              )}
              {!showConfirm && (
                  <Dropdown
                    value={this.state.selectInputValue}
                    onChange={this.handleSelectInputChange.bind(this)}
                  >
                    <Option value="Right Now">Right Now</Option>
                    <Option value="in 1-2 weeks">1-2 weeks</Option>
                    <Option value="in 3-4 weeks">3-4 weeks</Option>
                  </Dropdown>
              )}
              <TextDiv>
                <RunningText
                  hide={showConfirm}
                  dangerouslySetInnerHTML={{
                    __html: `Enter your email to get offers for ${app.state
                      .keyword ||
                      ""} jobs hiring <strong>${this.state.selectInputValue.toLowerCase()}</strong>.`
                  }}
                ></RunningText>
                {showConfirm && (
                  <RunningText>We will send you job offers soon.</RunningText>
                )}
              </TextDiv>
              <InputGroupForm onSubmit={this.submit} error={error}>
                {error && (
                  <ErrorMessage position="bar" message={errorMessage} />
                )}
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
                    logEvent("click-email_input", {
                      origin: "list_empty_state"
                    });
                  }}
                  value={email}
                  placeholder="Enter Your Email"
                  autoComplete="email"
                  type="email"
                />
                <Button hide={showConfirm}>
                  Continue
                  <Img src="/static/images/arrow-right.svg" />
                </Button>
              </InputGroupForm>
              {showConfirm && app.state.location.formattedAddress && (
                <FollowupAction
                  onClick={() => {
                    logEvent("click-see_more_job_offers", {
                      origin: "list_empty_state"
                    });
                    const params = Router.query;
                    window.location.href = `jobs?${buildJobSearchQueryString(
                      _.omit(params, "keyword")
                    )}`;
                  }}
                >{`See more job offers in ${app.state.location.formattedAddress}`}</FollowupAction>
              )}
            </EmptyStateCard>
            <Text
              dangerouslySetInnerHTML={{
                __html: app.i18n.emailOptinText
              }}
            ></Text>
            <SecondayAction
              onClick={() => {
                logEvent("click-see_other_jobs", {
                  origin: "list_empty_state"
                });
                const params = Router.query;
                window.location.href = `jobs?${buildJobSearchQueryString(
                  _.omit(params, "keyword")
                )}`;
              }}
            >
              See other job offers
            </SecondayAction>
          </Container>
        )}
        <DisplayAd height="auto" width="100%" />
        <div style={{height: '20px', width:'100%'}}></div>
      </>
    );
  }
}
