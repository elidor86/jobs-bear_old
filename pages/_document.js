import Document, {Html, Head, Main, NextScript} from "next/document";
import _ from "underscore";
import defaultSession from "../lib/defaultSessionVars";
import React from "react";
import Script from 'next/script';
import {ServerStyleSheet} from 'styled-components';


class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            // Enhance the renderPage to collect styles
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                    enhanceComponent: (Component) => Component,
                });

            // Run the parent `getInitialProps`, it now includes the custom `renderPage`
            const initialProps = await Document.getInitialProps(ctx);

            let session = {};
            if (ctx.req) {
                session = ctx.req.session || {};
            }

            return {
                ...initialProps,
                session,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {

        let session = {};
        let AB = {};
        let doAdsense = false;
        let doTab = false;

        try {
            if (this.props.session && this.props.session.AB) {
                AB = {
                    AB: this.props.session.AB
                };
            }
        } catch (e) {

        }


        if (this.props.session) {

            session = {
                clientVars: _.omit(this.props.session, "cookie")
            };

        } else {
            session = {
                clientVars: defaultSession
            };
        }

        if (session && session.clientVars && session.clientVars.adSense == true) {
            doAdsense = true;
        }

        if (session && session.clientVars && session.clientVars.tab == true) {
            doTab = true;
        }

        const googleAnalyticsIds = ['UA-148239850-1', 'AW-755616345', "AW-676971710", "G-8RL95PXQLX"]; // Add or remove Analytics IDs
        const googleAdsIds = ['AW-676971710']; // Add or remove Google Ads IDs
        const googleTagManagerIds = ['G-8RL95PXQLX']; // Add or remove Tag Manager IDs


        return (
            <Html>
                <Head>

                    {/* Consolidated Google Analytics and Ads Script */}
                    <script
                        src={`https://www.googletagmanager.com/gtag/js?id=AW-755616345}`}
                        async
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
             window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); }
                        gtag('js', new Date());
                        
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'analytics_storage': 'denied'
                        });
                        
                        ${googleAnalyticsIds.map(id => `gtag('config', '${id}', {'allow_enhanced_conversions': true});`).join('\n')}
              `
                        }}
                    />

                    <meta property="og:image" content="/static/images/og-logo.png"></meta>

                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="/static/favicon.ico"
                    />

                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
                          rel="stylesheet"/>

                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                  html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}
                                  
                                 
                                  
                                  body {
                                   font-family: 'Lato', sans-serif;
                                  }
                                  
                              .grecaptcha-badge { visibility: hidden; }
                                  
                                }
                                
                                
                                
                                
                                  `
                        }}
                    />

                    {/* Google Adsense */}
                    {doAdsense && (
                        <Script
                            data-ad-client="ca-pub-5290535689125396"
                            async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                            strategy="afterInteractive"
                        />
                    )}


                    <script
                        type="text/javascript"
                        dangerouslySetInnerHTML={{
                            __html: `window.BtWebPushVersion = "nakedNative"`
                        }}
                    />

                    <script
                        id="session"
                        type="application/json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(session, null, 2)
                        }}
                    />

                    <script
                        id="ab"
                        type="application/json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(AB, null, 2)
                        }}
                    />


                </Head>

                <body>

                <Main></Main>
                <NextScript></NextScript>


                </body>
            </Html>
        );

    }
}

export default MyDocument;
