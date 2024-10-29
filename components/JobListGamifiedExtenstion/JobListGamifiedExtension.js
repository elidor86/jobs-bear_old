import React, { Component } from "react";
import styled from "styled-components";
//import "./animation.scss";
import classNames from "classnames";

const StickyGameContainer = styled.div`
  position: fixed;
  bottom: 0px;
  max-height: 130px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #4351a5 0%, #ff006b 100%);
  box-shadow: 0px -2px 10px #d2d2d2;
  padding: 8px 32px 11px 32px;
`;
const Title = styled.h2`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: white;
  /* or 111% */
  align-items: center;
  text-align: center;
  margin: 0px auto 6px auto;
`;
const Subtitle = styled.h3`
  margin: 0px auto 9px auto;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  /* or 129% */
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
`;
const TreasureChests = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const Image = styled.img`
  height: 43px;
  width: auto;
  margin: 1px;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-delay: 3s;
`;

export default class JobListGamifiedExtension extends Component {
  render() {
    const { jobClickCount } = this.props;
    return (
      <StickyGameContainer>
        {jobClickCount === 0 && <Title>Unlock Your Chances!</Title>}
        {jobClickCount === 5 && (
          <Title style={{ marginBottom: "7px", fontWeight: "regular" }}>
            Good luck with your job hunt!
          </Title>
        )}
        {jobClickCount < 5 && (
          <Subtitle>
            {jobClickCount === 0
              ? `Apply to at least 5 positions to increase your chances of getting
                hired by up to 93%`
              : `Only ${5 -
                  jobClickCount} applications left to increase your chances of getting hired by up to 93%`}
          </Subtitle>
        )}
        <TreasureChests>
          {jobClickCount > 0 ? (
            <Image key="0" src="/static/images/treasure_chest.png" />
          ) : (
            <Image
              key="0"
              className={classNames({
                [`animated bounce`]: jobClickCount === 0
              })}
              src="/static/images/treasure_chest_white.png"
            />
          )}
          {jobClickCount > 1 ? (
            <Image key="1" src="/static/images/treasure_chest.png" />
          ) : (
            <Image
              key="1"
              className={classNames({
                [`animated bounce`]: jobClickCount === 1
              })}
              src="/static/images/treasure_chest_white.png"
            />
          )}
          {jobClickCount > 2 ? (
            <Image key="2" src="/static/images/treasure_chest.png" />
          ) : (
            <Image
              key="2"
              className={classNames({
                [`animated bounce`]: jobClickCount === 2
              })}
              src="/static/images/treasure_chest_white.png"
            />
          )}
          {jobClickCount > 3 ? (
            <Image key="3" src="/static/images/treasure_chest.png" />
          ) : (
            <Image
              key="3"
              className={classNames({
                [`animated bounce`]: jobClickCount === 3
              })}
              src="/static/images/treasure_chest_white.png"
            />
          )}
          {jobClickCount > 4 ? (
            <Image
              key="4"
              src="/static/images/treasure_chest.png"
            />
          ) : (
            <Image key="4"
            className={classNames({
                [`animated bounce`]: jobClickCount === 4
              })}
            src="/static/images/treasure_chest_white.png" />
          )}
        </TreasureChests>
      </StickyGameContainer>
    );
  }
}
