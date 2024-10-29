import React, { Component } from "react";
import styled from "styled-components";
//import "./animation.scss";
import classNames from "classnames";
import logEvent from '../../lib/logEvent'

const BannerContainer = styled.div`
  position: fixed;
  bottom: 0px;
  max-height: 130px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px -2px 10px #d2d2d2;
  ${props => props.hide && `display: none`}
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin: 18px auto 10px 10px;
`;
const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: auto;
  margin-top: 18px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  display: flex;
  align-items: center;
  color: #000639;
  margin: 0px auto 0px 0px;
`;
const Subtitle = styled.h3`
  margin: 0px auto 0px 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  display: flex;
  align-items: center;
  /* Black */
  color: #000639;
`;

const Button = styled.button`
  width: 106px;
  height: 40px;
  background: linear-gradient(93.66deg, #ff9839 0%, #ff4d00 100%);
  border-radius: 5px;
  margin: auto 0px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: row;
`;

const CrossedPrice = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: thin;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  display: flex;
  align-items: center;
  text-decoration: line-through;
  color: #000639;
  margin-right: 6px;
`;
const ActualPrice = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  display: flex;
  align-items: center;
  color: #ff5809;
  animation-iteration-count: infinite;
  animation-duration: 4s;
  animation-delay: 5s;
`;
const Marquee = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  /* or 154% */
  display: flex;
  align-items: center;
  color: rgba(255, 149, 55, 0.6);
  white-space: nowrap;
  box-sizing: border-box;
  display: inline-block;
  padding-left: 100%;
  /* show the marquee just outside the paragraph */
  animation: marquee 15s linear infinite;
  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  justify-content: center;
`;

export default class JobListPremiumFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
  }
  render() {
    return (
      <BannerContainer hide={this.state.hide}>
          <CloseIcon
          onClick={() => {
            this.setState({hide: true})
            logEvent("click-dismiss_premium_flow", { origin: "premium_banner" });
          }}
          src="/static/icons/closeIconGrey.svg"
        />
        <Container>
          <ColumnLeft>
            <Title>Hand Picked Offers, Just For You</Title>
            <Subtitle>Get daily premium offers for only</Subtitle>
            <Prices>
              <CrossedPrice>$9.99/m</CrossedPrice>
              <ActualPrice
              className='animate tada'
              >$4.99/m</ActualPrice>
            </Prices>
          </ColumnLeft>
          <ColumnRight>
            <Button
            onClick={()=>{
              logEvent('click-premium-flow')
              this.setState({hide: true})
              window.open('https://www.jobnow.live/subscription', "_blank");}
            }
            >Go Premium</Button>
          </ColumnRight>
        </Container>
        <Marquee>
          END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
          &nbsp;&nbsp;&nbsp;END OF YEAR SALE &nbsp;&nbsp;&nbsp;END OF YEAR SALE
        </Marquee>
      </BannerContainer>
    );
  }
}
