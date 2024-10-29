import styled from "styled-components";

import {LocationIcon, SearchIcon} from "../../../components/Icons";

import React, {Component} from "react";

class SearchAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            location: ""
        };

    }

    onChange = e => {

        this.setState({
            keyword: e.target.value
        });
    };
    onFocus = () => {
        //logEvent("click-search_input", {type: "keyword", origin: "search"});
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const self = this;

        const {jobsTextfield, locationTextfield, searchAction, app} = self.props;

        return (
            <Wrapper>
                <SearchIcon/>
                <Textfield
                    onChange={(e) => {
                        this.setState({keyword: e.target.value});
                        try {
                            app.setKeyword(e.target.value)
                        } catch (e) {

                        }
                    }}
                    type={"text"}
                    placeholder={jobsTextfield.placeholder}/>
                <VerticalDivider/>

                <LocationIcon/>
                <DesktopOnly>
                    <Textfield
                        onChange={(e) => {
                            this.setState({location: e.target.value});
                            try {
                                app.setLocation(e.target.value)
                            } catch (e) {

                            }
                        }}
                        type={"text"}
                        width={174}
                        placeholder={locationTextfield.placeholder}/>
                </DesktopOnly>

                <SearchButton
                    onClick={(e) => app.b2bEventHandle({
                        eventName: "searchBtn",
                        keyword: self.state.keyword,
                        location: self.state.location
                    })}>
                    {searchAction.label}
                </SearchButton>

            </Wrapper>
        );
    }
}


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
    width: 100%;

    & svg {
      display: none;
    }
  }

  @media (max-width: 601px) {
    column-gap: 10px;
    padding-left: 10px;
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 701px) {
    display: none;
  }
`;

const Textfield = styled.input`
  width: ${({width}) => (width ? `${width}px` : "208px")};
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
    flex: 1;
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
