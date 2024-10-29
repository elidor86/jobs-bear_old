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
  background: white;
  box-shadow: 0px -2px 10px #d2d2d2;
  padding: 8px 32px 11px 32px;
`;
const Title = styled.h2`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
  /* or 117% */
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  color: #4a58ad;
  margin: 0px auto 6px auto;
`;
const Subtitle = styled.h3`
  margin: 0px auto 9px auto;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  align-items: center;
  text-align: center;
  color: rgba(0, 6, 57, 0.6);
`;
const TreasureChests = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const Image = styled.img`
  height: 32px;
  width: auto;
  margin: 0px 7px;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-delay: 3s;
`;

export default class JobListProgressBar extends Component {
  render() {
    const { jobClickCount } = this.props;
    let subtitleContent;
      if(jobClickCount === 0) {
        subtitleContent =`Apply to&nbsp;<span style='color: #000639; font-weight: bold;'>3</span>&nbsp;positions to increase your chances of getting hired by up to 93%.`;
      } else if(jobClickCount < 2) {
        subtitleContent = `Keep going&nbsp;👍 apply to&nbsp;<span style='color: #000639; font-weight: bold;'>${3 -
          jobClickCount}</span>&nbsp;more positions.`;
      } else if(jobClickCount === 2) {
        subtitleContent = `Well done&nbsp;🙌 apply to&nbsp;<span style='color: #000639; font-weight: bold;'>${3 -
          jobClickCount}</span>&nbsp;more position.`;
      } else {
        subtitleContent = `Good luck with your job hunt!`
      }
    return (
      <StickyGameContainer>
        <Title
          dangerouslySetInnerHTML={{
            __html: `GET HIRED&nbsp;<span style='color: #FF006B;'>FASTER</span>`
          }}
        />
        <Subtitle
          dangerouslySetInnerHTML={{
            __html: subtitleContent
          }}
        />
        <TreasureChests>
          {jobClickCount > 0 ? (
            <Image key="0" src="/static/icons/briefcase_done.svg" />
          ) : (
            <Image
              key="0"
              className={classNames({
                [`animated pulse`]: jobClickCount === 0
              })}
              src="/static/icons/briefcase.svg"
            />
          )}
          {jobClickCount > 1 ? (
             <Image key="1" src="/static/icons/briefcase_done.svg" />
          ) : (
            <Image
              key="1"
              className={classNames({
                [`animated pulse`]: jobClickCount === 1
              })}
              src="/static/icons/briefcase.svg"
            />
          )}
          {jobClickCount > 2 ? (
             <Image key="2" src="/static/icons/briefcase_done.svg" />
          ) : (
            <Image
              key="2"
              className={classNames({
                [`animated pulse`]: jobClickCount === 2
              })}
              src="/static/icons/briefcase.svg"
            />
          )}
        </TreasureChests>
      </StickyGameContainer>
    );
  }
}
