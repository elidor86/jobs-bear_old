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
import styled from "styled-components";

const Article3 = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc="/static/b2b/images/articlePage/ArticleImage.png" />
        <Title>Know your rights: Was your fire illegal?</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
        <Content>
          <Description>
            Being fired from a job is never a pleasant experience. In general, an employer has the right to fire an employee at any time for
            any reason, as long as it stays within legal boundaries. But If you have recently been fired from a job, how can you determine
            if the fire was legal, and if it wasn’t, what can be done about it?"
          </Description>
          <Description title="What is wrongful termination?">
            Wrongful termination is when an employer fires an employee for an illegal reason. This includes situations where the termination
            violates an employment contract, federal or state law, or public policy.
          </Description>
          <ListOfItems title="Illegal termination includes firing an employee for:" listTypeNumber>
            <li>
              <p>Whistleblowing:</p>
              Your employer may ask to see your credit report sometime throughout the hiring process.
            </li>
            <li>
              <p>Discrimination:</p>
              Based on race, gender, age, religion, national origin, or disability.
            </li>
            <li>
              <p>Retaliation:</p>
              For exercising a legal right, such as taking medical leave or complaining about workplace harassment.
            </li>
            <li>
              <p>Breach of contract:</p>
              If the employer terminates the employee without cause, and there was an employment contract in place.
            </li>
          </ListOfItems>

          <Description title='What to do if You Believe You’ve Been Wrongfully Terminated'>
            <Wrapper>
              <Description>
                If you believe that you have been wrongfully terminated, it is important to take the following steps:
              </Description>
              <Description>
                Document your case: Keep any relevant documentation, such as emails, performance reviews, and witness statements.
              </Description>
              <Description>
                File a complaint: Contact the appropriate government agency, such as the Equal Employment Opportunity Commission (EEOC) or the Department of Labor.
              </Description>
              <Description>
                Consult an attorney: An experienced employment attorney can help you understand your rights and advise you on the best course of action.
              </Description>
              <Description>
                Wrongful termination is a serious issue, and if you believe that you have been fired for an illegal reason, it is important to raise a flag. Understanding the laws surrounding wrongful termination and taking the appropriate steps can help you protect your rights and ensure that you receive the justice you deserve.
              </Description>
            </Wrapper>
          </Description>

        </Content>
      </Container>
    </PageLayout>
  );
};

Article3.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Article3;
