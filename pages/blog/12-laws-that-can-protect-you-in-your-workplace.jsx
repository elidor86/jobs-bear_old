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

const Article1 = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc='/static/b2b/images/articlePage/ArticleImage.png' />
        <Title>12 laws that can protect you in your workplace</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
       <Content>
         <Description>
           Labor laws were made to provide security and ensure employees are protected in the workplace.  Without being aware of standard laws, your right may be violated and go unnoticed. By understanding these laws in the work field, you can make sure you are properly treated and compensated as deserved.
         </Description>
         <ListOfItems listTypeNumber>
           <li>
             <p>You have the right to request your personnel file at any time</p>
             Most employees, including former employees, have the right to inspect and receive a copy of their personnel files. Your employer must allow you to inspect and copy your file within a “reasonable” amount of time after you request it.
           </li>
           <li>
             <p>A termination that is unfair is not necessarily illegal.</p>
             In most circumstances, employers have the right to terminate employees at any time for any reason. However, there are exceptions to this “at-will” rule. It is illegal for your employer to terminate you because of your race, gender, age, medical condition, or for other reasons specified by law.
           </li>
           <li>
             <p>You may be eligible for “waiting time penalties” if your last paycheck was delayed</p>
             If you were fired or laid off, your employer is obligated to pay wages due to you upon time of termination.
           </li>
           <li>
             <p>Unused vacation pay</p>
             You do not forfeit unused vacation when your employment ends. When you are terminated or quit, you are entitled to your unused vacation pay, just like any other unpaid wages.
           </li>
           <li>
             <p>Reference from a former employer</p>
             Your former employer is legally able to say bad things about you or your work performance as long as the comments are truthful. However, your former employer cannot provide false information about your work performance to prevent you from getting a new job.
           </li>
           <li>
             <p>Family/medical leave</p>
             Under family/medical leave laws, you may be entitled to 12 weeks of unpaid leave for medical reasons or to bond with a newborn baby. Your employer must maintain your health benefits during your leave and must reinstate you to the same or equivalent position when you return.
           </li>
           <li>
             <p>State Disability Insurance (SDI)</p>
             Workers who participate in the SDI program are entitled to a maximum of six weeks of partial pay while taking time off from work for bonding with a newborn baby or caring for a seriously ill family member.
           </li>
           <li>
             <p>Deductions from pay</p>
             Your employer cannot deduct money from your pay for a loss caused by a simple mistake or accident.
           </li>
           <li>
             <p>Overtime pay</p>
             As a “non-exempt” employee, if you work more than 8 hours in a day or 40 hours in a week, you are entitled to overtime pay. The rate of overtime pay is 1.5 times your regular rate of pay.
           </li>
           <li>
             <p>Meal and rest breaks</p>
             Your employer must provide you with a 30-minute meal break if you work more than 5 hours in a day and a 10-minute rest break for every 4 hours of work.
           </li>
           <li>
             <p>Workers' compensation</p>
             If you are injured on the job, you may be entitled to workers’ compensation benefits, including medical treatment and payment for lost wages.
           </li>
           <li>
             <p>Refuse to work in unsafe conditions</p>
             You can refuse unsafe work if it violates the law and is hazardous. Inform your supervisor of the issue and give them a chance to fix it. If they don\'t, you can refuse the work in writing or in front of others, explaining why and file a complaint.
           </li>
         </ListOfItems>
         <Description>
           In conclusion, it is important to understand rights in the workplace. By knowing these laws, you can ensure proper treatment and fair compensation in the workplace.
         </Description>
       </Content>
      </Container>
    </PageLayout>
  )
};

Article1.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default Article1;
