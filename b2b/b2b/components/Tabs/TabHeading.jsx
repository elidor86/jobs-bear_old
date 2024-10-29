import styled from "styled-components";

const TabHeading = ({ label, isActive, onClick }) => (
  <Wrapper isActive={isActive} onClick={onClick}>
    {label}
  </Wrapper>
);

const Wrapper = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #3e4598;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  border-bottom: 3px solid ${({ isActive }) => (isActive ? "#D92CFF" : "transparent")};
  padding-bottom: 12px;
`;

export default TabHeading;
