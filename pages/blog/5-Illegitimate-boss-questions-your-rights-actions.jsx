import React from "react";

import {defaultCountry} from "../../b2b/lib/countryUtils";
import PageLayout from "../../b2b/layouts/PageLayouts";
import Header from "../../b2b/modules/Article/components/Header";
import ArticleImage from "../../b2b/modules/Article/components/ArticleImage";
import Content from "../../b2b/modules/Blog/Content";
import Title from "../../b2b/modules/Blog/Title";
import Description from "../../b2b/modules/Blog/Description";
import Container from "../../b2b/components/Container/Container";
import DateTimeRead from "../../b2b/modules/Blog/DateTimeRead";
import ListOfItems from "../../b2b/modules/Blog/ListOfItems";

const Article2 = ({country}) => {
    return (
        <PageLayout country={country}>
            <Header/>
            <Container>
                <ArticleImage imageSrc="/static/b2b/images/articlePage/ArticleImage.png"/>
                <Title>5 Illegitimate Boss Questions: Your Rights & Actions</Title>
                <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
                <Content>
                    <Description>
                        As an employee there are basic rights that protect you against poor treatment, inadequate pay,
                        and many other forms of harmful
                        workplace practices by an employer.
                    </Description>
                    <Description>
                        All bosses are different, but no one is above the law. By understanding the legal limits of your
                        boss's actions, you can
                        safeguard yourself in the workplace.
                    </Description>
                    <ListOfItems titleOfSection="Key takeaways:">
                        <li>Illegal actions or inquiries may be made by employers.</li>
                        <li>You have rights under the US labor law that protect you at work</li>
                        <li>More than half of workers (61%) in the US have witnessed or experienced illegal acts of
                            conduct by an employer, according to
                            research.
                        </li>
                    </ListOfItems>
                    <ListOfItems titleOfSection="Legally, your boss is restricted from:" listTypeNumber>
                        <li>
                            <p>Asking you to take a lie detector test</p>
                            Your boss cannot legally require you to take a polygraph test during a job interview or
                            during your employment. The Employee
                            Polygraph Protection Act (EPPA) prohibits employers from administering lie detector tests
                            and firing employees for refusing to
                            take one.
                        </li>
                        <li>
                            <p>Asking you about your political views</p>
                            Your boss cannot ask you about your political views or affiliations. This type of
                            information is considered private and is protected under the First Amendment. If your boss
                            does ask you this, you have the right to decline to answer.
                        </li>
                        <li>
                            <p>Punishing you for social media complaints</p>
                            Posting about compensation or workplace conditions on social media can be frowned upon by
                            your boss, but by law, your employer cannot discipline or fire you for it.
                        </li>
                        <li>
                            <p>Asking you to work in unsafe conditions</p>
                            Your boss has a legal obligation to provide a safe working environment for you. If your boss
                            requires you to work in conditions that are hazardous to your health or safety, they are
                            breaking the law and you have every right to file a complaint.
                        </li>
                        <li>
                            <p>Asking you to work overtime without compensation</p>
                            The law requires overtime pay for non-exempt employees who work over 40 hours in a workweek
                            at 1.5 times their regular pay. Unless stated otherwise in your contract, if you’re employer
                            asks you to work overtime without compensating your pay, they are breaking the law.
                        </li>
                    </ListOfItems>
                    <Description>
                        Every work environment is different, but by becoming familiar with the guidelines, you can
                        secure yourself and your loved ones from illegal behavior in the workplace.
                    </Description>
                </Content>
            </Container>
        </PageLayout>
    );
};

Article2.getInitialProps = async (ctx) => {
    const country = ctx?.req?.session || defaultCountry;

    return {
        country,
    };
};

export default Article2;
