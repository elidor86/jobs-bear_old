import React from "react";
import styled from "styled-components";


const JobLocationCard = ({ title, link, underline ,app}) => (
  <Wrapper>
    <Title underline={underline}>{title}</Title>
    <Action onClick={(e) => app.b2bEventHandle({eventName: "BrowseJobsBy", location: link.location})}>VIEW JOBS &nbsp;&gt;</Action>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  padding: 0 0 18px;
  border-bottom: 5px solid rgba(217, 44, 255, 0.5);
`;

const Title = styled.p`
  font-family: "Lato";
  font-weight: 800;
  font-size: 16px;
  line-height: 20px;
  color: #3E4598;
`;

const Action = styled.a`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #d92cff;
  cursor: pointer;
`;

export default JobLocationCard;
