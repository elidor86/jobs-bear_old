import React, {Component} from "react";

import Autosuggest from "react-autosuggest";
import styled from "styled-components";
import styles from "./JobSearch.module.css";
import Header_input_location from "../Svgs/header_input_keyword";

import _ from "underscore";
import logEvent from "../../lib/logEvent";

const KEYWORD_AUTOCOMPLETE_ENDPOINT =
    "https://www.youwantwork.com/api/keyword-autocomplete";

const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.img`
  position: absolute;
  z-index: 2;
  margin-left: 11px;
`;

const getSuggestionValue = suggestion => {
    return suggestion;
};

const renderSuggestion = suggestion => {
    return <div>{suggestion}</div>;
};

export default class KeywordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.keyword || "",
            suggestions: [],
            searchTime: new Date()
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.delayedCallback = _.debounce(this.onSuggestionsFetchRequested, 200);
        this._isMounted = false;
    }

    onChange = e => {
        this.props.onChange(e);
        this.setState({
            keyword: e.target.value
        });
    };
    onFocus = () => {
        logEvent("click-search_input", {type: "keyword", origin: "search"});
    };

    onSuggestionsFetchRequested = ({value}) => {
        // console.log(`this._isMounted: ${this._isMounted}`)
        if (!this._isMounted) {
            return;
        }
        const inputValue = value.trim().toLowerCase();
        const searchTime = new Date();

        fetch(KEYWORD_AUTOCOMPLETE_ENDPOINT, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: inputValue
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && this.state.searchTime <= searchTime) {
                    this.setState({
                        suggestions: data.suggestions,
                        searchTime: searchTime
                    });
                }
            });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (e, {suggestion}) => {
        if (suggestion) {
            this.props.changeKeywordValue(suggestion);
            this.setState({keyword: suggestion});
            logEvent("click-result", {
                type: "keyword",
                origin: "search",
                content: suggestion
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const {keyword, suggestions} = this.state;
        const inputProps = {
            placeholder: "Enter Job or Keyword",
            value: this.state.keyword || '',
            onChange: this.onChange,
            onFocus: this.onFocus,
            name: "keyword",
            type: "text"
        };

        return (
            <InputBlock>
                <span className={styles.keywordInputIcon}>
                    <Header_input_location></Header_input_location>
                </span>


                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.delayedCallback}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                    className="keywordAutoSuggest"
                ></Autosuggest>
            </InputBlock>
        );
    }
}
