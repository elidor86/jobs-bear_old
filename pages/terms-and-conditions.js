import StandardPage from "../components/StandardPage/StandardPage";
import {NextSeo} from "next-seo";
import React, {Component} from "react";
class TermsAndConditionsPage extends React.Component {


    constructor(props) {
        super(props);
    }

    getDisclaimer() {

        let content = ""

        try {
            if (this.props.app.props.hostname.search("discovermynextjob.com") > -1 || this.props.app.props.hostname.search("127.0.0.1") > -1) {

                content = "This site is managed and operated by AdWorks and owned by Alegria Media, this is site is part of a joint-venture partnership and all the information bellow covers https://jobs-bear.discovermynextjob.com and it's connected pages"

            }
        } catch (e) {

        }


        return content

    }

    render() {
        const {app, keyword} = this.props;
        return (
            <StandardPage
                title="Terms and Conditions"
                publishedOn="2nd July, 2019"
                isStatic={true}
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                origin="terms_and_conditions"
                app={app}
            >
                <NextSeo
                    title="Terms and Conditions | Jobs Bear | Your Job is Our Job"
                    description="Over 167,457 jobs are available in our site, go ahead and find yours."
                />

                <div
                    dangerouslySetInnerHTML={{
                        __html: `
                        
<html>

<head>
<meta http-equiv=Content-Type content="text/html; charset=utf-8">
<meta name=Generator content="Microsoft Word 15 (filtered)">
<style>
<!--
 /* Font Definitions */
 @font-face
\t{font-family:"Cambria Math";
\tpanose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
\t{font-family:Calibri;
\tpanose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
\t{font-family:"DengXian Light";
\tpanose-1:2 1 6 0 3 1 1 1 1 1;}
@font-face
\t{font-family:Lato;
\tpanose-1:2 15 5 2 2 2 4 3 2 3;}
@font-face
\t{font-family:"\\@DengXian Light";}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
\t{margin-top:0in;
\tmargin-right:0in;
\tmargin-bottom:8.0pt;
\tmargin-left:0in;
\ttext-align:right;
\tline-height:107%;
\tdirection:rtl;
\tunicode-bidi:embed;
\tfont-size:11.0pt;
\tfont-family:"Calibri",sans-serif;}
h1
\t{mso-style-link:"Heading 1 Char";
\tmargin-top:12.0pt;
\tmargin-right:0in;
\tmargin-bottom:0in;
\tmargin-left:0in;
\ttext-align:right;
\tline-height:107%;
\tpage-break-after:avoid;
\tdirection:rtl;
\tunicode-bidi:embed;
\tfont-size:16.0pt;
\tfont-family:"Calibri Light",sans-serif;
\tcolor:#2F5496;
\tfont-weight:normal;}
span.Heading1Char
\t{mso-style-name:"Heading 1 Char";
\tmso-style-link:"Heading 1";
\tfont-family:"Calibri Light",sans-serif;
\tcolor:#2F5496;}
.MsoChpDefault
\t{font-family:"Calibri",sans-serif;}
.MsoPapDefault
\t{margin-bottom:8.0pt;
\tline-height:107%;}
@page WordSection1
\t{size:595.3pt 841.9pt;
\tmargin:1.0in 1.25in 1.0in 1.25in;}
div.WordSection1
\t{page:WordSection1;}
 /* List Definitions */
 ol
\t{margin-bottom:0in;}
ul
\t{margin-bottom:0in;}
-->
</style>

</head>

<body lang=EN-US link=blue vlink="#954F72" style='word-wrap:break-word'>

<div class=WordSection1 dir=RTL>

<div style='border:none;border-bottom:solid #E5E6EB 1.0pt;padding:0in 0in 10.0pt 0in;
background:white'>

<h1 dir=LTR style='margin-top:0in;text-align:left;line-height:15.0pt;
background:white;direction:ltr;unicode-bidi:embed;border:none;padding:0in'><b><span
style='font-size:12.0pt;font-family:"Lato",sans-serif;color:#000639'>Terms and
Conditions</span></b></h1>

</div>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>V5.2 : February 2</span><span dir=RTL></span><span
lang=HE dir=RTL style='font-size:10.5pt;font-family:"Times New Roman",serif;
color:black'><span dir=RTL></span>3</span><span dir=LTR></span><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'><span
dir=LTR></span>, 2023</span></p>

<p class=MsoNormal dir=LTR style='text-align:left;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>This website is operated by Adworks Ltd (the “Company”). For purposes of
these Terms and Conditions, “Service” refers to the Company’s service which can
be accessed via our website at www.Jobs-Bear.com or through our mobile
application. The terms “we,” “us,” and “our” refer to the Company. “You” refers
to you, as a user of the Service.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>By visiting our site and/or using the Service, you agree to be bound by
the following terms and conditions (“Terms of Use” or “Terms). These Terms of
Use apply to all users of the Service, including without limitation users who
are browsers, vendors, customers, merchants, job seekers, recruiters, head
hunters and/or contributors of content.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>Please read these Terms of Use carefully before accessing or using the
Service. By accessing or using any part of the Service, you agree to be bound
by these Terms of Use. If you do not agree to all the Terms of Use, then you
are not authorized to access the website or use the Service.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>&nbsp;</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>General Terms</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>By agreeing to these Terms of Use, you represent that you are at least
13 years of age and are eligible to use the Services and have the right, power
and ability to enter into and perform under these Terms. If you are under 13
years old, you may only use the Service with the approval of your parent or
guardian. You will comply with any instructions provided to you by the Company
in connection with your use of the Service. The Company may establish general
practices and limits concerning use of the Service and reserves the right to
change its instructions, general practices and limits at any time, in its sole
discretion, with or without notice to you.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Modifications to The Service, Prices and Terms of Use</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We reserve the right to modify or discontinue the Service (or any part
thereof), including these Terms of Use, without notice at any time. You can
review the most current version of the Terms of Use at any time on this page.
We reserve the right to update, change or replace any part of these Terms of
Use by posting updates and/or changes to our website. It is your responsibility
to check this page periodically for changes. Your continued use of or access to
this website following the posting of any changes constitutes acceptance of
those changes. In addition, prices for our products are subject to change
without notice. We shall not be liable to you or to any third-party for any
modification, price change, suspension or discontinuance of the Service.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Products or Services</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We reserve the right to limit the sales of our products or Services to
any person, geographic region or jurisdiction, and may exercise this right on a
case-by-case basis. We also reserve the right to limit the quantities of any
products or services that we offer. All descriptions of products or product
pricing are subject to change at any time without notice, at our sole discretion.
We reserve the right to discontinue any product at any time. Any offer for any
product or service made on this site is void where prohibited. Although we have
made every effort to display as accurately as possible the colors and images of
our products that appear on the Service, we cannot guarantee that your computer
monitor's display of any color will be accurate. We do not warrant that the
quality of any products, services, information, or other material purchased or
obtained by you will meet your expectations, or that any errors in the Service
will be corrected.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Optional Tools</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We may provide you with access to third-party tools, which we neither
monitor nor over which we have any control nor input. You acknowledge and agree
that we provide access to such tools “as is” and “as available” without any
warranties, representations or conditions of any kind and without any
endorsement. As a result, we shall have no liability whatsoever arising from or
relating to your use of optional third-party tools. Any use by you of optional
tools offered through the Service is entirely at your own risk and discretion
and you should ensure that you are familiar with and approve of the terms on
which tools are provided by the relevant third-party provider(s).</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>&nbsp;</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Third - Party Links</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>Our Service may include materials from third-parties and third-party
links available through the Service may direct you to third-party websites that
are not affiliated with us. We are not responsible for examining or evaluating
the content or accuracy of, and we do not warrant and will not have any
liability or responsibility for, any third-party materials or websites, or for
any other materials, products, or services of third-parties.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We are not liable for any harm or damages related to the purchase or use
of goods, services, resources, content, or any other transactions made in
connection with any third-party websites. Please review carefully the
third-party's policies and practices and make sure you understand them before
you engage in any transaction. Complaints, claims, concerns, or questions
regarding third-party products should be directed to the third-party.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>User Generated Content</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We may, but are under no obligation to, monitor, edit, or remove content
that we determine in our sole discretion is unlawful, offensive, threatening,
libelous, defamatory, pornographic, obscene or otherwise objectionable or
violates any party’s intellectual property or these Terms of Use.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>By posting comments through the Service, you agree that your comments
will not violate any right of any third-party, including copyright, trademark,
privacy, personality or other personal or proprietary right. You further agree
that your comments will not contain libelous or otherwise unlawful, abusive or
obscene material, or contain any computer virus or other malware that could in
any way affect the operation of the Service or any related website. You may not
use a false e-mail address, pretend to be someone other than yourself, or
otherwise mislead us or third-parties as to the origin of any comments. You are
solely responsible for any comments you make and their accuracy. We take no
responsibility and assume no liability for any comments or other information
posted by you or any third-party.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Personal Information</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>Your submission of personal information through the Service is governed
by our Privacy Policy.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>3rd Party Services</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We can use third-party service providers to provide site metrics and
other services. These third parties can use cookies, web beacons, and other
technologies to collect information, such as your IP address, identifiers
associated with your device, other applications to your device, the browsers
you use to access our Services, webpages viewed, time spent on webpages, links
clicked, and conversion information.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Errors, Inaccuracies and Omissions</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>From time to time there may be information available through the Service
that contains typographical errors, inaccuracies or omissions that may relate
to, among other things, product descriptions, pricing, promotions, offers,
product shipping charges, transit times and availability. We reserve the right
to correct any errors, inaccuracies or omissions, and to change or update
information or cancel orders if any information in the Service or on any
related website is inaccurate at any time without prior notice (including after
you have submitted your order).</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We undertake no obligation to update, amend or clarify information in
the Service or on any related website, including without limitation, pricing
information, except as required by law. No specified update or refresh date
applied in the Service or on any related website, should be taken to indicate
that all information in the Service or on any related website has been modified
or updated.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Prohibited Uses</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>In addition to the other prohibitions described in these Terms of Use,
you are prohibited from using the Service, our site, or its content: (a) for
any unlawful purpose; (b) to solicit others to perform or participate in any
unlawful acts; (c) to violate any international, federal, provincial or state
regulations, rules, laws, or local ordinances; (d) to infringe upon or violate
our intellectual property rights or the intellectual property rights of others;
(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
discriminate based on gender, sexual orientation, religion, ethnicity, race,
age, national origin, or disability; (f) to submit false or misleading
information; (g) to upload or transmit viruses or any other type of malicious code
that will or may be used in any way that will affect the functionality or
operation of the Service or of any related website, other websites, or the
Internet; (h) to collect or track the personal information of others; (i) to
spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or
immoral purpose; or (k) to interfere with or circumvent the security features
of the Service or any related website, other websites, or the Internet. The
Company reserves the right to terminate your use of the Service or any related
website for violating this Section or any other prohibited uses described in
these Terms of Use.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Disclaimer of Warranties; Limitation of Liability</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>The Company does not guarantee, represent or warrant that your use of
the Service will be uninterrupted, timely, secure, or error-free. To the extent
permitted by law, we may make and preserve copies of any information or any
other content or data you provide through the Service for internal back-up and
other legal or regulatory purposes. However, We are not obligated to preserve
copies of such information, content or other data.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>We do not warrant that the results that may be obtained from the use of
the Service will be accurate or reliable.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>You agree that from time to time we may remove the Service for
indefinite periods of time or cancel the Service at any time, in each case
without notice to you.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>You expressly agree that your use of, or inability to use, the Service
is at your sole risk. The Service and all products and services delivered to
you through the Service are (except as expressly stated by us) provided 'as is'
and 'as available' for your use, without any representation, warranties or
conditions of any kind, either express or implied, including all implied
warranties or conditions of merchantability, merchantable quality, fitness for
a particular purpose, durability, title, and non-infringement, in each case to
the extent permitted by applicable law.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>In no case shall the Company, our directors, officers, employees,
affiliates, agents, contractors, interns, suppliers, service providers or
licensors be liable for any injury, loss, claim, or any direct, indirect,
incidental, punitive, special, or consequential damages of any kind, including,
without limitation lost profits, lost revenue, lost savings, loss of data,
replacement costs, or any similar damages, whether based in contract, tort
(including negligence), strict liability or otherwise, arising from your use of
any of the Service or any products procured using the Service, or for any other
claim related in any way to your use of the Service or any product, including,
but not limited to, any errors or omissions in any content, or any loss or
damage of any kind incurred as a result of the use of the service or any
content (or product) posted, transmitted, or otherwise made available via the
service, even if advised of their possibility. Because some states or
jurisdictions do not allow the exclusion or the limitation of liability for
consequential or incidental damages, in such states or jurisdictions, our
liability shall be limited to the maximum extent permitted by law.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Indemnification</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>You agree to indemnify, defend and hold harmless the Company and our
parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors,
licensors, service providers, subcontractors, suppliers, interns and employees,
harmless from any claim or demand, including attorneys’ fees, made by any third
party due to or arising out of your breach of these Terms of Use or the
documents they incorporate by reference, or your violation of any applicable
law or the rights of a third-party.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Severability</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>In the event that any provision of these Terms of Use is determined to
be unlawful, void or unenforceable, such provision shall nonetheless be
enforceable to the fullest extent permitted by applicable law, and the
unenforceable portion shall be deemed to be severed from these Terms of Use,
such determination shall not affect the validity and enforceability of any
other remaining provisions.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Termination</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>The obligations and liabilities of the parties incurred prior to the
termination date shall survive the termination of this agreement for all
purposes.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>These Terms of Use are effective unless and until terminated by either
you or us. You may terminate these Terms of Use at any time by notifying us
that you no longer wish to use our Services, or when you cease using our site.
If in our sole judgment you fail, or we suspect that you have failed, to comply
with any term or provision of these Terms of Use, we also may terminate this
agreement at any time without notice and you will remain liable for all amounts
due up to and including the date of termination; and/or accordingly may deny
you access to our Services (or any part thereof).</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Entire Agreement</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>The failure of us to exercise or enforce any right or provision of these
Terms of Use shall not constitute a waiver of such right or provision.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>These Terms of Use and any policies or operating rules posted by us on
this site or in respect to the Service constitutes the entire agreement and
understanding between you and us and govern your use of the Service,
superseding any prior or contemporaneous agreements, communications and
proposals, whether oral or written, between you and us (including, but not
limited to, any prior versions of the Terms of Use).</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>In no event shall any ambiguities in the interpretation of these Terms
of Use be construed against the drafting party.</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Governing Law</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>These Terms of Use and any separate agreements whereby we provide you
Services shall be governed by and construed in accordance with the laws of
Israel. Any matter related to these Terms of Use and any separate agreements
whereby we provide you Services shall be subject to the exclusive jurisdiction
of the competent courts in Tel Aviv-Jaffa, Israel. </p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><b>Contact Information</b></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'><span style='color:black'>If you have any questions or comments
concerning these Terms of Use, you are welcome to send Us an e-mail. We are
Adworks Ltd (company ID 515257780), and you can email us at
contact@jobs-bear.com, or send us postal mail to HaYetzira, Ramat Gan, Israel
(ZipCode 5252173) or contact us by phone at +97237755000, and we will make an
effort to reply within a reasonable timeframe.</span></p>

<p class=MsoNormal dir=LTR style='text-align:justify;direction:ltr;unicode-bidi:
embed'>&nbsp;</p>

</div>

</body>

</html>


                                  `
                    }}
                />

            </StandardPage>
        );
    }
}

export default TermsAndConditionsPage;
