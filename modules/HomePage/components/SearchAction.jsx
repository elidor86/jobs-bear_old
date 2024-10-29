import styled from "styled-components";

import { LocationIcon, SearchIcon } from "../../../components/ext/Icons";

const SearchAction = ({ jobsTextfield, locationTextfield, searchAction }) => (
  <Wrapper>
    <SearchIcon />
    <Textfield placeholder={jobsTextfield.placeholder} />
    <VerticalDivider />
    <LocationIcon />
    <Textfield width={174} placeholder={locationTextfield.placeholder} />
    <SearchButton>{searchAction.label}</SearchButton>
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 16px 20px 16px 23px;
  display: flex;
  column-gap: 16px;
  align-items: center;
  background: #ffffff;
  border-radius: 5px;
  width: fit-content;

  @media (max-width: 1201px) {
    padding: 11px 9px;
  }

  @media (max-width: 701px) {
    column-gap: 30px;
    padding-left: 30px;

    & svg {
      display: none;
    }
  }

  @media (max-width: 601px) {
    column-gap: 10px;
    padding-left: 10px;
  }
`;

const Textfield = styled.input`
  width: ${({ width }) => (width ? `${width}px` : "208px")};
  max-width: 100%;
  border: none;
  outline: none;

  &::placeholder {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #b2b2b2;
  }

  @media (max-width: 701px) {
    display: none;
  }

  @media (max-width: 461px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background: #d92cff;
  border-radius: 5px;
  padding: 0 22px;
  font-weight: 700;
  font-size: 12px;
  line-height: 30px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  outline: none;
  min-width: 116px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 29px;
  background: #e5e5e5;

  @media (max-width: 701px) {
    display: none;
  }
`;

export default SearchAction;
