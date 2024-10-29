import SmallCard from "../../../../src/b2b/components/Cards/SmallCard";
import styled from "styled-components";
import React from "react";
import MediumCard from "../../../../src/b2b/components/Cards/MediumCard";
import Accordion from "../../../../src/b2b/components/Cards/Accordion";
import {Logistics} from "../../../../static/b2b/images/cards/Accordion/Logistics";
import {Hotel} from "../../../../static/b2b/images/cards/Accordion/Hotel";
import {Retail} from "../../../../static/b2b/images/cards/Accordion/Retail";

const items = [
    {
        id: 1,
        heading: {
            title: "Logistics",
            icon: <Logistics/>,
            backgroundColor: "#6870C2",
        },
        content: {
            title: "free training , immediate start , no experience",
            img: "/static/b2b/images/cards/Accordion/tab1.png",
        },
    },
    {
        id: 2,
        heading: {
            title: "Hotel",
            icon: <Hotel/>,
            backgroundColor: "#8089DC",
        },
        content: {
            title: "free training , immediate start , no experience",
            img: "/static/b2b/images/cards/Accordion/tab2.png",
        },
    },
    {
        id: 3,
        heading: {
            title: "Retail",
            icon: <Retail/>,
            backgroundColor: "#A0A8F0",
        },
        content: {
            title: "free training , immediate start , no experience",
            img: "/static/b2b/images/cards/Accordion/tab3.png",
        },
    },
];

const NewCards = () => (
    <Wrapper>
        <SmallCard
            img="/static/b2b/images/cards/smallCard/smallCard.png"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            buttonText="View xxx jobs now"
            label
        />
        <MediumCard
            img="/static/b2b/images/cards/mediumCard/mediumCard.png"
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit  ipsumdjhfnjjjhgcnmdndnndk djdmdmdmdkd jdj"
            buttonText="View XXX jobs"
            label
        />
        <Accordion items={items} title="Trending opportunities near you"/>
    </Wrapper>
);

const Wrapper = styled("div")({
    display: "flex",
    gap: "20px",
    padding: "20px",
});

export default NewCards;
