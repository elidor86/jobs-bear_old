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

const Article7 = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc="/static/b2b/images/articlePage/ArticleImage.png" />
        <Title>Protect your rights: Was your dismissal legal?</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
        <Content>
          <Description title="Subtext:">
            If you believe that you have been unjustly dismissed, it is crucial to understand your rights in terms of available actions.
          </Description>
          <Description title="Body:">
            Losing your job can be a tough and distressing situation, but if you feel that your dismissal was illegal, it can be even more
            traumatic. Understanding the laws surrounding wrongful termination can help you figure out if your rights have been violated and
            if you have a valid claim.
          </Description>

          <Description title="What Constitutes Wrongful Termination?">
            Wrongful termination takes place when an employer dismisses an employee for an unlawful reason. This includes situations where
            the termination contravenes an employment contract, national or local laws, or public policy.
          </Description>

          <ListOfItems titleOfSection="Some common examples of wrongful termination include dismissals due to:" listTypeNumber>
            <li>
              <p>Whistleblowing:</p>
              Reporting illegal or unethical actions by the company or a colleague
            </li>
            <li>
              <p>Discrimination:</p>
              Based on race, gender, age, religion, national origin, or disability.
            </li>
            <li>
              <p>Breach of contract:</p>
              For exercising a lawful right, such as taking time off for medical reasons or complaining about workplace harassment.
            </li>
            <li>
              <p>Retaliation</p>
              If the employer dismisses the employee without cause and there was an employment contract in place.
            </li>
          </ListOfItems>
          <Description title='What to Do If You Believe You’ve Been Wrongfully Terminated' />
          <Description title='If you think that you have been wrongfully terminated, it is important to take the following steps:'>
            {content.ifYouThink.titleOfSection}
          </Description>
          <ListOfItems>
            <li>
              Document your case: Keep any relevant documentation, such as emails, performance reviews, and statements from witnesses.
            </li>
            <li>
              File a complaint: Contact the relevant government agency, such as the Equality and Human Rights Commission (EHRC).
            </li>
            <li>
              Consult a solicitor: An experienced employment solicitor can help you understand your rights and offer advice on the best course of action.
            </li>
          </ListOfItems>
          <Description>
            It is crucial to act promptly if you believe you have been wrongfully terminated, as there are usually deadlines for filing claims. A solicitor can assist you in understanding the limitation period for your case and make sure that your rights are protected.
          </Description>
          <Description>
            Wrongful termination is a serious matter, and if you feel that you have been dismissed for an illegal reason, it is important to raise a flag as soon as possible. Understanding the laws surrounding wrongful termination and taking the necessary steps can help you safeguard your rights and ensure that you receive the justice you are entitled to.
          </Description>
        </Content>
      </Container>
    </PageLayout>
  );
};

Article7.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default Article7;
