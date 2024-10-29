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

const Article5 = ({ country }) => {
  return (
    <PageLayout country={country}>
      <Header />
      <Container>
        <ArticleImage imageSrc='/static/b2b/images/articlePage/ArticleImage.png' />
        <Title>20 Side Hustle Jobs to Boost Your Income</Title>
        <DateTimeRead>January 2023 / 4 Min Read</DateTimeRead>
       <Content>
         <Description title='Subtext:'>
           Times are difficult and reaching a steady income is becoming more stressful/challenging each day. Luckily, gig jobs are picking up speed with vast options to help boost your income. We have compiled a list of the top 20 gig jobs currently in the market to help get you back on your feet.
         </Description>
         <Description title='Subtext:'>
           <Description>
             The repercussions of the worldwide pandemic on the economy will continue to be felt for some time to come.  Job security is no longer a guarantee, and relying solely on one income source can be risky, which can leave you and your loved ones in a state of uncertainty.
           </Description>
           <Description>
             Luckily, the gig economy is accelerating and offering new and flexible ways to achieve an extra source of income.
           </Description>
         </Description>
         <ListOfItems titleOfSection='We’ve went ahead and researched the top paying and beneficial gig jobs out there, so that you don’t have to:'>
           <li>
             <p>Rideshare driver jobs</p>
             If you have a car and enjoy driving, then becoming a rideshare driver may be a good fit for you. This can be done on your schedule and can possibly allow you to write off some of your vehicle expenses as tax deductions.
           </li>
           <li>
             <p>Food delivery driver jobs</p>
             Online food delivery is a lucrative gig job opportunity, where one can make deliveries using personal vehicle, bike, scooter or foot and keep 100% of tips, without using personal money, through various apps available.
           </li>
           <li>
             <p>Pet sitter jobs</p>
             If you’re a pet lover, pet sitting could be a great option for you. There are various apps that offer pet sitting services that are easy to apply to, and you can choose your own schedule according to your convenience.
           </li>
           <li>
             <p>Mover jobs</p>
             Being able to lift 50-100 pounds is a requirement for this gig job where one can pick available gigs, earn tips, and get paid directly through moving apps after completing necessary application and background check processes.
           </li>
           <li>
             <p>Freelancer</p>
             Being a freelancer as a part-time job involves offering your skills and services to clients on a project basis, rather than being a permanent employee.
           </li>
           <li>
             <p>Scooter maintenance</p>
             Charging on-demand scooters for companies like Bird, in metropolitan areas, can be a lucrative gig job with earning potential of hundreds of dollars a month, requiring only the availability to pick up and charge the scooters each evening.
           </li>
           <li>
             <p>Virtual assistant</p>
             Virtual assisting is a rapidly growing market with flexible earning potential, offering services such as data entry, appointments and travel arrangements, either as an independent contractor or through virtual assistant companies.
           </li>
           <li>
             <p>Babysitter</p>
             Babysitting, an old-school gig economy job, is preferred by many parents and can be found through babysitting websites or word-of-mouth referrals, providing safe and easy opportunities for adults to earn money.
           </li>
           <li>
             <p>Telehealth provider</p>
             Telehealth opportunities are available for healthcare workers looking for a change of scenery or to supplement their income.
           </li>
           <li>
             <p>Handyman</p>
             Working as a handyman involves tasks like furniture moving and wall repair, and can be found through gig apps, with a vehicle and necessary tools required.
           </li>
           <li>
             <p>Delivery driver jobs</p>
             eCommerce delivery is a growing gig economy job, with companies expanding their delivery workforce to keep up with the rise of online orders.
           </li>
           <li>
             <p>House sitter</p>
             House sitting is a way to travel or make money by taking care of someone's home and pets while they're away and can be found through housesitting apps with a yearly subscription fee.
           </li>
           <li>
             <p>Catering assistance</p>
             If you have a passion for food and drink service, catering might be a good option for your next gig job. These jobs usually work by events and shifts, making it flexible according to your schedule.
           </li>
           <li>
             <p>Retail part-time</p>
             If you’re a people person and enjoy working with customers, retail part-time jobs could be a good solution for you.
           </li>
           <li>
             <p>Gardener</p>
             A gardener as a part-time job involves the maintenance and care of plants and lawns, including tasks such as planting, pruning, and watering.
           </li>
           <li>
             <p>Grocery bagger</p>
             A bagger packs customers' items and helps carry them to their vehicles. They are commonly employed by grocery stores during busy days and can be offered as part time jobs.
           </li>
           <li>
             <p>Clean offices</p>
             Cleaning offices as a part-time job involves physically cleaning and maintaining the neatness and cleanliness of an office space.
           </li>
           <li>
             <p>Taking online surveys</p>
             Taking online surveys as a part-time job involves answering questions and providing opinions through the internet in exchange for compensation.
           </li>
         </ListOfItems>
         <Description title='Summary'>
          Whether you're looking to make an extra buck or searching for alternative sources of income, these 20 gig jobs offer various opportunities to suit your skills and schedule. Consider starting a side hustle to boost your income and achieve financial stability.
         </Description>
       </Content>
      </Container>
    </PageLayout>
  )
};

Article5.getInitialProps = async (ctx) => {
  const country = ctx?.req?.session || defaultCountry;

  return {
    country,
  };
};

export default Article5;
