import React from 'react';

import styled from "styled-components";
import config from "../config/styleConsts";

const {mobileMaxWidth} = config;

const PartnersDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  padding: 16px;
  padding-left: 8px;
  box-sizing: border-box;

  @media (max-width: ${mobileMaxWidth}) {
    border-bottom: 1px solid rgb(229, 230, 235);
    padding: 0px;
  }
`;

const PartnersHeaderTitle = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #5c6ac4;
  padding-left: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ${props => props.align == "center" && "justify-content: center"} @media(max-width: ${mobileMaxWidth}) {
  padding-top: 16px;
  padding-left: 16px;
}
`;

const PartnersContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
  ${props => props.align == "center" && "justify-content: center"} @media(max-width: ${mobileMaxWidth}) {
  margin-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
}
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 49px;
  background: rgba(96, 111, 199, 0.1);
  border-radius: 10px;
  margin-top: 16px;
  /* margin-left: 23px; */
  box-sizing: border-box;
  @media (max-width: ${mobileMaxWidth}) {
    width: 104px;
    /* margin-left: 8px; */
  }
`;

const Logo = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Icon = styled.img`
  margin-right: 7px;
`;

class Partners extends React.Component {
    render() {
        const {partners, title, align = "left", hideIcon} = this.props;

        return (
            <PartnersDiv className="desctop">
                <PartnersHeaderTitle align={align}>
                    {!hideIcon && <Icon src="/static/images/partner-icon.svg"/>}
                    {title}
                </PartnersHeaderTitle>

                <PartnersContent align={align}>
                    {Array.isArray(partners) &&
                        partners.map((partner, index) => {
                            return (
                                <LogoContainer className={index > 2 && "desktop"} key={index}>
                                    <Logo src={partner.logo} style={partner.style} alt=""/>
                                </LogoContainer>
                            );
                        })}
                </PartnersContent>
            </PartnersDiv>
        );
    }
}

export default Partners;
