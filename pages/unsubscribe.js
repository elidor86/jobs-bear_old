import StandardPage from "../components/StandardPage/StandardPage";
import {NextSeo} from "next-seo";
import React, {Component} from "react";
class Cookies extends React.Component {
    render() {
        const {app, keyword} = this.props;
        return (
            <StandardPage
                title="Unsubscribe"
                publishedOn="2nd July, 2019"
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
                    title="Unsubscribe | Jobs Bear | Your Job is Our Job"
                    description="Over 167,457 jobs are available in our site, go ahead and find yours."
                />

                <p><strong><u>If you want to unsubscribe from Browser Push Notifications:</u></strong><br/><br/>There
                    are 2 ways to unsubscribe :</p>
                <ol>
                    <li>Whenever you receive a message/notification you can click on the settings button and select to
                        disable notifications.
                    </li>
                    <li>You can also follow these <strong><a
                        href="http://www.connecto.io/kb/knwbase/how-to-unsubscribe-from-chrome-notifications-on-web-and-android/">instructions</a>
                    </strong>- depending on your device (each device is slightly different).
                    </li>
                </ol>
                <p>Have a great day, and we hope you find a new job soon.<br/><br/><strong><u>If you want to unsubscribe
                    from Email Alerts:</u></strong><br/>Each email that is sent your way contains an unsubscribe feature
                    at the bottom of the email.In order to stop receiving emails, you need to simply click on
                    unsubscribe and follow the steps on the next page.<br/>Have a great day, and we hope you find a new
                    job soon.</p>


            </StandardPage>
        );
    }
}

export default Cookies;
