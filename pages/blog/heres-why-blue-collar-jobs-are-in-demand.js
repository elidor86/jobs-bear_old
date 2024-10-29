import StandardPage from "../../components/StandardPage/StandardPage";
import BlogPost from '../../components/Blog/BlogPost'
import { NextSeo } from 'next-seo'
import ProTip from '../../components/Blog/ProTip'
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
            keyword={keyword}
            setProvidedEmail={this.props.setProvidedEmail}
            getProvidedEmail={this.props.getProvidedEmail}
            origin='post-how_to_write_a_great_resume'
            app={app}
            >
                <NextSeo 
                title={`Here's Why Blue Collar Jobs are in Demand | Jobs Bear | Your Job is Our Job`}
                description='Over 167,457 jobs are available in our site, go ahead and find yours.'
                />
                <BlogPost
                coverImage="/static/images/coverImage-heres-why-blue-collar-jobs-are-in-demand.png"
                authorName='by Sarah Andersan'
                authorImage="/static/images/sarah_image.png"
                title={`Here's Why Blue Collar Jobs are in Demand`}
                >
                    <p>
                    Experts are predicting a massive shortage of blue-collar workers in the coming years. As a result, employers are scrambling to provide better pay and conditions for trade workers in an effort to recruit and retain them. There is an abundance of blue-collar jobs available right now, and the number is expected to keep growing. Job options for blue-collar workers are definitely looking up.
                    </p>
                    <p>
                    Let us give you a real-life example so you know what we’re talking about. Liam, an elevator mechanic, decided to skip the traditional four-year college route and begin his career with an apprenticeship. Liam first worked hourly, making good wages. Later on, his company paid for him to attend some night school courses to strengthen his abilities at work. Eventually, he finished his apprenticeship and has been with the company for over five years. Liam now earns close to $90,000 a year and reportedly makes more than other people in the company with college degrees. Liam has already purchased his first home and enjoys a debt-free life. Liam is a huge success compared to his friends who got degrees in the liberal arts and graduated with $100k in student loans and had no option but to take low-paying jobs.
                    </p>
                    <p>
                    Blue-collar workers like Liam are in high-demand and are earning more money than ever. Here’s why they are wanted and what is in store for the future.
                    </p>
                    <h2>Millennial Attitudes </h2>
                    <p>
                    Millennials now make up the majority of the workforce, and with them, they bring new attitudes about their careers. Many millennials do not feel burdened by traditional career paths (college, climbing the corporate ladder) and are more interested in a well-rounded life with a secure job. Millennials are interested in exploring other options, and this coincides nicely with the blue-collar job shortage. Millennials actively seek out different job qualities than other generations. Millennials demand:

                    </p>
                    <ul>
                        <li>Money</li>
                        <li>Security</li>
                        <li>Holidays and time off</li>
                        <li>Great people</li>
                        <li>Flexible working</li>
                    </ul>
                    <p>
                    All of these are readily available for blue-collar jobs and do not require a college degree. Many blue-collar workers are enjoying a moment of job security, higher income, and better retention incentives from employers who desperately wish to keep them.
                    </p>
                    <h2>Post Financial Crisis</h2>

                    <p>
                    Since the 2008 financial crisis, the need for blue-collar workers is steadily on the rise. A 2018 report from Deloitte and The Manufacturing Institute projects that between 2018 and 2028, as many as 2.4 million unfilled manufacturing jobs will exist. 
                    </p>
                    <p>
                    The path towards success is not always clear, but right now, it seems very obvious. In today’s economy and the predicted economic situation for the next ten years,  blue-collar workers will enjoy numerous job opportunities. A traditional four-year college is no longer the guaranteed path for success. Instead, workers like train engineers, air traffic controllers, HVAC control technicians, solar panel installers, electrical technicians, and more are enjoying more success and more income than their peers.
                    </p>
                    <h2>A New Attitude</h2>
                    <p>
                    As blue-collar jobs become more prominent and in-demand, many are calling for a new attitude toward these professionals. Blue-collar is being replaced with the phrase “skilled tradesman,” to more accurately reflect these individuals. The term “blue-collar” comes from the uniforms that many tradespeople used to wear while working. Today the association of blue-collar with someone who works with their hands is now a positive and highly desired trait. 
                    </p>
                    <p>
                    If you are a blue-collar worker looking for a job, don’t fear- the future is bright! Dust off that resume and research positions in your area, because all signs point to more jobs, higher incomes, and better benefits.
                    </p>
                    {/* <ProTip content={`This online CV Builder is simply the best &nbsp; <a href='https://jobs-bear.com' target='_blank'>Click here to try it yourself</a>`}/> */}
                </BlogPost>
            </StandardPage>
        )
    }
}

export default SinglePostPage;