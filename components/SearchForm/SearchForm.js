import React, {Component} from "react";
import styled from "styled-components";
import KeywordInput from "../JobSearch/KeywordInput";
import LoactionInput from "../JobSearch/LocationInput";
import Router from "next/router";
import config from "../config/styleConsts";
import logEvent from "../../lib/logEvent";
import buildJobSearchQueryString from '../../lib/buildJobSearchQueryString'
import styles from "./SearchForm.module.css";
import Search_icon from "../Svgs/search_icon";

const {mobileMaxWidth} = config;

const Button = styled.button`
  min-height: 46px;
  border-radius: 5px;
  border: 2px solid #ffffff;
  background: none;
  padding: 0px 20px;
  align-items: center;
  color: white;
  box-sizing: border-box;
  font-weight: bold;
  justify-content: center;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ButtonDesktop = styled(Button)`
  background: linear-gradient(94.2deg, #fe909c 0.65%, #ff6c98 96.18%);
  border: none;
  border-radius: 5px;
`;

const ActionDiv = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  ${props => props.layout === 'modal' && `max-width: 330px;`}
  width: 100%;
  @media (max-width: ${mobileMaxWidth}) {
    flex-direction: column;
    margin: auto;
    justify-content: space-around;
    height: 14rem;
  }

`;

const ButtonIcon = styled.img`
  margin-right: 6px;
  width: 18px;
  height: 18px;
`;

// const buildQuery = queryParams => {
//   let query = [];
//   // Loop through the data object
//   for (var key in queryParams) {
//     if (queryParams.hasOwnProperty(key)) {
//       if (queryParams[key] !== "") {
//         query.push(
//           encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
//         );
//       }
//     }
//   }
//   query.push("page=1");

//   const clientVars = JSON.parse(document.getElementById("session").textContent)
//     .clientVars;
//   if (clientVars) {
//     query.push(`uid=${clientVars.uid}`);
//     // query.push(`geo=${clientVars.geo}`)

//     clientVars.gclid ? query.push(`gclid=${clientVars.gclid}`) : null;
//     clientVars.utm_source
//       ? query.push(`utm_source=${clientVars.utm_source}`)
//       : null;
//     clientVars.utm_campaign
//       ? query.push(`utm_campaign=${clientVars.utm_campaign}`)
//       : null;
//   }

//   return query.join("&");
// };

class SearchForm extends Component {
    constructor(props) {
        super(props);
        let currentLocation;

        if (this.props.getLocation) {
            currentLocation = this.props.getLocation();
        }

        let {app, keyword} = this.props;

        keyword = this.props.app.getKeyword();
        currentLocation = this.props.app.getLocation();

        this.state = {
            values: {
                keyword: keyword || "",
                location: {
                    query: "",
                    formattedAddress: currentLocation || "",
                    geo: app.state.location.geo || "",
                    lat: app.state.location.lat || "",
                    long: app.state.location.long || ""
                }
            }
        };
    }

    changeKeywordValue = v => {
        const {values} = this.state;
        if (v) {
            this.setState({
                values: {
                    ...values,
                    keyword: v
                }
            });

            this.props.app.setKeyword(v);
        }
    };

    changeLocationValue = v => {
        const {values} = this.state;
        // console.log(JSON.stringify(v))
        if (v) {
            this.setState({
                values: {
                    ...values,
                    location: v
                }
            });
        }
    };

    onChange = e => {
        const {values} = this.state;
        this.setState({
            values: {...values, [e.target.name]: e.target.value}
        });
    };

    submit = e => {
        const {app} = this.props;
        const {keyword, location} = this.state.values;
        // console.log(`keyword: ${keyword}, location: ${JSON.stringify(location)}`)
        e.preventDefault();

        if (typeof this.props.onSubmit == "function") {
            this.props.onSubmit(this.state.values);
        }

        const queryData =
            typeof location === "string"
                ? {keyword, formattedAddress: location}
                : {keyword, ...location};
        logEvent("click-search", {origin: "search"});
        app.setKeyword(keyword);
        app.setLocation(location);
        // console.log(`queryData: ${JSON.stringify(queryData)}`)
        //Router.push(`/jobs?${buildJobSearchQueryString(queryData)}`);



        let go_to_page = {
            newWindow: false,
            queryParams: {
                keyword: keyword,
                utm_medium: "Search_Jobs",
                formattedAddress: queryData.formattedAddress,
            },
            page: "jobs"
        }


        try {

            if (typeof queryData.formattedAddress === "string" && queryData.formattedAddress.length > 0) {
                go_to_page.queryParams.formattedAddress = queryData.formattedAddress;
            }

            if (typeof queryData.lat === "number") {
                go_to_page.queryParams.lat = queryData.lat;
            }

            if (typeof queryData.long === "number") {
                go_to_page.queryParams.long = queryData.long;
            }

        } catch (e) {

        }


        app.goToPage(go_to_page);

        return null;
    };

    componentDidMount() {
        // this.setState({keyword: this.props.getKeyword()})
    }

    render() {
        const {values} = this.state;
        const {classNameContent, buttonTitle, app, keyword, layout} = this.props;
        return (
            <form className={classNameContent} onSubmit={this.submit}>
                {
                    <ActionDiv
                        layout={layout}
                    >
                        <KeywordInput
                            onChange={this.onChange.bind(this)}
                            changeKeywordValue={this.changeKeywordValue.bind(this)}
                            keyword={keyword}
                            layout={layout}
                        />
                        <LoactionInput
                            onChange={this.onChange.bind(this)}
                            changeLocationValue={this.changeLocationValue.bind(this)}
                            value={values.location.formattedAddress}
                            layout={layout}
                        />
                        <ButtonDesktop>
                            <span className={styles.SearchIcon}>
                                <Search_icon></Search_icon>
                            </span>
                            {buttonTitle}
                        </ButtonDesktop>
                    </ActionDiv>
                }
            </form>
        );
    }
}

export default SearchForm;
