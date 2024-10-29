import styled from "styled-components";

const Button = ({ children }) => <Wrapper>{children}</Wrapper>;

const Wrapper = styled.button`
  background: #d92cff;
  border-radius: 5px;
  padding: 16px 15px;
  border: none;
  display: block;
  color: #ffffff;
  cursor: pointer;
`;

export default Button;
