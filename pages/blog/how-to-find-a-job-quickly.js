import StandardPage from "../../components/StandardPage/StandardPage";
import BlogPost from '../../components/Blog/BlogPost'
import { NextSeo } from 'next-seo'

import logEvent from '../../lib/logEvent'
import React, {Component} from "react";
class SinglePostPage extends React.Component {

    componentDidMount(){
        logEvent('load-blog_post')
    }

    render(){
        const {app, keyword} = this.props
        return(
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
                title={`How to Find a Job Quickly | Jobs Bear | Your Job is Our Job`}
                description='Over 167,457 jobs are available in our site, go ahead and find yours.'
                />
                <BlogPost
                coverImage="/static/images/coverImage-how-to-find-a-job-quickly.png"
                authorImage="/static/images/patrick_image.png"
                authorName="by Patrick Wharton"
                title={`How to Find a Job Quickly`}
                >
                    <p>
                    There is nothing quite like the pressure to find a job quickly. With expenses piling up, bills to pay, and well, a life to live-- you do not want to go long without employment. Do not let the stress get you down. Blue-collar workers are experiencing higher demand, better pay, and improved benefits in recent years. Take advantage of this moment and find a job quickly with these easy tips.
                    </p>
                    <h2>Know What You Want</h2>
                    <p>
                    Blue-collar jobs are in high demand, and there are many opportunities out there right now. Try writing down your skills to help you narrow down what job is the best fit for you. For example, if you love to work outside, you are interested in technology and you are eager to learn, then you might be a great wind turbine installer. If you are afraid of heights, this might not be the job for you. Writing down your preferences and skills can help you to narrow your search, which is sure to save you time.
                    </p>
                    <h2>Elaborate</h2>
                    <p>
                    At a job interview or on a phone call with a potential employer, share stories about your last position that will show off your skills. For example, if you worked as a store assistant and you often handled scheduling, inventory, and opening and closing the store- mention this! These show trust from your former employer and the ability to work independently on your part. Do not assume these details are apparent. By painting a more detailed picture, you help the employer understand you better, which may sway them to hire you more quickly.
                    </p>
                    <h2>Have Your Resume Ready</h2>
                    <p>
                    Many blue-collar workers are bringing resumes to job interviews these days. With a resume, you can quickly and accurately explain your past experience and top skills. Resumes help you to maintain a professional appearance and can be swiftly passed through interviewers. Having all of your knowledge and contact information on one document means you could get hired more quickly.
                    </p>
                    {/* <ProTip content={`This online CV Builder is simply the best &nbsp; <a href='https://jobs-bear.com' target='_blank'>Click here to try it yourself</a>`}/> */}
                    <h2>Go Local</h2>
                    <p>
                    Sometimes the best jobs are right under your nose. Finding a job nearby where you live can significantly cut down on your commute time which allows you to spend more time at home with your family, working out, or doing whatever you love. Employers especially love when their workers are nearby. The chances are better that you will arrive on time or be available for last-minute shifts. This availability can be what convinces an employer to hire you over a different candidate.
                    </p>
                    <h2>Get the right look</h2>
                    <p>
                    What you wear is bound to make an impression on the interviewer. You should always look your best in an interview, but you do not want to wear something you do not feel comfortable wearing. Try on your outfit for the interview the night before to be certain it is professional and reflects who you are. There is no need to go out of your comfort zone or to be overdressed. For example, a sensible pair of flats or a shirt tucked in with a belt can show you are thoughtful about your appearance. When your outer self matches the inner, you are telling employers that you are professional and want to make a good impression. Looking great helps your confidence, and confidence helps employers know you’re the right person for the job.
                    </p>
                    <h2>Leave the Past Behind</h2>
                    <p>
                    If you got fired from your last job or left on bad terms, do not let it affect your new job search. A bad experience with your previous job should not ruin your willingness to work within the same field. If your boss was terrible or the management structure was frustrating, be sure to look for a company that will be the right fit. By letting go of past resentments, you can move on more quickly and find the right position faster.
                    </p>
                    <p>
                    If you are currently in the job market- happy job hunting! The right position is out there. Remain focused and confident, and you are sure to get a great job quickly.
                    </p>
                </BlogPost>
            </StandardPage>
        )
    }
}

export default SinglePostPage;