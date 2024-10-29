import React, {Component} from 'react';
import styled from 'styled-components';

import logEvent from "../../../../lib/logEvent";
import handleJobClick from "../../../../lib/handleJobClick";
import parseHTML from "html-react-parser";
import config from "../../../config/styleConsts";


const {mobileMaxWidth, black, purple} = config;


const JobListingHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 46px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 6, 57, 0.1);
  padding: 0px 20px;
  @media (max-width: ${mobileMaxWidth}) {
    padding: 0px 16px;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(180deg, #606fc7 0%, #5865c1 100%);
  box-shadow: 0px 4px 4px rgba(0, 6, 57, 0.12);
  border-radius: 5px;
  height: 46px;
  width: 150px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #606fc7;
  background: none;
  cursor: pointer;
  border: none;
  flex: row;
  justify-content: center;
`;

const JobListingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 16px 20px 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const DesktopButtonsPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #606fc7;
  box-sizing: border-box;
  border-radius: 10px;
  width: 210px;
  height: 145px;
  padding: 18px 0px;
  button {
    margin: auto;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 30px;
  line-height: 34px;
  color: ${black};
  margin: 0rem;
  margin: 0px 0px 5px 0px;
`;

const CompanyName = styled.h3`
  color: ${black};
  opacity: 0.6;
  font-size: 16px;
  line-height: 20px;
  margin: 5px 0px;
  max-width: 300px;
`;

const ProminentFeature = styled.a`
  margin: 5px 0px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  color: #5d6cc5;
  cursor: pointer;
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const SecondaryFeature = styled.div`
  margin: 5px 0px;
  flex-direction: row;
  justify-content: start;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${black};
  opacity: 0.3;
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const Description = styled.div`
  color: rgba(0, 6, 57, 0.6);
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  min-height: 120px;
`;

const JobListingViews = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  max-width: 110px;
  height: 30px;
  background: rgba(96, 111, 199, 0.1);
  font-size: 14px;
  line-height: 30px;
  color: rgba(96, 111, 199, 0.4);
  border-radius: 5px;
  img {
    margin-right: 4px;
    vertical-align: middle;
  }
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 16px;
  height: 80px;
  border-top: 1px solid rgba(0, 6, 57, 0.1);
  margin-top: 32px;
  @media (max-width: ${mobileMaxWidth}) {
    height: 70px;
    box-shadow: 0px -2px 4px rgba(0, 6, 57, 0.2);
    position: fixed;
    bottom: 0px;
    background: white;
    width: 100%;
    z-index: 100;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 0px;
    width: 300px;
    @media (max-width: ${mobileMaxWidth}) {
      width: 100%;
    }
  }
  p {
    margin: auto 0px;
    @media (max-width: ${mobileMaxWidth}) {
      display: none;
    }
  }
`;


function safeParseHTML(markup) {
    let parsedHtml = markup;
    try {
        parsedHtml = parseHTML(markup);
    } catch (error) {
        console.log(`error in safeParseHTML. \nmarkup: ${markup}`);
    }
    return parsedHtml;
}

class Basic extends React.Component {
    constructor(props) {

        //console.log("props", props);

        super(props);


        this.state = {
            error: false,
            keyword: props.keyword,
        }
    }


    componentDidMount() {


    }

    render() {

        const {

            title,
            body,
            city,
            url,
            company,
            views,
            app
        } = this.props;

        var emailOptinComp = null;


        return (

            <div>


                <JobListingHeaderContainer>
                    <SecondaryButton onClick={() => {
                        logEvent("click-more_jobs", {
                            origin: "job_page",
                            content: "More Offers"
                        });
                        this.props.moreJobsClick();
                    }}>
                        <img
                            style={{marginRight: "5px"}}
                            src="/static/icons/arrow_back_icon_purple_1.svg"
                        />
                        More Offers
                    </SecondaryButton>
                </JobListingHeaderContainer>

                <JobListingContainer>
                    <Column>
                        <Title>{title}</Title>
                        {company && <CompanyName>Posted by {company}</CompanyName>}

                        <ProminentFeature
                            onClick={() => {
                                logEvent("click-see_salary", {
                                    origin: "job_page",
                                    content: "Reveal Salary"
                                });
                                this.props.goToJob();
                            }}
                        >
                            <img src={app.i18n.currencyImagePathProminent}/>
                            Reveal Salary
                        </ProminentFeature>

                        {city && (
                            <SecondaryFeature>
                                <img src="/static/icons/location_icon_purple_2.svg"/>
                                {city}
                            </SecondaryFeature>
                        )}

                        <SecondaryFeature>
                            <img src="/static/icons/application_icon_purple_2.svg"/>
                            Be one of the first ten applicants!
                        </SecondaryFeature>

                        {body && <Description>{safeParseHTML(body)}</Description>}

                        {views && (
                            <JobListingViews>
                                <img src="/static/icons/views_icon_purple_2.svg"/>
                                {views} views
                            </JobListingViews>
                        )}
                    </Column>

                    <Column className="desktop">
                        <DesktopButtonsPanel>
                            <PrimaryButton
                                onClick={() => {
                                    logEvent("click-apply", {
                                        origin: "job_page",
                                        type: "top",
                                        content: "Apply"
                                    });
                                    this.props.goToJob();
                                }}
                            >
                                Apply
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => {

                                    logEvent("click-more_details", {
                                        origin: "job_page",
                                        type: "top",
                                        content: "More Details"
                                    });

                                    this.props.goToJob();
                                }}
                            >
                                More Details
                            </SecondaryButton>
                        </DesktopButtonsPanel>
                    </Column>
                </JobListingContainer>

                <BottomBar>
                    <p>Think you're a good candidate? Apply for this job</p>
                    <div>
                        <SecondaryButton onClick={() => {

                            logEvent("click-more_details", {
                                origin: "job_page",
                                type: "top",
                                content: "More Details"
                            });

                            this.props.goToJob();
                        }}
                        >
                            More Details
                        </SecondaryButton>

                        <PrimaryButton onClick={() => {
                            logEvent("click-apply", {
                                origin: "job_page",
                                type: "top",
                                content: "Apply"
                            });
                            this.props.goToJob();
                        }}>
                            Apply
                        </PrimaryButton>
                    </div>
                </BottomBar>

            </div>


        )
    }
}

export default Basic;