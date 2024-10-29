import React from 'react';

import Header from "../Header/Header";
import EmailBigCard from "../EmailBigCard/EmailBigCard";
import styled from "styled-components";
import validateEmailForm from "../../lib/validateEmailForm";
import ContentBlock from "../ContentBlock/ContentBlock";
import Partners from "../Partners/Partners";
import DisplayAd from "../DisplayAd/DisplayAd";
import config from "../../components/config/styleConsts";

const {mobileMaxWidth} = config;

const PageTitle = styled.h1`
  background: #ffffff;
  padding: 13px 16px;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  border-bottom: 1px solid #e5e6eb;
  color: #000639;
`;

const DynamicPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StaticPageContent = styled.div`
  padding: 16px;
  padding-top: 0px;
  background: #eff1f9;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #606486;
  p {
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    box-sizing: border-box;
    word-wrap: break-word;
  }
  p + p {
    margin-top: 16px;
  }
  h2 {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 32px 16px;
`;

const Container = styled.div`
  background: #eff1f9;
  margin-top: 70px;
  @media (max-width: ${mobileMaxWidth}) {
    margin-top: 60px;
  }
`;



class StandardPage extends React.Component {
    render() {
        const {
            publishedOn,
            title,
            children,
            isStatic,
            origin,
            hideBottomEmailBar,
            app,
            setKeyword,
            getKeyword,
            keyword,
            getLocation
        } = this.props;
        return (
            <React.Fragment>
                <Header
                    logo="/static/images/logo.svg"
                    buttonTitle="Search Jobs"
                    onSubmit={data => {
                    }}
                    openModalSearch={() => {
                    }}
                    setKeyword={setKeyword}
                    getKeyword={getKeyword}
                    keyword={keyword}
                    getLocation={getLocation}
                    origin={origin}
                    app={app}
                />
                <Container>
                    {isStatic ? (
                        <React.Fragment>
                            <PageTitle>{title}</PageTitle>
                            <StaticPageContent>
                                {publishedOn ? <h2>Published on {publishedOn}</h2> : null}
                                {children}
                            </StaticPageContent>
                        </React.Fragment>
                    ) : (
                        <DynamicPageContent>{children}</DynamicPageContent>
                    )}
                    {!hideBottomEmailBar && !this.props.getProvidedEmail() && (
                        <EmailBigCard
                            title="Never Miss an Opportunity!"
                            text={`Get ${this.props.getKeyword() ||
                            ""} job alerts directly to your inbox.`}
                            placeholder="Enter Your Email"
                            CTA="Get Job Alerts"
                            disclaimerText={app.i18n.emailOptinText}
                            successText={
                                this.props.getKeyword()
                                    ? `We’ll send you ${this.props.getKeyword()} job offers soon!`
                                    : `We’ll send you job offers soon!`
                            }
                            imageLeft="/static/images/left-img-email-baner.svg"
                            imageRight="/static/images/ringht-img-email-baner.svg"
                            image="/static/images/bear-with-money.svg"
                            validate={validateEmailForm}
                            origin="footer"
                            onSubmit={(data, onSuccess, onError) => {
                                setTimeout(() => {
                                    this.props.setProvidedEmail(data.email);
                                }, 1500);
                                onSuccess();
                            }}
                        />
                    )}
                    {origin !== "job_page" ? (
                        <Partners
                            title="OUR PARTNERS"
                            partners={[
                                // {logo: "/static/images/partner_logo_1.svg"},
                                {logo: "/static/images/partner_logo_2.svg"},
                                {logo: "/static/images/partner_logo_3.svg"},
                                {logo: "/static/images/partner_logo_4.svg"},
                                {
                                    logo: "/static/images/partner_logo_5.svg",
                                    style: {height: 34}
                                }
                            ]}
                        />
                    ) : null}
                </Container>
            </React.Fragment>
        );
    }
}

export default StandardPage;
