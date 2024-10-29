import React, {Component} from "react";

import styled from "styled-components";
import Autosuggest from "react-autosuggest";
import Header_input_location from "../Svgs/header_input_location";
import styles from './JobSearch.module.css';

import _ from "underscore";
import logEvent from "../../lib/logEvent";

const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZWxpZG9yIiwiYSI6ImNqbGF1MmJvdDFsZTEzcXMybHU1aHZub2MifQ.RJoCQ30JAUez2t4RyfuJaw";

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
    return suggestion.text;
};

const renderSuggestion = suggestion => {
    // console.log(`suggestion: ${suggestion}`)
    return (
        <div>{suggestion.place_name ? suggestion.place_name : suggestion.text}</div>
    );
};

export default class LocationInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.value || "",
            formattedAddress: "",
            geo: "",
            lat: "",
            long: "",
            suggestions: [],
            searchTime: new Date()
        };
        this.onChange = this.onChange.bind(this);
        this.delayedCallback = _.debounce(this.onSuggestionsFetchRequested, 200);
        this.onFocus = this.onFocus.bind(this);
    }

    onSuggestionsFetchRequested = ({value}) => {


        const inputValue = value.trim().toLowerCase();
        const searchTime = new Date();

        let geo = "US,CA,GB,IL,AU,ZA,IN";


        try {
            if (ClientVars.geo && ClientVars.geo.length == 2) {
                geo = ClientVars.geo.toUpperCase();
            }
        } catch (e) {

        }

        let LOCATION_AUTOCOMPLETE_ENDPOINT = `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/{{__QUERY__}}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&types=country,region,place&country=` + geo;

        // console.log("LOCATION_AUTOCOMPLETE_ENDPOINT ", LOCATION_AUTOCOMPLETE_ENDPOINT);

        fetch(
            LOCATION_AUTOCOMPLETE_ENDPOINT.replace(
                "{{__QUERY__}}",
                encodeURI(inputValue)
            )
        )
            .then(response => response.json())
            .then(data => {

                //console.log(data);

                // console.log(`body: ${data.features}, `)
                if (data && data.features && this.state.searchTime <= searchTime) {
                    this.setState({
                        searchTime: searchTime,
                        suggestions: data.features
                    });
                }
            })
            .catch(error => {
                console.log(`error while fetching location suggestions: ${error}`);
            });
    };

    onChange = e => {
        this.props.onChange(e);
        this.setState({
            query: e.target.value
        });
    };

    onFocus = () => {
        logEvent("click-search_input", {type: "location", origin: "search"});
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (e, {suggestion}) => {

        // console.log(suggestion);

        // console.log(`suggestion selected: ${JSON.stringify(suggestion)}`);
        // console.debug(`🚩 onSelect event triggered: ${JSON.stringify(event)}`)
        let locationData;
        if (suggestion && suggestion.geometry) {
            locationData = {
                long: suggestion.geometry.coordinates[0],
                lat: suggestion.geometry.coordinates[1]
            };
            logEvent("click-result", {
                type: "location",
                origin: "search",
                content: suggestion
            });
        }

        //debugger
        if (suggestion.context) {
            locationData.geo = suggestion.context;
            for (let i = 0; i < suggestion.context.length; ++i) {
                if (suggestion.context[i].id.search("country") > -1) {
                    locationData.geo = suggestion.context[i].short_code;
                }
            }
        } else if (suggestion.geo) {
            for (let i = 0; i < locationData.geo.length; ++i) {
                if (locationData.geo[i].id.search("country") > -1) {
                    locationData.geo = locationData.geo[i].short_code;
                }
            }
        }

        // console.log(`!!!!!geo is: ${JSON.stringify(locationData.geo)}`)

        if (suggestion && suggestion.place_name) {
            locationData.formattedAddress = suggestion.place_name;
            locationData.searchLocation = suggestion.place_name;
        } else {
            locationData = {
                formattedAddress: suggestion,
                searchLocation: suggestion,
                lat: "",
                long: ""
            };
        }

        //console.log(data.features[0].text);
        if (suggestion && suggestion.text) {
            locationData.city = suggestion.text
        }

        if (locationData) {
            // console.debug(`Location Data: ${JSON.stringify(locationData)}`)
            this.setState({
                query: locationData.formattedAddress,
                ...locationData
            });
            this.props.changeLocationValue(locationData);
        }
    };

    render() {
        const {suggestions, query} = this.state;

        const inputProps = {
            placeholder: this.props.placeholder || "Enter Location",
            value: query,
            onChange: this.onChange,
            onFocus: this.onFocus,
            name: "location",
            type: "text"
        };


        return (
            <InputBlock>
                {
                    this.props.hideIcon == true ? null :
                        <span id={"testing-span-location"} className={styles.InputIcon}>
                           <Header_input_location id="Header-input-location"> </Header_input_location>
                        </span>
                }
                <Autosuggest

                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.delayedCallback}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                    className="keywordAutoSuggest"
                />
            </InputBlock>
        );
    }
}
