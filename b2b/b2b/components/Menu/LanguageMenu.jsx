import React, { useState } from "react";
import styled from "styled-components";

import { DropdownIcon } from "../Icons";

const LanguageMenu = ({ value, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const handleItemClick = (value) => {
    toggleIsOpen();
    // handleChange(value);
  };

  const currentValue = !!value ? value : options[0];

  return (
    <Wrapper>
      <MenuHeader onClick={toggleIsOpen}>
        <MenuText color="#FFFFFF">{currentValue}</MenuText>
        <DropdownIcon />
      </MenuHeader>
      <MenuOptions isOpen={isOpen}>
        {options
          .filter((item) => item !== currentValue)
          .map((item) => (
            <MenuItem key={item} onClick={() => handleItemClick(item)}>
              <MenuText>{item}</MenuText>
            </MenuItem>
          ))}
      </MenuOptions>
      {isOpen && <Cover onClick={toggleIsOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: none;
`;

const MenuHeader = styled.div`
  border: 1px solid #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding-left: 20px;
  text-align: center;
  width: 75px;
`;

const MenuText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => color || "#000000"};
`;

const MenuOptions = styled.div`
  background: #ffffff;
  border: 0.5px solid #808ee0;
  padding: 5px 9px;
  position: absolute;
  left: -1px;
  right: -1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 10;
  transition: visibility 0.1s, opacity 0.1s linear;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;

const MenuItem = styled.div`
  padding: 9px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-bottom: 0.5px solid #808ee0;

  &:last-child {
    border-bottom: none;
  }
`;

const Cover = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export default LanguageMenu;
