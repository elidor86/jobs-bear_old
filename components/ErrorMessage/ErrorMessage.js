import React, { Component } from "react";
import styled from "styled-components";
import config from "../config/styleConsts";
const { mobileMaxWidth, purple } = config;

const ErrorDiv = styled.div`
  position: absolute;
  width: 236px;
  background: white;
  border-radius: 10px;
  padding: 12px 14px;
  box-sizing: border-box;
  z-index: 99;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 36px;
  ${props => props.toptop && `bottom: 58px;`}
  ${props => props.bar && `bottom: 110px;`}
  ${props => props.bottom && `top: 52px;`}
  ${props => props.top && `bottom: 58px;`}
  left: 0px;
  @media (max-width: ${mobileMaxWidth}) {
    ${props => props.top && `bottom: 58px;`}
    ${props => props.toptop && `bottom: 110px;`}
  }

  :after{
    content: '';
    width: 12px;
    height: 12px;
    background: white;
    position: absolute;
    ${props => props.bottom && `top: -6px;`}
    ${props => props.top && `bottom: -6px;`}
    ${props => props.bar && `bottom: -6px;`}
    
    left: 25%;
    transform: rotate(45deg);
  }
`;

const Message = styled.div`
  color: #ff7199;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  margin-left: 10px;
`;

const ImageError = styled.img`
  min-width: 20px;
`;

class ErrorMessage extends Component {
  render() {
    const { message, position } = this.props;
    if (!message) {
      return null;
    }
    return (
      <ErrorDiv
        bottom={position && position == "bottom"}
        top={position && position == "top"}
        bar={position && position == "bar"}
        toptop={position && position == "toptop"}
      >
        <ImageError src="/static/images/error-icon.svg" />
        <Message>
          <div>{message}</div>
        </Message>
      </ErrorDiv>
    );
  }
}

export default ErrorMessage;
