import styled from "styled-components";

const TabContent = ({ children, isActive }) => <Wrapper isActive={isActive}>{children}</Wrapper>;

const Wrapper = styled.div`
  display: none;

  ${({ isActive }) =>
    isActive &&
    `
      display: block;
  `}
`;

export default TabContent;
