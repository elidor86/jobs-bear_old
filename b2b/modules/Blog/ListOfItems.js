import React, { Fragment } from "react";
import styled from "styled-components";

const ListOfItems = ({ titleOfSection, children, listTypeNumber }) => (
  <Wrapper>
    {titleOfSection && <Title>{titleOfSection}</Title>}
    {children && (
      <List className={listTypeNumber ? "listTypeNumber" : ""}>
        {children}
        {/*<li key={description}>{title && <p>{title}</p>}{description}</li>*/}
      </List>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul.listTypeNumber {
    list-style-type: decimal;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 28px;
  line-height: 30px;
  color: #0C264C;

  @media (max-width: 801px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 501px) {
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }
`;

const List = styled.ul`
  margin-left: 20px;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #0C264C;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  @media (max-width: 801px) {
    font-size: 16px;
    line-height: 24px;
  }

  @media (max-width: 501px) {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;
export default ListOfItems;