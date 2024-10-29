import ContentBlock from "../../components/ContentBlock/ContentBlock";
import {NextSeo} from "next-seo";
import StandardPage from "../../components/StandardPage/StandardPage";
import React, {Component} from "react";
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    render() {
        const {app, keyword} = this.props;
        return (
            <StandardPage
                title="JobsBear Blog"

                isStatic={true}
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                origin="cookies"
                app={app}
            >
                <NextSeo
                    title="Blog | Jobs Bear | Your Job is Our Job"
                    description="Over 167,457 jobs are available in our site, go ahead and find yours."
                />

                <ContentBlock

                    url="../blog/your-uk-unemployment-benefit-questions-answered"
                    coverImage="/static/images/coverImage-how-to-find-a-job-quickly.png"
                    contentTitle={`Your UK Unemployment Benefit Questions Answered`}
                    authorImage="/static/images/patrick_image.png"
                    authorName="by Patrick Wharton"
                    contentText="It is a particularly stressful time for many people across the world. With so many people sick from coronavirus or forced into quarantine, and businesses and schools shut down, many out there are left asking themselves, how can I make ends meet?..."

                />

                <ContentBlock

                    url="../blog/heres-why-blue-collar-jobs-are-in-demand"
                    coverImage="/static/images/coverImage-heres-why-blue-collar-jobs-are-in-demand.png"
                    contentTitle={`Here's Why Blue Collar Jobs are in Demand`}
                    authorImage="/static/images/sarah_image.png"
                    authorName="by Sarah Andersan"
                    contentText="Experts are predicting a massive shortage of blue-collar workers in the coming years. As a result, employers are scrambling..."

                />

            </StandardPage>
        );
    }
}

export default About;
