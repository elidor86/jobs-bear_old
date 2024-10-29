import StandardPage from "../../components/StandardPage/StandardPage";
import BlogPost from '../../components/Blog/BlogPost'
import {NextSeo} from 'next-seo'

import Head from 'next/head'
import logEvent from '../../lib/logEvent'
import Tags from "../../components/Tags/Tags";
import React from "react";
import Router from "next/router";
import buildJobSearchQueryString from "../../lib/buildJobSearchQueryString";
import AdSense from "react-adsense";

import _ from "underscore";

class SinglePostPage extends React.Component {

    static getInitialProps(ctx) {


        let session = {};
        if (ctx) {
            session = ctx.req.session;
        }

        // Step 4: Pass styleTags as a prop
        return {session};

    }

    componentDidMount() {
        logEvent('load-blog_post')
    }

    ShowMoreJobsClick(keyword) {


        var app = this.props.app;

        logEvent("click-load_more_jobs", {origin: "job_list"});

        let RouterQuery = Router.query;


        try {

            if (!RouterQuery.formattedAddress || RouterQuery.formattedAddress.length <= 2 && ClientVars.locpysical.Name) {
                RouterQuery.formattedAddress = ClientVars.locpysical.Name;
            }

        } catch (e) {

        }

        try {

            if (!RouterQuery.lat || RouterQuery.lat.length <= 2 && ClientVars.locpysical.lat) {
                RouterQuery.lat = ClientVars.locpysical.lat;
                RouterQuery.long = ClientVars.locpysical.long;
            }

        } catch (e) {

        }


        try {
            window.HaveJobClick = false;
        } catch (e) {

        }

        try {
            if (keyword && keyword.length > 0) {
                RouterQuery.keyword = keyword;
            }
        } catch (e) {

        }

        const queryParams = buildJobSearchQueryString(RouterQuery);


        try {
            if (window.ClientVars.didLb != true && window.AB.lb == true) {



                logEvent("lb");

                try {
                    window.ClientVars.didLb = true;
                } catch (e) {

                }


                var newTabUrl = `https://jobs-bear.com/jobs?${queryParams}`;

                if (location.href.search("/job/") > -1 && this.props.getListUrl) {
                    newTabUrl = this.props.getListUrl();
                }

                var doWebPushOptIn = false;

                /*if (app.state.optedInToPN === true) {
                    doWebPushOptIn = false;
                }*/

                var lbUrl = `https://nextcareernow.com/?botName=jobs-bear&utm_source=lb&doWebPushOptIn=${doWebPushOptIn}&geo=${app
                    .props.geo ||
                app.state.location.geo ||
                ""}&q=${encodeURI(app.state.keyword || "")}&l=${encodeURI(
                    app.state.location.formattedAddress || ""
                )}`;

                //console.log("lbUrl ", lbUrl);
                //console.log("newTabUrl ", newTabUrl);

                window.open(newTabUrl);
                location.replace(lbUrl);

            } else {

                var newTabUrl = `/jobs?${queryParams}`;

                if (location.href.search("/job/") > -1 && this.props.getListUrl) {
                    newTabUrl = this.props.getListUrl();
                    newTabUrl = newTabUrl.replace("https://jobs-bear.com", "");
                }

                Router.push(newTabUrl);
            }
        } catch (e) {
            Router.push(`/jobs?${queryParams}`);
        }


        //Router.push(`https://jobs-bear.com/jobs?${queryParams}`);
        //Router.push(`/jobs?${queryParams}`);
    }

    render() {

        const {app, keyword} = this.props;

        let session = {};
        let doAdsense = false;

        if (this.props.session) {
            session = {clientVars: _.omit(this.props.session, "cookie")};
        }

        if (session && session.clientVars && session.clientVars.adSense == true) {
            doAdsense = true;
        }

        //console.log("session ", session);

        return (
            <StandardPage
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                origin='post-how_to_write_a_great_resume'
                app={app}
            >
                <NextSeo
                    title={`Your UK Unemployment Benefit Questions Answered | Jobs Bear | Your Job is Our Job`}
                    description='It is a particularly stressful time for many people across the world. With so many people sick from coronavirus or forced into quarantine, and businesses and schools shut down, many out there are left asking themselves, how can I make ends meet?'
                />

                {doAdsense == true ? <AdSense.Google
                    style={{textAlign: "center"}}
                    client='ca-pub-5290535689125396'
                    slot='1299884479'
                    format='auto'
                    responsive='true'
                /> : null}

                <BlogPost
                    coverImage="/static/images/coverImage-how-to-find-a-job-quickly.png"
                    authorImage="/static/images/patrick_image.png"
                    authorName="by Patrick Wharton"
                    title={`Your UK Unemployment Benefit Questions Answered`}
                >


                    <p>
                        It is a particularly stressful time for many people across the world. With
                        so many people sick from coronavirus or forced into quarantine, and
                        businesses and schools shut down, many out there are left asking
                        themselves, <em>how can I make ends meet?</em>
                    </p>
                    <p>
                        The U.K. has taken active steps to help ease the COVID-19 pandemic
                        situation and make citizens feel more comfortable. If you are feeling
                        confused, nervous or anxious in the current situation, you are not alone.
                        Below you will find a helpful guide to navigate you through unemployment
                        benefits so you can get the support you need during this challenging time.
                    </p>
                    <h2>
                        <a name="_7zf186ktpn9"></a>
                        How do I know if I am eligible for unemployment or other benefits?
                    </h2>
                    <p>
                        Much of our world has been turned upside down as countries scramble to
                        isolate populations by closing businesses, schools, and forbidding public
                        gatherings. You may claim universal credit or employment and support
                        allowance if you have a limited capacity to work. If any of the following
                        reasons apply to you, then you are eligible:
                    </p>
                    <p>
                        ● You are infected or contaminated with coronavirus
                    </p>
                    <p>
                        ● You are in isolation
                    </p>
                    <p>
                        ● If you are caring for a child or qualifying young person who is a member
                        of the person’s household
                    </p>
                    <p>
                        ● You lost your job
                    </p>
                    <p>
                        ● You are self-employed and can’t get work
                    </p>
                    <p>
                        ● You can’t work because your workplace has closed
                    </p>
                    <p>
                        This covers a vast majority of people in the U.K., so you should not feel
                        alone. Receiving help from the government right now is crucial for many,
                        and there should be no stigma or ill-will attached to asking for
                        assistance. You can apply for benefits &nbsp;
                        <a style={{display: "contents"}} target="_blank"
                           href="https://www.universal-credit.service.gov.uk/postcode-checker">
                            online
                        </a>.
                    </p>
                    <h2>
                        <a name="_t6m65m6eom1d"></a>
                        Am I entitled to unemployment as a gig worker or freelancer?
                    </h2>
                    <p>
                        If you are working in the gig economy or currently on a zero-hours
                        contract, you may be entitled Statutory Sick Pay. To be eligible, you will
                        need one of the following requirements:
                        <br/>
                        <br/>
                    </p>
                    <p>
                        ● Be considered as an employee and have done some work for your employer
                    </p>
                    <p>
                        ● Earn an average of at least £118 per week
                    </p>
                    <p>
                        ● Have been ill for at least four days in a row (including non-working
                        days)
                    </p>
                    <p>
                        If you have coronavirus or are self-isolating, these same requirements
                        apply to qualify for Statutory Sick Pay.
                    </p>
                    <h2>
                        <a name="_bfd5h4w06mbs"></a>
                        What is Jobseeker’s Allowance?
                    </h2>
                    <p>
                        In the past, job seekers who were actively looking for a position could
                        meet with a government representative and update them on their progress.
                        After signing and confirming each week that you are on the job hunt, the
                        government would provide an allowance to keep you afloat during your
                        search.
                    </p>
                    <p>
                        Due to the outbreak of the coronavirus, however, all jobseeker check-ins
                        are canceled. If you had an appointment, you should consider yourself
                        excused from coming in and signing until further notice.
                    </p>
                    <p>
                        Universal Credit has now replaced Jobseeker’s Allowance. Universal Credit
                        is a payment for individuals over eighteen but under the State Pension age
                        who are on a low income or out of work. Universal payment provides support
                        for housing, childcare, and more.
                    </p>
                    <h2>
                        <a name="_ik0y59rygh"></a>
                        What if I can’t pay my rent?
                    </h2>
                    <p>
                        Many tenants and landlords are finding themselves in a difficult situation,
                        unable to receive money, or make a mortgage or rental payments. The first
                        step is to speak to your landlord and try to find a situation that is more
                        comfortable for you both.
                    </p>
                    <p>
                        If you are handed an eviction notice on or after March 26, 2020, the notice
                        must be increased to three months for assured, protected, secure, flexible,
                        demoted, and introductory tenancy types.
                    </p>
                    <h2>
                        <a name="_fnzit9sd72y6"></a>
                        Am I entitled to housing benefits?
                    </h2>
                    <p>
                        If you are unable to pay your rent, you can apply for a Housing Benefit. To
                        be eligible, you need to meet the following requirements:
                    </p>
                    <p>
                        ● You and your partner are of pension age
                    </p>
                    <p>
                        ● You are of working age and living in Temporary Accommodation provided
                        under the Homeless Persons Act
                    </p>
                    <p>
                        ● You are of working age and living in Supported Accommodation
                    </p>
                    <p>
                        ● You are entitled to the Severe Disability Premium
                    </p>
                    <p>
                        Don’t fall into one of those categories? That’s ok, you then should claim
                        Universal Credit for help with your rent. If the Housing Benefit or if
                        Universal Credit doesn't provide what you need to cover all your rent,
                        don’t fret. You can still make a claim for a discretionary housing payment
                        (also known as DHP). DHP provides extra money from your local council to
                        help pay your rent.
                    </p>
                    <h2>
                        <a name="_jium6ywvnnsa"></a>
                        Can I get Child Benefit?
                    </h2>
                    <p>
                        As we all struggle to endure the coronavirus pandemic, many are wondering
                        if they are eligible for Child Benefit payments. Child Benefit can be
                        claimed by anyone responsible for bringing up a child who is under the age
                        of sixteen. This may extend to children under 20 if they stay in approved
                        education or training. It is important to note that only one person can get
                        Child Benefit for a child.
                    </p>
                    <p>
                        Currently, Child Benefit provides £20.70 for an eldest or only child, and
                        an additional £13.70 per additional child. For those receiving other
                        benefits, like Income Support, you may be able to get this payment weekly.
                    </p>
                    <p>
                        You can claim Child Benefit once you have registered the birth of your
                        child or as soon as they come to live with you. You can apply online or via
                        phone.
                    </p>
                    <h2>
                        <a name="_onw1vrae2nw9"></a>
                        Remember, staying healthy is the priority
                    </h2>
                    <p>
                        The most important thing you can do for your family and yourself is to stay
                        healthy. Currently, in the U.K., most people are required to stay home. You
                        can leave your home for a few reasons, including to exercise, shop for
                        necessities, for medical needs, or to travel to and from work (for those
                        who are required).
                    </p>
                    <p>
                        Familiarize yourself with the benefits available to you to ensure you get
                        through this difficult experience unscathed. The NHS has many resources online to help
                        guide you through understanding any rights, restrictions, and benefits.
                        Above all, stay healthy!
                    </p>


                </BlogPost>

                <Tags
                    key={"tags"}
                    tagClick={this.ShowMoreJobsClick.bind(this)}
                    app={this.props.app}>

                </Tags>

            </StandardPage>
        )
    }
}

export default SinglePostPage;