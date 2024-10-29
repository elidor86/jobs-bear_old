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

const Article6 = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc="/static/b2b/images/articlePage/ArticleImage.png" />
        <Title>What Your Manager Cannot Do Legally, Some May Astound You</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
        <Content>
          <Description title="Subtext:">
            Whether you're searching for your next career or currently employed, there are certain things you should know regarding your
            workplace rights and the limitations of your superiors.
          </Description>
          <Description title="Body:">
            <Description>
              As an employee, there are fundamental rights that safeguard you from poor treatment, insufficient pay, and many other forms of
              harmful workplace practices by an employer.
            </Description>
            <Description>
              All employers are different, but there are certain things they cannot do.
            </Description>
            <Description>
              By understanding the legal limits of your employer's actions, you can protect yourself in the workplace.
            </Description>
          </Description>
          <ListOfItems titleOfSection="Key takeaways:">
            <li>
              Illegal actions or enquiries may be made by employers.
            </li>
            <li>
              You have rights under UK employment law that protects you at work.
            </li>
            <li>
              Research has found that 40% of people working full time jobs in the UK have witnessed or experienced illegal acts of conduct
              by an employer.
            </li>
          </ListOfItems>
          <ListOfItems titleOfSection="Legally, your employer is restricted from:" listTypeNumber>
            <li>
              <p>
                Asking you to take a lie detector test
              </p>
              Your employer cannot legally require you to take a polygraph test during a job interview or during your employment. The
              Polygraph ( Lie Detector) Tests for Employment Purposes Regulations prohibits employers from administering lie detector tests
              and dismissing employees for refusing to take one.
            </li>
            <li>
              <p>
                Asking you about your political views
              </p>
              Your employer cannot ask you about your political views or affiliations. This type of information is considered private and is
              protected under the Human Rights Act 1998. If your employer does ask you this, you have the right to decline to answer.
            </li>
            <li>
              <p>
                Punishing you for social media complaints
              </p>
              Posting about compensation or workplace conditions on social media can be frowned upon by your employer, but by law, they
              cannot discipline or dismiss you for it.
            </li>
            <li>
              <p>
                Asking you to work in unsafe conditions
              </p>
              Your employer has a legal obligation to provide a safe working environment for you. If your employer requires you to work in
              conditions that are hazardous to your health or safety, they are breaking the law and you have every right to file a complaint
              under the Health and Safety at Work Act.
            </li>
            <li>
              <p>
                Asking you to work overtime without compensation
              </p>
              The law requires overtime pay for non-exempt employees who work over 40 hours in a workweek at 1.5 times their regular pay.
              Unless stated otherwise in your contract, if you’re employer asks you to work overtime without compensating your pay, they are
              breaking the law.
            </li>
          </ListOfItems>
          <Description>
            Every work environment is different, but by becoming familiar with the guidelines, you can secure yourself and your loved ones
            from illegal behavior in the workplace.
          </Description>
        </Content>
      </Container>
    </PageLayout>
  );
};

Article6.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default Article6;
