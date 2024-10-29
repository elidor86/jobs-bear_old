import {useState} from "react";
import styled from "styled-components";
import React from "react";

import Container from "../../../components/Container/Container";
import TabHeading from "../../../components/Tabs/TabHeading";
import TabContent from "../../../components/Tabs/TabContent";
import JobCard from "./JobCard";
import JobCardShowMore from "./JobCardShowMore";
import JobLocationCard from "./JobLocationCard";

const tabs = {
    industry: "Industry",
    location: "Location",
};

const BrowseJobs = ({industryJobs, locationJobs, country, app}) => {
    const [activeTab, setActiveTab] = useState(tabs.industry);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Wrapper>
            <Container>
                <Title>Browse Jobs by</Title>

                <TabHeadings>
                    {Object.values(tabs).map((tab) => (
                        <TabHeading label={tab} key={tab} isActive={activeTab === tab}
                                    onClick={() => handleTabClick(tab)}/>
                    ))}
                </TabHeadings>

                <TabContent isActive={tabs.industry === activeTab}>
                    <JobsIndustryWrapper>
                        {industryJobs.map((job) => (
                            <JobCard {...job} key={job.icon + "jobs-industry-card"} app={app}/>
                        ))}
                    </JobsIndustryWrapper>
                </TabContent>

                <TabContent isActive={tabs.location === activeTab}>
                    <JobsLocationWrapper>
                        {locationJobs?.[country]?.map((job) => (
                            <JobLocationCard {...job} key={job.icon + job.title + "jobs-location-card"} app={app}/>
                        ))}

                    </JobsLocationWrapper>
                </TabContent>

            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  padding: 97px 0;
  background: #fff;

  @media (max-width: 701px) {
    padding: 26px 0 38px;
  }
`;

const TabHeadings = styled.div`
  display: flex;
  column-gap: 35px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 36px;
`;

const JobsIndustryWrapper = styled.div`
  display: flex;
  margin-top: 55px;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  row-gap: 36px;

  & > div {
    width: calc(33% - 20px);
  }

  @media (max-width: 1101px) {
    & > div {
      width: calc(50% - 20px);
    }
  }

  @media (max-width: 701px) {
    margin-top: 36px;
    row-gap: 0px;
    & > div {
      width: calc(100%);
    }
  }
`;

const JobsLocationWrapper = styled.div`
  display: flex;
  margin-top: 55px;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  row-gap: 117px;

  & > div {
    width: calc(20% - 12px);
  }

  @media (max-width: 1101px) {
    row-gap: 50px;
    & > div {
      width: calc(33% - 12px);
    }
  }

  @media (max-width: 701px) {
    row-gap: 20px;
    margin-top: 40px;
    & > div {
      width: calc(50% - 12px);
    }
  }

  @media (max-width: 401px) {
    & > div {
      width: calc(100%);
    }
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  line-height: 45px;
  color: #3e4598;

  b {
    font-weight: 800;
  }

  @media (max-width: 701px) {
    font-size: 24px;
  }
`;

export default BrowseJobs;
