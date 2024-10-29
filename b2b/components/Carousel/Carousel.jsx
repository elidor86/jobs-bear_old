import React, { useState } from "react";
import styled from "styled-components";

import { ArrowLeft, ArrowRight } from "../Icons";

const Carousel = ({ cards, buttonsPosition, showNeighbors }) => {
  const [active, setActive] = useState(showNeighbors ? 1 : 0);

  const handleLeft = () => {
    if (showNeighbors && active === 0) return;
    setActive(active !== 0 ? active - 1 : cards.length - 1);
  };

  const handleRight = () => {
    if (showNeighbors && active === cards.length - 1) return;
    setActive(active !== cards.length - 1 ? active + 1 : 0);
  };

  return (
    <Wrapper>
      <CardsWrapper>
        {cards.map((card, index) => (
          <Card
            isNeighbour={(index === active + 1 || index === active - 1) && showNeighbors}
            showNeighbors={showNeighbors}
            active={active}
            key={index + "carousel-card"}>
            {card}
          </Card>
        ))}
      </CardsWrapper>
      <ButtonsWrapper buttonsPosition={buttonsPosition}>
        <ButtonLeft onClick={handleLeft}>
          <ArrowLeft />
        </ButtonLeft>
        <ButtonRight onClick={handleRight}>
          <ArrowRight />
        </ButtonRight>
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background: transparent;
  width: 100%;
`;

const CardsWrapper = styled.div`
  display: flex;
  /* overflow: hidden; */
  width: 100%;
`;

const Card = styled.div`
  flex: 0 0 ${({ showNeighbors }) => (showNeighbors ? 70 : 100)}%;
  transition: 1s;
  transform: translate(
      calc(${({ active }) => -active * 100}% ${({ showNeighbors }) => showNeighbors && " + 22%"}),
      ${({ isNeighbour }) => (isNeighbour ? `-20px` : "0")}
    )
    ${({ isNeighbour }) => isNeighbour && `scale(0.9)`};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2%;
`;

const ButtonsWrapper = styled.div`
  height: 38px;
  position: absolute;
  ${({ buttonsPosition }) =>
    buttonsPosition === "center"
      ? `top: 50%;
  transform: translateY(-50%);`
      : ``}
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div {
    position: relative;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    cursor: pointer;
  }
`;

const ButtonLeft = styled.div`
  left: 0;
`;

const ButtonRight = styled.div`
  right: 0;
`;

export default Carousel;
