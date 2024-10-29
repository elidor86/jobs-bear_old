import StandardPage from "../components/StandardPage/StandardPage";
import {NextSeo} from "next-seo";
import React, {Component} from "react";
class PrivacyPolicy extends React.Component {

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
                title="Privacy Policy"
                publishedOn="January 22, 2020"
                isStatic={true}
                getKeyword={this.props.getKeyword}
                setKeyword={this.props.setKeyword}
                setProvidedEmail={this.props.setProvidedEmail}
                getProvidedEmail={this.props.getProvidedEmail}
                keyword={keyword}
                origin="privact_policy"
                app={app}
            >
                <NextSeo
                    title="Privacy Policy | Jobs Bear | Your Job is Our Job"
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
\t{font-family:Lato;
\tpanose-1:2 15 5 2 2 2 4 3 2 3;}
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

<p class=MsoNormal align=center dir=LTR style='margin-bottom:0in;text-align:
center;line-height:18.0pt;direction:ltr;unicode-bidi:embed'><b><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'>PRIVACY
POLICY</span></b></p>

<p class=MsoNormal align=center dir=LTR style='margin-top:12.0pt;margin-right:
0in;margin-bottom:0in;margin-left:0in;text-align:center;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>V5.2 : February 07, 2023</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'><br>
<span style='background:yellow !msorm'>Welcome to</span><span style='background:
yellow !msorm'> Job</span><span style='background:yellow !msorm'>s</span><span
style='background:yellow !msorm'>-bear.com, an</span><span style='background:
yellow !msorm'> internet </span><span style='background:yellow !msorm'>s</span><span
style='background:yellow !msorm'>ite </span><span style='background:yellow !msorm'>owned
and operated by Adworks Ltd. (&quot;we&quot;, &quot;us&quot; or
&quot;our&quot;) </span><span style='background:yellow !msorm'>(the&nbsp;</span><span
style='background:yellow !msorm'><b>&quot;Site&quot;</b></span><span
style='background:yellow !msorm'>).</span> This document explains the Site's
practices regarding the information collected when you use the Site, the
manners in which the Site may use such information, and the options and rights
available to you. By accessing or using the Site, you signify that you have
read, understood, and agree to the terms of this Privacy Policy. This Privacy
Policy, together with the Terms of Use found at&nbsp;</span><a
href="https://jobs-bear.com/terms-and-conditions"><span style='font-size:10.5pt;
font-family:"Lato",sans-serif;border:none windowtext 1.0pt;padding:0in'>terms-and-conditions</span></a><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'>&nbsp;(the&nbsp;<b>&quot;Terms
of Use&quot;</b>) constitute a legally binding agreement between you and the
Site. The Privacy Policy is incorporated to the Terms of Use by way of
reference and constitutes an inseparable part of the Terms of Use. You hereby
represent and warrant that you have read and understood and agreed to be bound
by this Privacy Policy and the Terms of Use.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>All capital terms herein shall have the meaning
ascribed to the in the Terms of Use.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>IF YOU DO NOT AGREE TO THIS PRIVACY POLICY
PLEASE QUIT THIS SITE IMMEDIATELY AND AVOID USING IT IN ANY MANNER.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>PLEASE NOTE: YOU ARE NOT OBLIGATED BY LAW TO
PROVIDE US WITH ANY INFORMATION. YOU HEREBY ACKNOWLEDGE AND AGREE THAT YOU ARE
PROVIDING US WITH INFORMATION AT YOUR OWN FREE WILL, FOR THE PURPOSES DESCRIBED
IN THIS PRIVACY POLICY, AND THAT WE MAY RETAIN SUCH INFORMATION IN ACCORDANCE
WITH THIS POLICY AND ANY APPLICABLE LAWS AND REGULATIONS. HOWEVER, PLEASE NOTE
THAT SOME OF THAT INFORMATION MAY BE REQUIRED IN ORDER TO ENABLE US PROVIDING
THE SERVICES THROUGH THE SITE, AND THEREFORE, IF YOU DO NOT PROVIDE SUCH INFORMATION
WE MAY NOT BE ABLE TO EFFECTIVLY PROVIDE YOU WITH THE SERVICES.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>COLLECTED INFORMATION&nbsp;</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'><br>
The Site may collect two types of data and information:</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'><br>
<u>Non-personally Identifiable Information</u>. This kind of information may be
collected by the Site or provided by you without being related to any
identified person (<b>“Non-Personal Information”</b>). Non-Personal Information
may include (but is not limited to): search inquiries, technical information
and aggregated usage information, type of operation system, browser type and
version, language and keyboard language.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'><br>
<u>Personally Identifiable Information</u>. This kind of information is namely
connected to an identified person or may, with reasonable effort, identify an
individual, or may be of private or sensitive nature (<b>&quot;Personal
Information&quot;</b>).&nbsp; Personal Information may include (but not limited
to): your computer's IP address or other persistent user identifier, which is
allocated to your device by your Internet service provider, your e-mail
address, telephone number, location and demographic information, your first and
last name, date of birth, gender, physical address, including zip code,
mobile/cellular number, and any other information you provide to us during the
registration process or though the course of communicating with the Site about
the products and services provided by the Site.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>The Site collects the information from you and
from your interaction with the Site, as well as from various other sources such
as third parties and publicly available information.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Without derogating of the aforementioned, please
note that we may collect any of the following data:</span></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;margin-left:57.3pt;
text-align:justify;text-indent:-.25in;line-height:16.5pt;direction:ltr;
unicode-bidi:embed'><span style='font-size:10.0pt;font-family:Symbol;
color:black'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
color:black;border:none windowtext 1.0pt;padding:0in'>Your personal information
such as Your name, date of birth, gender, contact details (email addresses,
telephone numbers etc.) and profession.</span></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;margin-left:57.3pt;
text-align:left;text-indent:-.25in;line-height:16.5pt;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:Symbol;color:black'>·<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
color:black;border:none windowtext 1.0pt;padding:0in'>Information about your
geographical location.</span></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;margin-left:57.3pt;
text-align:justify;text-indent:-.25in;line-height:16.5pt;direction:ltr;
unicode-bidi:embed'><span style='font-size:10.0pt;font-family:Symbol;
color:black'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
color:black;border:none windowtext 1.0pt;padding:0in'>Your search behavior and
preferences in the Site.</span></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;margin-left:57.3pt;
text-align:left;text-indent:-.25in;line-height:16.5pt;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:Symbol;color:black'>·<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
color:black;border:none windowtext 1.0pt;padding:0in'>Information about your
devices and access to the Internet (such as IP address, web browser and
operating system type and version).</span></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<div align=left dir=ltr>

<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none'>
 <tr>
  <td width=567 valign=top style='width:425.0pt;border:solid black 1.0pt;
  padding:3.0pt 5.4pt 3.0pt 5.4pt'>
  <p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
  line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
  10.5pt;font-family:"Lato",sans-serif;color:black'>BY ENTERING AND USING THE SITE
  YOU GIVE CONSENT TO THE PROCESSING OF YOUR PERSONAL DATA FOR THE PURPOSES SET
  FORTH HEREIN.</span></p>
  <p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
  direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
  "Times New Roman",serif;color:black'>&nbsp;</span></p>
  <p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
  direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
  "Lato",sans-serif;color:black'>YOU HAVE THE RIGHT TO WITHDRAW YOUR CONSENT AT
  ANY TIME BY SENDING US A WITHDRAWL NOTICE TO CONTACT@JOBS-BEAR.COM. THE
  WITHDRAWAL OF CONSENT SHALL NOT AFFECT THE LAWFULNESS OF PROCESSING BASED ON
  CONSENT BEFORE ITS WITHDRAWAL.</span></p>
  </td>
 </tr>
</table>

</div>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>PURPOSE OF COLLECTING THE INFORMATION</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We use the Information we collect for the
following purposes (the&nbsp;<b>&quot;Purposes&quot;</b>):</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Register
     you to the Site and maintain your account.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Provide
     our services, maintain, protect and improve them, to develop new services.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Offer
     you tailored content – such as providing you more relevant ads.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>We
     may use the information for statistical analysis, analytics, research and
     technical support.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>We
     may use your email address and your mobile phone number to inform you
     about landing pages for a variety of services, content and products,
     including those offered by third parties.</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
dir=RTL></span><span dir=RTL></span><span lang=HE style='font-size:10.5pt;
font-family:"Times New Roman",serif;color:black'><span dir=RTL></span><span
dir=RTL></span>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Make
     your next use of the Site more personalized.</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Contact
     you regarding administrative issues, such as questions about your specific
     request, or otherwise respond to your comments or requests.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span lang=HE dir=RTL
style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Make
     telephone calls and send text messages to you with information and offers.</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
dir=RTL></span><span dir=RTL></span><span lang=HE style='font-size:10.5pt;
font-family:"Times New Roman",serif;color:black'><span dir=RTL></span><span
dir=RTL></span>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Track
     online behavior for behavioral advertising and other marketing purposes.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Help
     administer and protect the security of the Site.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Prevent,
     detect, mitigate, and investigate fraud, security breaches, and
     potentially prohibited or illegal activities.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Enforce
     this Privacy Policy, and the Terms of Use.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>HOW DO WE COLLECT INFORMATION?&nbsp;</span></b><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'><br>
&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We collect information in two ways:</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><u><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Information you give us</span></u><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'>.&nbsp;In
certain occasions we may ask you to provide certain information about yourself,
for example: your name, email address, location information or telephone
number. Please note that you are not obligated in any way to provide us with
any information, but we may not be able to properly provide you with our
services and/or parts of our services if you refuse providing the required
information.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><u><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Information we get from your use of the Site</span></u><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'>.&nbsp;We&nbsp;</span><a
href="http://www.google.com/intl/en/policies/privacy/example/collect-information.html"><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
padding:0in'>collect information</span></a><span style='font-size:10.5pt;
font-family:"Lato",sans-serif;color:black'>&nbsp;about your&nbsp;</span><a
href="http://www.google.com/intl/en/policies/privacy/example/view-and-interact-with-our-ads.html"><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
padding:0in'>usage and interaction with the Site</span></a><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'>. This
information may include, among other things:</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='color:windowtext'><a
     href="http://www.google.com/intl/en/policies/privacy/key-terms/"><span
     style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
     padding:0in'>Device information</span></a></span><span style='font-size:
     10.5pt;font-family:"Lato",sans-serif'>&nbsp;(such as your hardware model,
     operating system version).</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Log
     information - We automatically collect and store certain information
     in&nbsp;</span><span style='color:windowtext'><a
     href="http://www.google.com/intl/en/policies/privacy/key-terms/"><span
     style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
     padding:0in'>server logs</span></a></span><span style='font-size:10.5pt;
     font-family:"Lato",sans-serif'>. This may include (but is not limited to):
     details of how the Site is used and search queries.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Device
     event information such as crashes, system activity, keys and values in the
     windows registry hardware settings, browser type, browser language, the
     date and time of your request and referral URL.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Location
     information.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>YOUR RIGHTS</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>You may be aware that the European General Data Protection
Regulation or &quot;GDPR&quot; gives certain rights to individuals in relation
to their personal data. Accordingly, we have implemented additional
transparency and access controls in our Privacy Center and Privacy Settings to
help users take advantage of those rights. As available and except as limited
under applicable law, the rights afforded to individuals are:</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     of Access - the right to be informed of and request access to the personal
     data we process about you;</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     to Rectification - the right to request that we amend or update your
     personal data where it is inaccurate or incomplete;</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
dir=RTL></span><span dir=RTL></span><span lang=HE style='font-size:10.5pt;
font-family:"Times New Roman",serif;color:black'><span dir=RTL></span><span
dir=RTL></span>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     to Erasure - the right to request that we delete your personal data;</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     to Restrict - the right to request that we temporarily or permanently stop
     processing all or some of your personal data;</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     to Object - the right, at any time, to object to us processing your
     personal data on grounds relating to your particular situation; the right
     to object to your personal data being processed for direct marketing
     purposes;</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     to Data Portability - the right to request a copy of your personal data in
     electronic format and the right to transmit that personal data for use in
     another party’s service; and</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     10.0pt;margin-left:.5in;text-align:justify;line-height:normal;direction:
     ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Right
     not to be subject to Automated Decision-making - the right to not be
     subject to a decision based solely on automated decision making, including
     profiling, where the decision would have a legal effect on you or produce
     a similarly significant effect.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Lato",sans-serif;color:black'>If you wish to exercise any
of these rights, or if you have any questions about your privacy, your rights,
or how to exercise them, please contact our data protection officer at
contact@jobs-bear.com . We will respond to your request within a reasonable
period of time upon verification of your identity. If you are unhappy with the
way we are using your personal data you can also contact and are free to lodge
a complaint with your local data protection authority.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>In accordance with the GDPR You have the right
to ask for a copy of any personal Data that we hold relating to you.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>DATA CONTROLLER</span></b></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:left;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Adworks
     Ltd. shall be the data controller of the master data you enter in
     connection with your creation of a profile on the Site, i.e. your name and
     your email address, as well as registration of your IP address, your
     employment preferences, employment searches and other demographic
     information.</span></li>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Note
     that if you decide to sign up for our SMS job alerts program, you will be
     asked to provide your phone number. Your phone number will not be shared
     with 3rd parties unless you explicitly request us otherwise.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=RTL style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;line-height:18.0pt'><span dir=RTL></span><span
dir=RTL></span><span lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;
color:black'><span dir=RTL></span><span dir=RTL></span>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>COOKIES</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span lang=HE dir=RTL style='font-size:10.5pt;
font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We may use cookies that may uniquely identify
your browser. You will be prompted to allow Cookies on your first access to the
Site. You are not obliged to accept Cookies, however, not accepting Cookies may
interfere with you experience with the Site and might prevent us from providing
you certain services.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><u><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>What Are Cookies?</span></u></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>“Cookies” are a feature in your browser
software. A cookie is a small text file that is stored on a user's computer for
record keeping purposes and to improve your experience.&nbsp;If enabled, we may
write cookies that may store small amounts of data on your computer.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><u><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>How We Use Cookies</span></u></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Using Cookies is a common practice with many
professional sites. When you visit the Site, if your computer and browser allow
receiving Cookies, we send you a Cookie to be stored on your computer. By using
the Cookie we track certain non-personally identifiable information with
respect to your behavior on the Site. Cookies assist us in tracking which of
our features appeal the most to you and what content you may have viewed on
past visits. When you visit the Site again, cookies can enable us to customize
our content according to your preferences. We may use cookies to: keep track of
the number of return visits to the Site; accumulate and report aggregate,
statistical information on the Site's usage; deliver specific content to you
based on your interests or past viewing history.&nbsp;Note that we might also
use cookies provided by trusted third parties. Such third party cookies may,
among other, include cookies set by social media sites like Facebook, Twitter
etc.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><u><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Disabling Cookies</span></u></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>You may prevent receipt of Cookies by adjusting
your browser preferences. Those can be modified to accept or reject all
cookies, or request a notification when a cookie is set (see your browser Help
for how to do this). Please note that We use both session cookies, which
terminate when a user closes his/her browser, and persistent cookies, which
remain on the user's computer until manually deleted. Kindly note that you have
the ability to accept, decline, move or remove cookies at any time by modifying
your browser settings. However, be aware that disabling cookies will affect the
functionality of this and many other websites that you visit. Disabling cookies
will usually result in also disabling certain functionality and features of the
Site.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>For more general information on Cookies see
the&nbsp;</span><a href="https://en.wikipedia.org/wiki/HTTP_cookie"
target="_blank"><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
border:none windowtext 1.0pt;padding:0in'>Wikipedia for HTTP Cookies</span></a></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>KEEPING PERSONAL INFORMATION ACCURATE</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We do our best to ensure that Personal
Information that are inaccurate are corrected or erased or rectified without
delay. If you become aware of any inaccurate information you have provided us
with and/or if there is any change in any information you have provided us
with, please let us know of it promptly at contact@jobs-bear.com, so we may
erase and/or correct such information.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>STORING INFORMATION AND CROSS BORDER DATA
TRANSFER</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Personal Information and Non-Personal
information collected by Us and/or provided by you (<b>&quot;Information&quot;</b>)
may be stored in two types of locations:</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Local
     storage - We may store Information (including Personal Information)
     locally on your device.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Servers
     – We may store Information on our servers (and/or third parties' servers
     we may use for this purpose) (the&nbsp;<b>&quot;Servers&quot;</b>). </span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We store Personal Information for longer periods
insofar as such Personal Information is required for any of the Purposes.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We use reliable third parties’ services (<i>e.g.&nbsp;</i>Amazon,
Microsoft, Google) for storing your personal data. We ensure these providers
implement sufficient security measures, however, we do not always control the
exact location of the servers on which your Personal Data is stored. Therefore,
your Personal Data may be transferred to a third country or international
organization to which an adequacy decision by the Commission (as defined in the
GDPR) may or may not apply.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>However, after all, we may, knowingly or
unknowingly, transfer your Personal Data to a country or international
organization to which an adequacy decision by the Commission (as defined in the
GDPR) does not apply and without implementing appropriate safeguards pursuant.
Such transfer may put your Personal Data in risk. <b>By entering the Site and
using it you explicitly consent that we transfer your Personal Data to the
proposed transfer</b>. Such transfer may be necessary for the performance of
our services for you.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We do our best to ensure appropriate security of
the Personal Information, including protection against unauthorized or unlawful
processing and against accidental loss, destruction or damage, using
appropriate technical or organizational measures.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>You can notify us by sending an email
to:&nbsp;contact@jobs-bear.com and we will make reasonable efforts to make any
of the aforementioned, pursuant to any applicable privacy laws.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>HOW LONG WE KEEP INFORMATION</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We keep your Information for only as long as we
need to. How long we need your Information depends on what we are using it for,
as set out in this Privacy Policy. For example, we may need to use it to answer
your queries about a Product or Service and as a result may keep Information
while you are still using our Product or Services. We may also need to keep
your Information for accounting purposes. If we no longer need your
Information, we will delete it or make it anonymous by removing all details
that identify you. If we have asked for your permission to process your
Information and we have no other lawful grounds to continue with that
processing, and you withdraw your permission, we will delete your Information.
You also have the right to ask Us to delete your Information or restrict how it
is used. There may be exceptions to the right to erasure for specific legal
reasons which, if applicable, We will set out for you in response to your
request. Where applicable, you have the right to object to processing of your
Information for certain purposes.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>SHARING INFORMATION WITH THIRD PARTIES</span></b><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;color:black'><br>
&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We may, and by using the Site you agree, consent
and approve us to share or transfer Non-Personal Information to third parties.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We may, and by using the Site you agree, consent
and approve us to disclose to third parties your Personal Information as set
forth below:</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>To
     companies and individuals, we employ to perform technical functions on our
     behalf.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>To
     determine what opportunities are right for you.&nbsp;Subject to your
     consent we may disclose your Personal Information to third parties to
     provide you with career-related information and to contact you about other
     opportunities, products or services of third parties.</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
dir=RTL></span><span dir=RTL></span><span lang=HE style='font-size:10.5pt;
font-family:"Times New Roman",serif;color:black'><span dir=RTL></span><span
dir=RTL></span>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>The
     Site uses your Personal Information to determine whether you might be interested
     in the opportunities, products or services of a particular third party.
     This may include business co-operations between the site and third parties
     for profit (<b>&quot;Partners&quot;</b>).</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>In
     an event of a merger or acquisition we may disclose and transfer your
     Personal Information to a third party who acquires any or all of our
     business.</span></li>
</ul>

<p class=MsoNormal dir=RTL style='margin-bottom:0in;line-height:18.0pt'><span
lang=HE style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<ul style='margin-top:0in' type=disc>
 <li class=MsoNormal dir=LTR style='color:black;margin-right:0in;margin-bottom:
     0in;margin-left:.5in;text-align:justify;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>In
     the event we become the subject of an insolvency proceeding, we or our
     liquidator, administrator, receiver or administrative receiver may sell,
     license or otherwise dispose of your Personal Information in a transaction
     approved by the court.</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span lang=HE dir=RTL
style='font-size:10.5pt;font-family:"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We may also share Personal Information with
companies, organizations or individuals if we have a good-faith belief that
access, use, preservation or disclosure of the Information is reasonably
necessary to meet any applicable law, regulation, legal process or enforceable
governmental request, enforce applicable terms of service, including
investigation of potential violations, detect, prevent, or otherwise address
fraud, security or technical issues or protect against harm to the rights,
property or safety of the Site, our users or the public as required or
permitted by law.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>When you use the Site it may refer your inquiry
or link you to a third party provider (<b>&quot;Provider&quot;</b>). Any information
you provide to a provider or collected by such Provider is subject to the
Provider's privacy policy and the Site shall not have any responsibility over
such use. Note that if you provide a Provider with certain personal information
it may have access to the information we have collected about you.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>Our Providers and Partners as for the date first
stated above are as follows and you may find their privacy policies at the link
beside each name:</span></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:#606486;margin-right:0in;margin-bottom:
     10.0pt;margin-left:.5in;text-align:left;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Neuvoo</span><span
     dir=RTL></span><span dir=RTL></span><span lang=HE dir=RTL
     style='font-size:10.5pt;font-family:"Times New Roman",serif'><span
     dir=RTL></span><span dir=RTL></span>:&nbsp;</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="http://neuvoo.co.uk/tos/"><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
border:none windowtext 1.0pt;padding:0in'>Terms of Use</span></a></p>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="http://neuvoo.co.uk/tos/"><span style='font-size:10.5pt;font-family:"Lato",sans-serif;
border:none windowtext 1.0pt;padding:0in'>Privacy Policy</span></a></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:#606486;margin-right:0in;margin-bottom:
     10.0pt;margin-left:.5in;text-align:left;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Austinshire
     Partners:</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://resultsgeneration.com/terms-of-use"><span style='font-size:10.5pt;
font-family:"Lato",sans-serif;border:none windowtext 1.0pt;padding:0in'>Terms
of Use</span></a></p>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://resultsgeneration.com/privacy-policy-uk"><span style='font-size:
10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;padding:0in'>Privacy
Policy</span></a></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:#606486;margin-right:0in;margin-bottom:
     10.0pt;margin-left:.5in;text-align:left;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>ATTB
     Group:</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://www.allthetopbananas.com/TC.aspx"><span style='font-size:10.5pt;
font-family:"Lato",sans-serif;border:none windowtext 1.0pt;padding:0in'>Terms
of Use</span></a></p>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://www.allthetopbananas.com/PrivacyPolicy.aspx"><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
padding:0in'>Privacy Policy</span></a></p>

<ul type=disc>
 <li class=MsoNormal dir=LTR style='color:#606486;margin-right:0in;margin-bottom:
     10.0pt;margin-left:.5in;text-align:left;line-height:normal;direction:ltr;
     unicode-bidi:embed'><span style='font-size:10.5pt;font-family:"Lato",sans-serif'>Adzuna:</span></li>
</ul>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://www.adzuna.co.uk/terms-and-conditions.html"><span
style='font-size:10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;
padding:0in'>Terms of Use</span></a></p>

<p class=MsoNormal dir=LTR style='margin-bottom:10.0pt;margin-left:1.5in;
text-align:left;text-indent:-.25in;line-height:normal;direction:ltr;unicode-bidi:
embed'><span style='font-size:10.0pt;font-family:"Courier New";color:black'>o<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><a
href="https://www.adzuna.co.uk/privacy-policy.html"><span style='font-size:
10.5pt;font-family:"Lato",sans-serif;border:none windowtext 1.0pt;padding:0in'>Privacy
Policy</span></a></p>

<p class=MsoNormal dir=LTR style='margin-bottom:0in;text-align:justify;
line-height:18.0pt;direction:ltr;unicode-bidi:embed'><span style='font-size:
10.5pt;font-family:"Lato",sans-serif;color:black'>We may also share your
information in case we have a reason to believe, in good faith, that such sharing
is required in order to comply with any applicable law, to prevent crime and/or
to protect national and/or personal security.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>If you sign up for email job alerts, we will
send you job alerts via email. You can unsubscribe at any time. We will share
your email address and job-related preferences with the vendor that we use to
send you email job alerts. The vendor is located in the U.S., and is Privacy
Shield certified, which requires the vendor to provide a similar level of
protection for personal data shared between Europe and the U.S.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span><span style='font-size:10.5pt;
font-family:"Lato",sans-serif;color:black'>If you decide to sign up for our SMS
job alerts program, you will be asked to provide your phone number. Your phone
number will not be shared with 3rd parties unless you explicitly request us
otherwise.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>In the event we transfer our business or any
part thereof to any third party, we may transfer your information to such third
party, which may use them under the provisions of this Privacy Policy.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><b><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>SECURITY</span></b></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>We do our utmost to ensure that all reasonable
steps are taken to make sure your Personal Information and data is stored
securely in accordance with the principles of the GDPR. Data security is very
important to us and to protect Your data we have taken suitable measures to
safeguard and secure data collected through our Site. However, please note the
Internet and the electronic transmission of information can never be entirely
secure. We cannot guarantee that the security measures we have in place to
safeguard Data will never be defeated or fail, or that those measures will
always be sufficient or effective. Therefore, although we are committed to
protecting Your privacy, we cannot guarantee that Your Data will always remain
confidential. You understand and agree that you assume all responsibility and
risk for your conduct and use of the Site and the information You send us
electronically or otherwise which You post to the Site.</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>If you feel that your privacy was treated not in
accordance with our Policy, please contact us directly
at&nbsp;contact@jobs-bear.com</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:left;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Times New Roman",serif;color:black'>&nbsp;</span></p>

<p class=MsoNormal dir=LTR style='margin-top:12.0pt;margin-right:0in;
margin-bottom:0in;margin-left:0in;text-align:justify;line-height:18.0pt;
direction:ltr;unicode-bidi:embed'><span style='font-size:10.5pt;font-family:
"Lato",sans-serif;color:black'>If you have any questions or comments concerning
this Privacy Policy, you are welcome to send Us an e-mail. We are Adworks Ltd
(company ID 515257780), and you can email us at contact@jobs-bear.com, or send
us postal mail to HaYetzira, Ramat Gan, Israel (ZipCode 5252173) or contact us
by phone at +97237755000, and we will make an effort to reply within a
reasonable timeframe.</span></p>

<p class=MsoNormal dir=LTR style='text-align:left;direction:ltr;unicode-bidi:
embed'><span lang=HE dir=RTL style='font-family:"Arial",sans-serif'>&nbsp;</span></p>

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

export default PrivacyPolicy;
