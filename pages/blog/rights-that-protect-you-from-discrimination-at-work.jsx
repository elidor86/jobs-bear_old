import React from "react";

import { defaultCountry } from "../../b2b/lib/countryUtils";
import PageLayout from "../../b2b/layouts/PageLayouts";
import Header from "../../b2b/modules/Article/components/Header";
import ArticleImage from "../../b2b/modules/Article/components/ArticleImage";
import Content from "../../b2b/modules/Blog/Content";
import Title from "../../b2b/modules/Blog/Title";
import Description from "../../b2b/modules/Blog/Description";
import Container from "../../b2b/components/Container/Container";
import DateTimeRead from "../../b2b/modules/Blog/DateTimeRead";
import ListOfItems from "../../b2b/modules/Blog/ListOfItems";
import Link from "../../b2b/modules/Blog/Link";

const Article = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc='/static/b2b/images/articlePage/ArticleImage.png' />
        <Title>Rights that protect you from discrimination at work</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
       <Content>
         <Description>
           When applying for a new job, you should know there are laws that protect you from being discriminated against at work.
           During the hiring process, you may be asked to provide your <Link href="https://www.creditsaint.com/">credit score</Link> by your employer, but are you required to do so?
         </Description>
         <ListOfItems title='Key takeaways:'>
          <li>
            Your employer may ask to see your credit report sometime throughout the hiring process.
          </li>
          <li>
            Understanding your rights under the Fair Credit Reporting Act (FCRA) a federal law that helps ensure fairness and privacy of the consumer.
          </li>
          <li>
            1 out of 5 people have a credit report error, according to research.
          </li>
         </ListOfItems>
         <ListOfItems title='Your rights by law:' listTypeNumber>
        <li>
          There are 11 states where it is illegal for an employer to check your credit score. However, these laws may vary and it’s best to check the current law in your state before disclosing information.
        </li>
        <li>
          Employers are restricted from accessing your information without your written consent. You must give written consent for an employer to access your credit report and there may even be additional requirements in some states as well.
        </li>
        <li>
          You have the right to know if your application has or is being used against you denying you employment. If you feel you have been discriminated against according to your score, you have the right to appeal.
        </li>
        <li>
          You the right to request and access ALL information a consumer reporting agency has about you. You are entitled to one free file disclosure a year from each national credit bureau.
        </li>
        <li>
          You have the right to dispute what you believe to be inaccurate or incomplete information on your credit report. If you believe there is an error in your credit report, you are allowed to raise a flag.
        </li>
         </ListOfItems>
         <Description>
           Did you know an estimated 1 in 5 credit reports contains an error leading to a negative credit score?  A poor credit score can mean a higher interest rate on loans, trouble in renting an apartment or getting a mortgage, and difficulty in getting a job. Therefore, we strongly encourage you to remove inaccuracies from your report yourself, it’s free and the law is on your side.
         </Description>
         <Description>
           Bear in mind, there are services that repair credit and can save you time, headache, and frustration of doing it on your own, but beware of scam companies that crawl among the internet.
         </Description>
         <Description>
           Jobs Bear invested research, time and money searching the market for the top ranked agency that provides real-value to consumers and can vouch for <Link href="https://try.creditsaint.com/cs1/">Credit Saint's</Link>  90-day money back guarantee program, offering FREE credit evaluation and no obligation whatsoever.
         </Description>
         <Description>
           Overall, although you aren’t legally obliged to do so, it's smart to have a plan for repairing your credit going forward and can even raise your chances of scoring your next job.
         </Description>
       </Content>
      </Container>
    </PageLayout>
  )
};

Article.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default Article;
