import React, {Component} from "react";


export default class DisplayAd extends Component {

    constructor(props) {


        super(props);

        this.state = {
            display: false,
            senseHtml: "<div></div>"
        };


    }


    componentDidCatch(e) {
        console.log(`Display ad error: ${e}`);
    }

    componentDidMount() {

        // console.log("componentDidMount");
        this.getAdsense();

    }

    getAllUrlParams(url) {

        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

        // we'll store the parameters here
        var obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');

                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {

                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    }

    displayAdsense() {

        let display = false;
        let query = null;
        let jobClickCount = 0;
        let page = null;

        try {
            // window.AB.displayAdsense = true;
        } catch (e) {

        }

        try {
            let queryFromUrl = this.getAllUrlParams(location.href);

            if (queryFromUrl && queryFromUrl.page && queryFromUrl.page.length > 0) {
                page = parseInt(queryFromUrl.page);
            }

        } catch (e) {

        }

        try {
            jobClickCount = localStorage.getItem("jobClickCount") || 0;

            if (jobClickCount) {
                jobClickCount = parseInt(jobClickCount);
            }
        } catch (e) {

        }

        try {

            if (page && typeof page == "number" && page > 1 && jobClickCount == 0) {
                display = true;
            }

            /*if (window.AB.displayAdsense == true) {

            }*/

        } catch (e) {

        }

        //console.log("display sense", display);

        return display;

    }

    getAdsense() {
        let html = "<div></div>";

        let showAds = function () {
            //console.log(window.AB.displayAdsense);
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // console.trace(e);
            }
        };

        let installGoogleAds = function () {

            if (location.hostname.search("jobs-bear.com") == -1) {
                return;
            }

            var elem = document.createElement("script");
            elem.src =
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            elem.async = true;
            elem.defer = true;
            elem.onload = showAds;
            document.body.insertBefore(elem, document.body.firstChild);
        };

        try {
            let displayAdsense = this.displayAdsense();
            if (displayAdsense == true) {
                html = " <ins class=\"adsbygoogle\" style=\"display:block\" data-ad-client=\"ca-pub-5290535689125396\" data-ad-slot=\"9991800629\" data-ad-format=\"auto\" data-full-width-responsive=\"true\"></ins>";
                this.setState({
                    senseHtml: html
                });

                setTimeout(function () {
                    installGoogleAds();
                }, 500);

            }
        } catch (e) {
            console.log("getAdsense error", e);
        }

    }

    render() {


        return (
            <div>

            </div>

        );
    }
}
